"use client";

import { useState, type ReactNode } from "react";
import { orderConfig, orderForm } from "@/lib/content";

type PortfolioOption = { code: string; title: string };

export function CommissionForm({
  portfolioCodes,
  tightDiagram,
  visibleDiagram,
}: {
  portfolioCodes: PortfolioOption[];
  tightDiagram: ReactNode;
  visibleDiagram: ReactNode;
}) {
  const [submitted, setSubmitted] = useState<{ name: string; contact: string } | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const code = String(data.get("code") || "");
    const photo = data.get("photo") as File | null;
    const drawing = data.get("drawing") as File | null;
    const notes = String(data.get("notes") || "").trim();
    const tightW = String(data.get("tightW") || "").trim();
    const tightH = String(data.get("tightH") || "").trim();
    const visibleW = String(data.get("visibleW") || "").trim();
    const visibleH = String(data.get("visibleH") || "").trim();
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();

    const tightGiven = Boolean(tightW && tightH);
    const tightPartial = Boolean((tightW || tightH) && !tightGiven);
    const visibleGiven = Boolean(visibleW && visibleH);
    const visiblePartial = Boolean((visibleW || visibleH) && !visibleGiven);
    const hasPhoto = Boolean(photo && photo.size > 0);
    const hasDrawing = Boolean(drawing && drawing.size > 0);

    const newErrors: string[] = [];
    if (!(code || hasPhoto || hasDrawing || notes)) {
      newErrors.push("Add a portfolio piece, a photo, a drawing, or a few words about the design.");
    }
    if (orderConfig.tightRequired && !tightGiven) {
      newErrors.push("Add both a width and height for the tight measurement (an estimate is fine).");
    } else if (tightPartial) {
      newErrors.push("Add both a width and height for the tight measurement, or leave both blank.");
    }
    if (orderConfig.visibleRequired && !visibleGiven) {
      newErrors.push("Add both a width and height for the visible measurement (an estimate is fine).");
    } else if (visiblePartial) {
      newErrors.push("Add both a width and height for the visible measurement, or leave both blank.");
    }
    if (!name) newErrors.push("Add your name.");
    if (orderConfig.emailRequired && !email) newErrors.push("Add your email address.");
    if (orderConfig.phoneRequired && !phone) newErrors.push("Add a phone number.");

    if (newErrors.length) {
      setErrors(newErrors);
      setServerError(null);
      return;
    }
    setErrors([]);
    setServerError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", { method: "POST", body: data });
      if (!res.ok) throw new Error("request_failed");
      setSubmitted({ name, contact: email || phone || "the details you gave us" });
    } catch {
      setServerError("Something went wrong sending that — please try again, or email the details directly for now.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div>
        <div className="confirm">
          <div className="mark">🪟</div>
          <h2>Thank you &mdash; that&rsquo;s landed with me.</h2>
          <p>
            Thanks, {submitted.name} &mdash; I&rsquo;ll take a look at your measurements and design notes and come back with
            an estimate within 2&ndash;3 days, at {submitted.contact}.
          </p>
          <button className="btn btn-ghost" onClick={() => setSubmitted(null)}>
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {errors.length > 0 && (
        <div className="error-summary">
          <strong>A couple of things first:</strong>
          <ul>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      {serverError && (
        <div className="error-summary">
          <strong>{serverError}</strong>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend>{orderForm.legendProject}</legend>
          <p className="fieldset-note">{orderForm.projectNote}</p>

          <div className="field">
            <label htmlFor="f-code">Closest portfolio piece (optional)</label>
            <select id="f-code" name="code" defaultValue="">
              <option value="">Not sure yet / new design</option>
              {portfolioCodes.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.code} &mdash; {p.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid-2">
            <div className="field">
              <label htmlFor="f-photo">Reference photo (optional)</label>
              <input type="file" id="f-photo" name="photo" accept="image/*" />
            </div>
            <div className="field">
              <label htmlFor="f-drawing">Sketch or drawing (optional)</label>
              <input type="file" id="f-drawing" name="drawing" accept="image/*,.pdf" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="f-notes">{orderForm.notesLabel}</label>
            <textarea
              id="f-notes"
              name="notes"
              placeholder="Colours, style, anything you've seen and liked — as much or as little as you know so far."
            />
            <p className="help">{orderForm.notesHelp}</p>
          </div>
        </fieldset>

        <fieldset>
          <legend>{orderForm.legendColour}</legend>
          <div className="colour-tool">
            <div className="swatch-mock">
              {["#2c4a7c", "#8c2f39", "#c98a2c", "#35634f", "#e2ac5c", "#4468a3", "#b6535f", "#57987a", "#f3e3c2", "#274435", "#7a4d13", "#c3b295"].map(
                (c, i) => (
                  <i key={i} style={{ background: c }} />
                )
              )}
            </div>
            <div className="txt">
              <strong>{orderForm.colourHeadline}</strong>
              <p>{orderForm.colourBody}</p>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>{orderForm.legendMeasurements}</legend>
          <div className="grid-2">
            <div className="field">
              <label>
                Tight measurement (mm) {orderConfig.tightRequired && <span className="req">*</span>}
              </label>
              <div className="dim-row">
                <input type="text" name="tightW" inputMode="numeric" placeholder="Width e.g. 200" />
                <span className="dim-x">&times;</span>
                <input type="text" name="tightH" inputMode="numeric" placeholder="Height e.g. 600" />
              </div>
              <p className="help">{orderForm.tightHelp}</p>
              <div className="measure-diagram">{tightDiagram}</div>
            </div>
            <div className="field">
              <label>
                Visible measurement (mm) {orderConfig.visibleRequired && <span className="req">*</span>}
              </label>
              <div className="dim-row">
                <input type="text" name="visibleW" inputMode="numeric" placeholder="Width e.g. 190" />
                <span className="dim-x">&times;</span>
                <input type="text" name="visibleH" inputMode="numeric" placeholder="Height e.g. 580" />
              </div>
              <p className="help">{orderForm.visibleHelp}</p>
              <div className="measure-diagram">{visibleDiagram}</div>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>{orderForm.legendDetails}</legend>
          <div className="field">
            <label htmlFor="f-name">
              Name <span className="req">*</span>
            </label>
            <input type="text" id="f-name" name="name" />
          </div>
          <div className="grid-2">
            <div className="field">
              <label htmlFor="f-email">
                Email {orderConfig.emailRequired && <span className="req">*</span>}
              </label>
              <input type="email" id="f-email" name="email" />
            </div>
            <div className="field">
              <label htmlFor="f-phone">
                Phone {orderConfig.phoneRequired && <span className="req">*</span>}
              </label>
              <input type="tel" id="f-phone" name="phone" />
            </div>
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Sending…" : "Send my project details"}
        </button>
      </form>
    </div>
  );
}
