# Confident Concrete. Design brief (rebuild, September 2026)

## Design read
A homeowner or a commercial contact in Chester, Pennsylvania or Delaware County lands here on a phone, needs to know in five seconds who Confident Concrete is, who Zane Walker is, and how to start. The emotional register is quiet competence: a crew that shows up with 37 years of judgment, not a template that shouts.

## Why Version 4 was rejected (and what this brief does about it)
- V4 forced `white-space: nowrap` on 68px+ uppercase condensed headlines and hid the overflow with `overflow-x: clip`, so words were cut off or overlapped on phones. This brief bans nowrap on any text that can exceed a phone width and sizes display type fluidly from 44px at 320px wide.
- V4 hid every navigation link below desktop width without a menu. This brief ships a real mobile menu that is tested at every required width.
- V4 rendered disabled submit and upload controls, so "buttons did nothing." This brief ships no dead controls: every button performs a real, honest action on the device (build a request summary, copy it, download it, preview and tag photos locally, copy a link, download a QR code).
- V4 exposed internal notes ("REQUIRES ZANE DECISION") on public pages. Pending items are written in customer language.

## Concept spine: poured in place
The site is built the way a slab is built. Formwork first (a disciplined grid and rules), then the pour (a dark charcoal hero where a painted chute pours cement-grey into the page), then the finish (calm cement-toned content with scored joints between sections). The chute mark refines Zane's own logo idea: the rear half of a mixer chute pouring the name into a slab.

## Palette (locked)
- Cement `#EDEAE4` page ground, slab `#E3DFD7` alternate ground, chalk `#F7F5F1` cards.
- Ink `#1A1A19` dark sections and text, ink-2 `#2A2A28` panels on dark.
- Muted text `#56534D` (6.4:1 on cement), muted-on-dark `#B5B0A6` (8.1:1 on ink).
- Accent, form-stake orange `#B8401A` (white on accent 5.6:1, accent on cement 4.6:1). Used for the chute, the primary call to action, and focus rings. Nothing else is orange.
- Rules `#C9C4BA` on light, `#3E3D39` on dark.
Defense: concrete grey, formwork charcoal, and the orange of a painted chute and a form stake are the honest colors of the trade. Black and white stay reserved for the logo masters, as Zane asked.

## Type (locked)
Archivo variable (self-hosted, width axis). Display at 87.5% width, weight 800, tracking -0.02em, fluid from 44px to 92px. Body at 100% width, 17px on desktop, 16px on phones, line height 1.6. No serif, no italic headings, no all-caps paragraphs.

## Animation mode
non-animated. The owner asked for restrained animation; the acceptance tests require reduced-motion behavior. One signature motion: the hero pour draws once on load (stream then slab), fully disabled under `prefers-reduced-motion`. Everything else is hover and press feedback.

## Section plan (home)
1. Hero, split: statement left, chute illustration right, facts plate below (dark).
2. Conversation ledger: residential, commercial, not sure yet (light).
3. How a project starts: four numbered steps on a rail (slab tint).
4. Zane Walker record: statement plus field record card (dark).
5. Proof standard: before, during, after frames, honestly empty (light).
6. Call to action band and footer (dark).

## Asset plan
Refined chute mark (SVG, black and white masters plus the accent variant for the hero), hero pour illustration (SVG), favicon (SVG and PNG), OG card (rendered from HTML), QR code (SVG, generated from the live URL). No stock photography, no generated "project" imagery. Photo frames stay visibly empty until Zane approves real project photography.

## CTA inventory
- Request a consultation (primary, accent slab, everywhere).
- Prepare photos (secondary, outlined).
- How a project starts (text link with arrow, hero only).
- Build my summary, Copy summary, Download summary (consultation page tools).
- Choose photos, Remove, Clear all (upload page tools).
- Copy link, Download QR code (QR page tools).

## Facts that may appear (verified only)
Confident Concrete. Zane Walker, founder and operator. Chester, Pennsylvania. Delaware County. Approximately 37 years in concrete. Union concrete, residential, major commercial and high-rise, general foreman and top-lead responsibility. Slogan: "We're pouring with confidence." Zane makes every scope, feasibility, pricing, and technical decision.

## Facts that may not appear
Phone, email, address, service radius, service menu, licenses, insurance, bonding, certifications, prices, deposits, payment methods, financing, warranties, guarantees, project names, results, testimonials, reviews, turnaround times, staff size, equipment, capacity.
