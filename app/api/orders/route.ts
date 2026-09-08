import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { notifyEmail, site } from "@/lib/content";

export const runtime = "nodejs";

function supabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
}

async function uploadIfPresent(file: File | null, prefix: string): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
  const path = `${prefix}/${crypto.randomUUID()}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error } = await supabase().storage.from("order-uploads").upload(path, bytes, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase().storage.from("order-uploads").getPublicUrl(path);
  return data.publicUrl;
}

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const code = String(data.get("code") || "").trim();
    const notes = String(data.get("notes") || "").trim();
    const tightW = String(data.get("tightW") || "").trim();
    const tightH = String(data.get("tightH") || "").trim();
    const visibleW = String(data.get("visibleW") || "").trim();
    const visibleH = String(data.get("visibleH") || "").trim();
    const photo = data.get("photo") as File | null;
    const drawing = data.get("drawing") as File | null;

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    const [photoUrl, drawingUrl] = await Promise.all([
      uploadIfPresent(photo, "photos"),
      uploadIfPresent(drawing, "drawings"),
    ]);

    const tight = tightW && tightH ? `${tightW}×${tightH}` : "";
    const visible = visibleW && visibleH ? `${visibleW}×${visibleH}` : "";

    const { error: insertError } = await supabase()
      .from("orders")
      .insert({
        name,
        email,
        phone: phone || null,
        product_code: code || null,
        photo_path: photoUrl,
        drawing_path: drawingUrl,
        notes: notes || null,
        tight_width: tightW || null,
        tight_height: tightH || null,
        visible_width: visibleW || null,
        visible_height: visibleH || null,
      });
    if (insertError) throw insertError;

    // Best-effort notification — an email failure shouldn't fail the customer's
    // submission, since the order is already safely saved above.
    if (!process.env.RESEND_API_KEY) {
      console.error("Order saved, but RESEND_API_KEY is not set — skipping notification email.");
    } else {
      const rows = [
        ["Name", name],
        ["Email", email || "—"],
        ["Phone", phone || "—"],
        ["Portfolio piece", code || "—"],
        ["Tight measurement", tight || "—"],
        ["Visible measurement", visible || "—"],
        ["Notes", notes || "—"],
      ];
      const linksHtml = [
        photoUrl ? `<p><a href="${photoUrl}">View uploaded photo</a></p>` : "",
        drawingUrl ? `<p><a href="${drawingUrl}">View uploaded drawing</a></p>` : "",
      ].join("");
      const html =
        `<h2>New commission enquiry — ${esc(site.name)}</h2>` +
        `<table cellpadding="6" style="border-collapse:collapse">` +
        rows.map(([k, v]) => `<tr><td style="color:#8a7f70;font-size:12px;text-transform:uppercase">${esc(k)}</td><td>${esc(v)}</td></tr>`).join("") +
        `</table>` +
        linksHtml;

      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Sundog Stained Glass <onboarding@resend.dev>",
            to: [notifyEmail],
            // Only set reply_to when it's a well-formed address — an invalid
            // value here would get the whole notification rejected by Resend,
            // and you'd rather still get notified (there may be a phone
            // number instead) than miss the enquiry entirely.
            reply_to: EMAIL_RE.test(email) ? email : undefined,
            subject: `New commission enquiry from ${name}`,
            html,
          }),
        });
        if (!emailRes.ok) {
          const body = await emailRes.text();
          console.error(`Order notification email rejected by Resend (status ${emailRes.status}):`, body);
        } else {
          console.log("Order notification email sent successfully.");
        }
      } catch (emailError) {
        console.error("Order notification email failed (network error):", emailError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Order submission failed:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
