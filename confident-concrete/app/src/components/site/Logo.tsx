import { Link } from "@tanstack/react-router";
import { useId } from "react";

type MonogramProps = {
  className?: string;
  /** Colour of the rear C. Defaults to the brand orange. */
  back?: string;
  /** Colour of the front C. Silver on dark grounds, ink on light ones. */
  front?: string;
  /** Thin separator drawn behind the front C so the two letters stay distinct. */
  keyline?: string;
  title?: string;
};

/**
 * The Confident Concrete CC monogram, redrawn as vector from the approved badge
 * logo so it stays sharp in the header, the favicon and print. The full badge is
 * the primary logo; this is the compact mark for small sizes.
 */
export function Monogram({
  className,
  back = "var(--brand-orange)",
  front = "var(--brand-silver)",
  keyline = "var(--ink)",
  title,
}: MonogramProps) {
  const id = useId().replace(/:/g, "");
  const mask = `cc-${id}`;
  const c = (fill: string) => (
    <g mask={`url(#${mask})`}>
      <rect x="-6" y="-6" width="116" height="116" fill={fill} />
    </g>
  );
  return (
    <svg
      className={className}
      viewBox="0 0 162 138"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <mask id={mask} maskUnits="userSpaceOnUse" x="-6" y="-6" width="116" height="116">
          <rect x="-6" y="-6" width="116" height="116" fill="black" />
          <rect x="0" y="0" width="100" height="100" rx="27" fill="white" />
          <rect x="27" y="27" width="46" height="46" rx="13" fill="black" />
          <rect x="50" y="39" width="58" height="22" rx="6" fill="black" />
        </mask>
      </defs>
      {c(back)}
      <g transform="translate(62 38)">
        {keyline ? <g transform="translate(-4 -4) scale(1.08)">{c(keyline)}</g> : null}
        {c(front)}
      </g>
    </svg>
  );
}

type BadgeProps = {
  /** Rendered width in CSS pixels. Picks the right source set. */
  width?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
};

/**
 * The primary Confident Concrete badge logo, supplied by the owner.
 * Transparent background, so it sits on the cement and charcoal grounds alike.
 */
export function BadgeLogo({
  width = 560,
  className,
  priority = false,
  alt = "Confident Concrete. Chester, Pennsylvania. Strong foundations, brighter tomorrow.",
}: BadgeProps) {
  const large = width > 300;
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={
          large
            ? "/brand/logo-badge-560.webp 560w, /brand/logo-badge-1120.webp 1120w"
            : "/brand/logo-badge-260.webp 260w, /brand/logo-badge-560.webp 560w"
        }
        sizes={`${width}px`}
      />
      <img
        className={className}
        src={large ? "/brand/logo-badge-560.png" : "/brand/logo-badge-260.png"}
        srcSet={
          large
            ? "/brand/logo-badge-560.png 560w, /brand/logo-badge-1120.png 1120w"
            : "/brand/logo-badge-260.png 260w, /brand/logo-badge-560.png 560w"
        }
        sizes={`${width}px`}
        width={1254}
        height={1227}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  );
}

export function Wordmark() {
  return (
    <span className="brand__word" aria-hidden="true">
      <span>Confident</span>
      <span>Concrete</span>
    </span>
  );
}

type LockupProps = {
  variant?: "dark" | "light";
  size?: "default" | "large";
  asLink?: boolean;
  className?: string;
};

/** Compact header and footer lockup: CC monogram beside the stacked wordmark. */
export function Lockup({ variant = "dark", size = "default", asLink = true, className = "" }: LockupProps) {
  const onDark = variant === "light";
  const classes = ["brand", onDark ? "brand--light" : "", size === "large" ? "brand--large" : "", className]
    .filter(Boolean)
    .join(" ");
  const inner = (
    <>
      <Monogram
        className="brand__mark"
        front={onDark ? "var(--brand-silver)" : "var(--ink)"}
        keyline={onDark ? "var(--ink)" : "var(--cement)"}
      />
      <Wordmark />
    </>
  );
  if (!asLink) {
    return (
      <span className={classes} aria-label="Confident Concrete">
        {inner}
      </span>
    );
  }
  return (
    <Link to="/" className={classes} aria-label="Confident Concrete, home">
      {inner}
    </Link>
  );
}
