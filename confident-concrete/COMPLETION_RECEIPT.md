# Completion receipt. FABLE_5_1_CONFIDENT_CONCRETE_RESCUE_HANDOFF_001

## Final URL

**https://confident-concrete.higgsfield.app** (public, no sign-in)

QR landing page: https://confident-concrete.higgsfield.app/qr  
Marketplace listing: https://higgsfield.ai/supercomputer/apps/58e633ac-f295-437b-bcc1-c0b6d6b8df7e/view

The rejected Version 4 at `confident-concrete-prototype.shavers.chatgpt.site` is untouched and
still available for comparison. It was not modified, patched or reused.

## Version and commit identifiers

| Item | Value |
|---|---|
| Site repository commit (deployed) | `0f185bb80afe31bba2cb9f3c37a8338c0e6be3d0` |
| Source of record (GitHub branch) | `claude/fable-5-1-mobile-rebuild-jde5z5` in `sshavers12/CMPOS-Web-App` |
| Higgsfield website id | `dbdb0d24-4d0b-4c48-81fd-c478a6b59f95` |
| Deploy status | deployed and published |
| Rejected predecessor | Version 4, commit `30188a46522d863a570d69e0538166744f7f5929` |

## What changed, and why

Version 4 was treated as rejected reference material, not as a foundation. The public
experience was rebuilt from a new direction described in `DESIGN_BRIEF.md`:

- **Poured in place.** Formwork discipline (a strict grid), the pour (a dark charcoal hero
  where a painted chute pours cement grey into the page), then the finish (calm cement-toned
  content with scored joints between sections).
- **The owner's badge logo leads.** The supplied Confident Concrete badge (finisher, mixer
  chute, river bridge, Chester PA lockup) is the primary mark. It sits in the hero, the footer
  and the social card, with only the white surround removed so it works on both grounds. A CC
  monogram redrawn as vector from the badge carries the header, the browser tab and small sizes.
- **Palette taken from that logo.** Brand orange `#F26B1D`, deep orange `#D24C08`, silver
  `#E6E9E7`, steel `#B0AEB1`, on cement `#EDEAE4` and charcoal `#1A1A19`. Buttons and links on
  light grounds use a deepened `#C2450F` so white labels clear WCAG AA; the true brand orange
  carries graphics and accent text on dark. Nothing is green.
- **Type.** Archivo variable, self-hosted, width axis. Display type scales fluidly from 44px
  at 320px wide to 92px at 1440px. No `nowrap` on any text that can exceed a phone width.

### The four owner complaints, and the fix for each

| Owner complaint | Root cause in Version 4 | Fix in this build |
|---|---|---|
| "Words overlap or break incorrectly" | `white-space: nowrap` on large uppercase condensed headings, with the overflow hidden by `overflow-x: clip` | No nowrap anywhere. Fluid `clamp()` display sizes, `text-wrap: balance`, `overflow-wrap: break-word`, and an automated overlap and clipping assertion at all 8 widths |
| "Not reliably mobile responsive" | Navigation hidden below desktop width with no replacement; fixed-width panels | Real mobile menu with focus management and Escape; every multi-column block declares its own collapse; container queries where a panel is narrower than the page |
| "Some buttons work while others do not" | Disabled submit and upload controls that looked live | No dead controls. Every button performs a real action on the device: build a request summary, copy it, download it, preview and label photos, copy a link, download the QR code |
| "Design looks horrible, not professional" | Document-like all-black layout with weak hierarchy | New premium direction, generous spacing, restrained single motion, real illustration and a refined chute mark |

## Acceptance test results

Run against the live public URL, anonymously, with Playwright and headless Chromium.
Full detail in `qa/LIVE_ACCEPTANCE_EVIDENCE.md`.

