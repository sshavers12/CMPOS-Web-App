/**
 * Hero illustration: a painted mixer chute pours cement grey into a slab.
 * Draws once on load; fully static under prefers-reduced-motion (see styles.css).
 */
export function PourIllustration() {
  return (
    <svg
      className="pour pour--animate"
      viewBox="0 0 400 320"
      role="img"
      aria-labelledby="pour-title"
      focusable="false"
    >
      <title id="pour-title">A concrete truck chute pouring a fresh slab</title>
      <g stroke="#3e3d39" strokeWidth="1">
        <path d="M0 262 H400" />
        <path d="M0 300 H400" />
        <path d="M0 224 H400" strokeDasharray="4 6" />
      </g>
      <g stroke="#3e3d39" strokeWidth="1" strokeDasharray="4 6">
        <path d="M40 0 V320" />
        <path d="M360 0 V320" />
      </g>
      <path
        d="M20 40 L150 100 L240 150 L302 190"
        fill="none"
        stroke="#b8401a"
        strokeWidth="28"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <path
        d="M20 40 L150 100 L240 150 L302 190"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="4"
        strokeLinejoin="miter"
        strokeLinecap="butt"
        transform="translate(0 -9)"
      />
      <circle cx="150" cy="100" r="5.5" fill="#1a1a19" stroke="#edeae4" strokeWidth="2" />
      <circle cx="240" cy="150" r="5.5" fill="#1a1a19" stroke="#edeae4" strokeWidth="2" />
      <path className="pour__stream" d="M290 190 L316 190 L326 262 L280 262 Z" fill="#d6d1c7" />
      <path className="pour__slab" d="M110 262 H372 V292 H90 Z" fill="#d6d1c7" />
      <path className="pour__slab" d="M110 262 H372" stroke="#edeae4" strokeWidth="2" />
    </svg>
  );
}
