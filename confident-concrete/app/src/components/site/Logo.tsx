import { Link } from "@tanstack/react-router";

type MarkProps = {
  className?: string;
  /** Color of the chute. Defaults to currentColor so masters stay one color. */
  chute?: string;
  /** Color of the pour and slab. Defaults to currentColor. */
  pour?: string;
  title?: string;
};

/**
 * The Confident Concrete chute mark. Review concept, pending Zane Walker's
 * approval: the rear half of a mixer chute pours a controlled stream into a slab
 * that becomes the baseline of the name.
 */
export function ChuteMark({ className, chute = "currentColor", pour = "currentColor", title }: MarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M6 22 L38 36 L62 50 L74 60"
        fill="none"
        stroke={chute}
        strokeWidth="10"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <path d="M69 63 L80 63 L86 82 L64 82 Z" fill={pour} />
      <path d="M22 82 H94 V92 H12 Z" fill={pour} />
    </svg>
  );
}

type LockupProps = {
  variant?: "dark" | "light";
  size?: "default" | "large";
  asLink?: boolean;
  className?: string;
};

export function Wordmark() {
  return (
    <span className="brand__word" aria-hidden="true">
      <span>Confident</span>
      <span>Concrete</span>
    </span>
  );
}

export function Lockup({ variant = "dark", size = "default", asLink = true, className = "" }: LockupProps) {
  const classes = [
    "brand",
    variant === "light" ? "brand--light" : "",
    size === "large" ? "brand--large" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const inner = (
    <>
      <ChuteMark className="brand__mark" />
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
