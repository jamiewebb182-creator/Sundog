/**
 * ============================================================================
 * SITE CONTENT — edit this file to change almost anything you can read on
 * the site: wording, contact details, portfolio items, and the commission
 * form's copy and required fields.
 *
 * This is the ONE file to open for day-to-day changes. Saving a change here
 * (and deploying) is the whole update — nothing else needs to change for a
 * text or price edit. Images referenced below live in /public/images/.
 * ============================================================================
 */

export const site = {
  name: "Sundog Stained Glass",
  tagline: "Bespoke leaded glass for Bristol’s period homes.",
  bio: "I design and hand-lead stained and coloured glass panels for Victorian and Edwardian houses across Bristol and the South West — front doors, fanlights and side-lights, built to match your home’s original joinery and let real coloured light back into the hallway.",

  // Hero image, top right of the homepage. Leave as `null` to show the
  // generated glass artwork (like the prototype); to use a real photo
  // instead, drop the file in /public/images/ and set e.g. "/images/hero.jpg".
  heroImage: "/images/hero.jpg" as string | null,
  heroCaption: "A recent panel, held up to the light.",

  galleryIntro:
    "A few pieces mid-build — most panels take three to five weeks from first sketch to fitting.",

  portfolioBlurb: "Finished panels with rough pricing, so you’ve a sense of scale before we speak.",
  orderBlurb: "Tell me about your window and I’ll come back with an estimate — no need to know every detail yet.",

  contactIntro: "Based in Bristol, working on doors and windows across the South West. Email is best.",
  email: "hello@sundogstainedglass.co.uk",
  phone: "0117 496 0271",
  location: "Bristol, UK",
  instagram: "@sundogstainedglass",

  portfolioIntro: "Every piece below is hand-cut and leaded to order — prices are a rough guide and depend on size and glass.",
  orderIntro: "Fill in what you can below. Nothing here is final — it just gives me enough to send a first estimate.",
};

/**
 * The three "In the workshop" photos on the homepage. `image: null` shows
 * generated glass artwork as a placeholder — add a real photo by dropping
 * it in /public/images/ and setting the path, e.g. "/images/workshop-1.jpg".
 */
export const galleryImages: { image: string | null; caption: string; palette: number }[] = [
  { image: null, caption: "Cutting glass on the bench", palette: 0 },
  { image: null, caption: "A front door panel, leaded and puttied", palette: 1 },
  { image: null, caption: "Fanlight restoration, ready to fit", palette: 3 },
];

/** The 5-step "how it works" row at the top of the commission page. */
export const steps = [
  { title: "Tell us about it", desc: "Design ideas, rough measurements and how to reach you." },
  { title: "Get an estimate", desc: "A rough price and any questions, usually within 2–3 days." },
  { title: "Confirm & deposit", desc: "Agree the design and pay a deposit to secure your slot." },
  { title: "Made by hand", desc: "Cut, painted and leaded in the workshop — typically 3–5 weeks." },
  { title: "Fit or collect", desc: "Fitted in person, or boxed up for you to collect." },
];

export type PortfolioItem = {
  code: string;
  title: string;
  price: string;
  desc: string;
  /** null shows generated glass artwork; set a path under /public/images/ for a real photo. */
  image: string | null;
  palette: number;
};

/** Portfolio items. Add a new one by copying a block and giving it a unique `code`. */
export const portfolio: PortfolioItem[] = [
  {
    code: "SDG-101",
    title: "Fanlight Sunburst",
    price: "From £480",
    desc: "A radiating sunburst fanlight in amber and clear textured glass — a classic Victorian entrance piece.",
    image: null,
    palette: 3,
  },
  {
    code: "SDG-104",
    title: "Ribbon & Rose Border",
    price: "From £650",
    desc: "A hand-painted rose motif with a ribbon-bordered surround, leaded in traditional came.",
    image: null,
    palette: 2,
  },
  {
    code: "SDG-108",
    title: "Diamond Quarry Lights",
    price: "From £395",
    desc: "Diamond-cut quarry glazing for side-lights, in soft green and clear tones.",
    image: null,
    palette: 1,
  },
  {
    code: "SDG-112",
    title: "Art Nouveau Tulip Panel",
    price: "From £720",
    desc: "A flowing tulip design in the Art Nouveau style, for a full-height door panel.",
    image: null,
    palette: 0,
  },
  {
    code: "SDG-115",
    title: "Bay Window Roundel",
    price: "From £310",
    desc: "A single decorative roundel to sit within an existing bay window pane.",
    image: null,
    palette: 3,
  },
  {
    code: "SDG-119",
    title: "Front Door Fern Panel",
    price: "From £540",
    desc: "A restrained fern and lead-line design, suited to Edwardian doors.",
    image: null,
    palette: 1,
  },
];

/**
 * Commission form copy and behaviour. `orderConfig` controls which fields
 * are required — flip a value to `true`/`false` to change what customers
 * must fill in before they can submit.
 */
export const orderForm = {
  legendProject: "Your project",
  projectNote: "None of these are essential on their own — just give us enough to picture the piece.",
  notesLabel: "Describe the design",
  notesHelp: "Needed if you haven't added a portfolio piece, photo or drawing above.",
  legendColour: "Choose your colours",
  colourHeadline: "Coming in the next iteration",
  colourBody:
    "An interactive tool for picking your own colours and filling in a pattern is on its way. For now, a reference photo, sketch or the notes above work just as well.",
  legendMeasurements: "Measurements",
  tightHelp: "The frame's inner opening — where the glass actually sits. An estimate is fine for now.",
  visibleHelp: "What you'll actually see once it's fitted. Estimate if you're not sure.",
  legendDetails: "Your details",
};

export const orderConfig = {
  // Every enquiry always needs a portfolio piece, a photo, a drawing, OR
  // written notes (that rule isn't a toggle — it's how the form makes sense).
  tightRequired: true,
  visibleRequired: true,
  emailRequired: true,
  phoneRequired: false,
};

/**
 * Where new-order notification emails are sent. Using your real inbox for
 * now (not the not-yet-real hello@sundogstainedglass.co.uk above) because
 * Resend can only deliver to this address until a real domain is verified —
 * see the deployment notes for how to move this to a business inbox later.
 */
export const notifyEmail = "jamie.webb182@gmail.com";
