# Confident Concrete. Design brief (rebuild, September 2026)

## Design read
A homeowner or a commercial contact in Chester, Pennsylvania or Delaware County lands here on a phone, needs to know in five seconds who Confident Concrete is, who Zane Walker is, and how to start. The emotional register is quiet competence: a crew that shows up with 37 years of judgment, not a template that shouts.

## Why Version 4 was rejected (and what this brief does about it)
- V4 forced `white-space: nowrap` on 68px+ uppercase condensed headlines and hid the overflow with `overflow-x: clip`, so words were cut off or overlapped on phones. This brief bans nowrap on any text that can exceed a phone width and sizes display type fluidly from 44px at 320px wide.
- V4 hid every navigation link below desktop width without a menu. This brief ships a real mobile menu that is tested at every required width.
- V4 rendered disabled submit and upload controls, so "buttons did nothing." This brief ships no dead controls: every button performs a real, honest action on the device (build a request summary, copy it, download it, preview and tag photos locally, copy a link, download a QR code).
- V4 exposed internal notes ("REQUIRES ZANE DECISION") on public pages. Pending items are written in customer language.
- The first pass of this rebuild used an older black-and-white chute concept because the owner's real badge logo sat in a subfolder of the handoff that was not opened. The badge is now the primary mark everywhere.

## Concept spine: poured in place
The site is built the way a slab is built. Formwork first (a disciplined grid and rules), then the pour (a dark charcoal hero where a painted chute pours cement-grey into the page), then the finish (calm cement-toned content with scored joints between sections). The chute mark refines Zane's own logo idea: the rear half of a mixer chute pouring the name into a slab.

## Palette (locked, taken from the owner's badge logo)
The logo is the source of the palette, not the other way round. Colours were sampled from the supplied badge artwork.
- Brand orange `#F26B1D` and deep orange `#D24C08`, sampled from the badge ring and the CONFIDENT lettering.
- Brand silver `#E6E9E7` and steel `#B0AEB1`, sampled from the CONCRETE lettering and the mixer drum.
- Cement `#EDEAE4` page ground, slab `#E3DFD7` alternate ground, chalk `#F7F5F1` cards.
- Ink `#1A1A19` dark sections and text, ink-2 `#2A2A28` panels on dark.
- Muted text `#56534D` (6.4:1 on cement), muted-on-dark `#B5B0A6` (8.1:1 on ink).
- Interactive orange `#C2450F`. The brand orange is too light to carry white button labels at 4.5:1, so buttons and links on light grounds use this deepened version, and the true brand orange is used for graphics and for accent text on dark, where it reads at 6:1 or better.
- Rules `#C9C4BA` on light, `#3E3D39` on dark.
Defense: the badge already decided this. Orange, steel and charcoal are the owner's colours; the site simply carries them at accessible values.

## Type (locked)
Archivo variable (self-hosted, width axis). Display at 87.5% width, weight 800, tracking -0.02em, fluid from 44px to 92px. Body at 100% width, 17px on desktop, 16px on phones, line height 1.6. No serif, no italic headings, no all-caps paragraphs.

## Animation mode
non-animated. The owner asked for restrained animation. The badge logo is the hero's visual weight, so it needs no entrance effect; the page ships with zero running animations, which also makes the reduced-motion requirement trivially true. Motion is limited to hover and press feedback.

## Section plan (home)
1. Hero, split: statement left, badge logo right, facts plate below (dark).
2. Conversation ledger: residential, commercial, not sure yet (light).
3. How a project starts: four numbered steps on a rail (slab tint).
4. Zane Walker record: statement plus field record card (dark).
5. Proof standard: before, during, after frames, honestly empty (light).
6. Call to action band and footer (dark).

## Asset plan
The owner's badge logo is the primary mark and it leads the hero, the footer and the social card. It is used as supplied, with only the white surround removed so it sits on both the cement and charcoal grounds. Derived assets: WebP and quantised PNG at 260, 560 and 1120 CSS pixels; a CC monogram redrawn as vector from the badge for the header, the browser tab and small print; a charcoal favicon tile carrying that monogram; an OG card rendered from HTML around the badge; a QR code generated from the live URL. No stock photography, no generated "project" imagery. Photo frames stay visibly empty until Zane approves real project photography.

## CTA inventory
- Request a consultation (primary, accent slab, everywhere).
- Prepare photos (secondary, outlined).
- How a project starts (text link with arrow, hero only).
- Build my summary, Copy summary, Download summary (consultation page tools).
- Choose photos, Remove, Clear all (upload page tools).
- Copy link, Download QR code (QR page tools).

## Facts that may appear (verified only)
Confident Concrete. Zane Walker, founder and operator. Chester, Pennsylvania. Delaware County. Approximately 37 years in concrete. Union concrete, residential, major commercial and high-rise, general foreman and top-lead responsibility. Slogan: "We're pouring with confidence." The badge logo carries its own lockup text, "Chester, PA" and "Strong foundations. Brighter tomorrow."; the spoken slogan on the page stays the approved one. Zane makes every scope, feasibility, pricing, and technical decision.

## Facts that may not appear
Phone, email, address, service radius, service menu, licenses, insurance, bonding, certifications, prices, deposits, payment methods, financing, warranties, guarantees, project names, results, testimonials, reviews, turnaround times, staff size, equipment, capacity.
