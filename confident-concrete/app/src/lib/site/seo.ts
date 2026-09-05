export const SITE_URL = "https://confident-concrete.higgsfield.app";
export const SITE_NAME = "Confident Concrete";
export const OG_IMAGE = `${SITE_URL}/og.png`;

type PageHeadInput = {
  title: string;
  description: string;
  path: string;
  robots?: string;
};

export function pageHead({ title, description, path, robots }: PageHeadInput) {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
      ...(robots ? [{ name: "robots", content: robots }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const PUBLIC_ROUTES: { path: string; priority: string; changefreq: string }[] = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/services", priority: "0.8", changefreq: "monthly" },
  { path: "/portfolio", priority: "0.7", changefreq: "monthly" },
  { path: "/consultation", priority: "0.9", changefreq: "monthly" },
  { path: "/upload", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
  { path: "/qr", priority: "0.5", changefreq: "yearly" },
];