| Acceptance requirement | Result |
|---|---|
| Full-page screenshots at 320, 375, 390, 414, 768, 1024, 1280, 1440 | 64 route/width screenshots captured, plus 5 state captures |
| `scrollWidth <= clientWidth` on every public route at every width | PASS, 64 of 64 |
| No split words, overlap, clipping or overflow | PASS, asserted per element at all 64 combinations |
| Navigation, logo, calls to action, forms, imagery, footer legible and operable | PASS at all widths |
| Focus states, contrast, reduced motion, keyboard navigation | PASS, 0 elements below WCAG AA, 0 animations under reduced motion |
| Matrix of every visible link and button with expected and tested result | 328 checks, 0 failures |
| Every header, footer, inline, card, CTA, upload, consultation, contact and QR action clicked | PASS |
| No dead controls, misleading submit buttons, empty links or auth walls | PASS |
| Internal routes not discoverable and not accessible | PASS, `/owner`, `/portal`, `/workflow` return a branded 404 and do not exist in the build |
| Homepage states business, Zane's role, Chester and Delaware County, and a next action | PASS, all four appear in the opening viewport |
| No invented business facts or fabricated proof | PASS, see the fact register below |
| Placeholder imagery cannot be mistaken for Zane's work | PASS, photo frames are visibly empty and labelled |
| Contact and consultation behavior reflects the implemented backend | PASS, both pages state plainly that nothing is sent or stored |
| Build and automated tests pass | PASS |
| Public deployment succeeds | PASS |
| Anonymous requests to the 8 public routes return the intended pages | PASS, 200 for all 8 |
| Anonymous access does not require a sign-in | PASS |
| Final published version verified, not only localhost | PASS, all results above are from the live URL |

Totals: **64 responsive checks, 328 link and control checks, 4 accessibility checks,
18 anonymous HTTP checks, 0 failures, 0 browser console errors.** The suite was re-run in full
against the live site after the branding pass, with the same result.

## Screenshot index

`qa/LIVE_ACCEPTANCE_EVIDENCE.md` lists all 69 files. Archive with the machine-readable
report: https://d2ol7oe51mr4n9.cloudfront.net/user_31yrqQpNO1uRz1TyAwuUsNb1BnI/185ff479-6efc-40fb-ba7d-ac44d7300c79.zip

## Fact register: what the site says about the business

Only these verified facts appear: Confident Concrete; Zane Walker, founder and operator;
Chester, Pennsylvania; Delaware County; approximately 37 years in concrete; union concrete
background; residential, major commercial and high-rise work; general foreman and top-lead
responsibility; "We're pouring with confidence."; and that Zane decides scope, feasibility,
pricing and technical execution.

Deliberately absent, because they are not approved: phone number, email address, street
address, service radius, service menu, licensing, insurance, bonding, certifications, union
status claims beyond the stated experience, prices, deposits, payment methods, financing,
warranties, guarantees, project names, results, testimonials, reviews, turnaround times, staff
size, equipment and capacity.

Where a visitor would expect one of those, the site says so in customer language, for example
"Phone and email will be published here once Zane approves them." No internal wording such as
"REQUIRES ZANE DECISION" is visible to the public.

## Known limitations

1. **No submission backend.** The consultation page builds a request summary the visitor can
   copy or download, and the photo page previews and labels files locally. Nothing is
   transmitted or stored, and both pages say so before the visitor starts. This is the honest
   behavior until Zane approves a contact channel and a place to receive files.
2. **Portfolio is empty by design.** The before, during and after frames are visibly empty and
   labelled "Awaiting approved project photography". No stock or generated imagery is used
   anywhere as project proof.
3. **Logo tagline versus spoken slogan.** The badge carries its own lockup text, "Chester, PA"
   and "Strong foundations. Brighter tomorrow." The page's spoken slogan stays the approved
   "We're pouring with confidence." If Zane wants the badge tagline used as site copy too, say
   so and it takes one edit.
4. **The Higgsfield subdomain is not a business domain.** If Zane wants
   `confidentconcrete.com` or similar, that is a domain purchase and a DNS change, not a
   rebuild.
5. **Owner, portal and workflow surfaces are absent, not hidden.** They were removed from this
   build rather than shipped behind a wall. They can be rebuilt separately once the record,
   authentication and storage decisions are made.

## Remaining Zane Walker approvals

| # | Decision | Blocks |
|---|---|---|
| 1 | Public phone number and email address | Contact page, footer, QR page, business cards |
| 2 | Confirm the badge is the final logo, and whether the badge tagline should also be site copy | Logo lock, print, apparel, vehicle graphics |
| 3 | Service menu and service area | The Services page currently describes the review rather than a list |
| 4 | Approved project photography, captions and customer permission | Portfolio and before/after galleries |
| 5 | Legal entity, license and insurance lines, if any are to be published | Footer and contact page |
| 6 | Consultation policy, deposit policy, payment methods | Consultation page policy lines |
| 7 | Where consultation requests should be delivered, and where photos may be stored | Turning on real submission and upload |
| 8 | Business domain name, if the Higgsfield subdomain is not final | Public address on all printed collateral |

Items 1, 3, 4 and 7 are the ones a visitor will notice first.

## How to verify

```
curl -I https://confident-concrete.higgsfield.app/
node qa/run-qa.mjs https://confident-concrete.higgsfield.app ./qa-output
```
