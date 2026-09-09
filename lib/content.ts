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
  heroCaption: "A victorian style door panel, held up to catch the light.",

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
  { image: "/images/workshop-1.jpg", caption: "Cutting glass on the bench", palette: 0 },
  { image: "/images/workshop-2.jpg", caption: "A front door panel, leaded and puttied", palette: 1 },
  { image: "/images/workshop-3.jpg", caption: "Fanlight restoration, ready to fit", palette: 3 },
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
  /**
   * The real photo's exact pixel width and height (only needed when `image`
   * is set). The portfolio grid is a masonry layout — each photo keeps its
   * own natural shape instead of being cropped to fit a fixed box, so these
   * numbers must match the actual file exactly or the photo can look
   * stretched. Always come as a pair from whoever prepared the photo.
   */
  imageWidth?: number;
  imageHeight?: number;
  palette: number;
};

/**
 * Portfolio items. Add a new one by copying a block and giving it a unique
 * `code` — new pieces use plain numbers: "001", "002", "003", and so on.
 */
export const portfolio: PortfolioItem[] = [
  {
    code: "001",
    title: "Victorian Stained Glass Door Panels",
    price: "£600 per pair",
    desc: "A pair of Victorian-style door panels, with a rosette and two diamond motifs, in traditional cathedral stained glass.",
    image: "/images/portfolio-001.jpg",
    imageWidth: 1000,
    imageHeight: 1749,
    palette: 0,
  },
  {
    code: "002",
    title: "Victorian Transom Window Panel",
    price: "From £360",
    desc: "A Victorian-style panel with a central rosette and rondels, mixing traditional cathedral glass with a more modern water-pattern clear to bring in light.",
    image: "/images/portfolio-002.jpg",
    imageWidth: 870,
    imageHeight: 499,
    palette: 2,
  },
  {
    code: "003",
    title: "Victorian Style Front Door Panels",
    price: "From £1,200",
    desc: "Four bespoke Victorian-style stained glass panels, with rosettes, rondels and jewels, to match the original transom window.",
    image: "/images/portfolio-003.jpg",
    imageWidth: 557,
    imageHeight: 790,
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
