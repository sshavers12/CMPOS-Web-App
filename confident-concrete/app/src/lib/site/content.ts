export const BUSINESS = {
  name: "Confident Concrete",
  founder: "Zane Walker",
  founderRole: "Founder and operator",
  city: "Chester, Pennsylvania",
  county: "Delaware County",
  slogan: "We’re pouring with confidence.",
  logoTagline: "Strong foundations. Brighter tomorrow.",
  years: "37",
} as const;

export const FACTS = [
  { value: "≈37 years", label: "in concrete" },
  { value: "Foreman-led", label: "general foreman and top-lead responsibility" },
  { value: "Union trained", label: "union concrete background" },
  { value: "House to high-rise", label: "residential, commercial and high-rise work" },
] as const;

export const NAV = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

export const START_LINKS = [
  { to: "/consultation", label: "Request a consultation" },
  { to: "/upload", label: "Prepare photos" },
  { to: "/qr", label: "QR landing page" },
] as const;

export const STEPS = [
  {
    title: "Tell us about the pour",
    body: "Where the concrete is, what you need it to do, and when. Photos help if you have them.",
  },
  {
    title: "Zane reviews the details",
    body: "Feasibility, access, conditions and scope are judged by Zane, not by a form.",
  },
  {
    title: "Consultation",
    body: "A direct conversation about the site, the options and what the work involves.",
  },
  {
    title: "Scope and price, approved by Zane",
    body: "Nothing moves forward until Zane has confirmed the scope, the materials and the price.",
  },
] as const;

export const CONVERSATIONS = [
  {
    id: "residential",
    title: "Residential concrete",
    body: "Homes and properties around Chester and Delaware County. Bring the current condition, the goal and your timing.",
  },
  {
    id: "commercial",
    title: "Commercial concrete",
    body: "Site conditions, coordination and the people responsible for the next decision. Zane has led major commercial and high-rise work.",
  },
  {
    id: "not-sure",
    title: "Not sure what you need",
    body: "Describe what you are seeing. A short review tells you whether it is a concrete conversation and what to prepare.",
  },
] as const;

export const PHOTO_STAGES = [
  { id: "before", title: "Before", body: "Wide context and close details of the existing condition." },
  { id: "during", title: "During", body: "Preparation and process, when it is practical and safe to capture." },
  { id: "after", title: "After", body: "Clear views of the finished concrete." },
] as const;
