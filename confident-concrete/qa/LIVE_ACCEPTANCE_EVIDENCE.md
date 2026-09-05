# Confident Concrete. Live acceptance evidence

Target: https://confident-concrete.higgsfield.app  
Run: 2026-09-05T13:39Z to 2026-09-05T13:45Z (branding pass)  
Tool: Playwright + headless Chromium, anonymous (no cookies, no sign-in).  
Deploy commit (site repo): `0f185bb80afe31bba2cb9f3c37a8338c0e6be3d0`

## Summary

| Check group | Count | Failures |
|---|---|---|
| Responsive (8 routes x 8 widths) | 64 | 0 |
| Links, buttons and controls | 328 | 0 |
| Accessibility and behavior | 4 | 0 |
| Anonymous HTTP status | 18 | 0 |
| Browser console errors | 0 | 0 |

## Anonymous HTTP

| Path | Status | Content type | Title |
|---|---|---|---|
| `/` | 200 | text/html | Confident Concrete. Chester, Pennsylvania concrete led by Zane Walker |
| `/about` | 200 | text/html | About Zane Walker and Confident Concrete |
| `/services` | 200 | text/html | Services. What a Confident Concrete consultation covers |
| `/portfolio` | 200 | text/html | Portfolio. Confident Concrete project proof standard |
| `/consultation` | 200 | text/html | Request a consultation with Confident Concrete |
| `/upload` | 200 | text/html | Prepare photos and documents for Confident Concrete |
| `/contact` | 200 | text/html | Contact Confident Concrete in Chester, Pennsylvania |
| `/qr` | 200 | text/html | Start a project with Confident Concrete |
| `/owner` | 404 | text/html | branded not-found page |
| `/portal` | 404 | text/html | branded not-found page |
| `/workflow` | 404 | text/html | branded not-found page |
| `/before-after` | 307 -> /portfolio#before-after | | |
| `/nope-not-a-page` | 404 | text/html | branded not-found page |
| `/robots.txt` | 200 | text/plain | |
| `/sitemap.xml` | 200 | application/xml | |
| `/qr-code.svg` | 200 | image/svg+xml | |
| `/og.png` | 200 | image/png | |
| `/favicon.svg` | 200 | image/svg+xml | |

No route required authentication. The former internal surfaces `/owner`, `/portal` and
`/workflow` do not exist in this build and are not linked anywhere.

## Responsive: scrollWidth vs clientWidth, overflow, clipping, overlap

| Route | 320px | 375px | 390px | 414px | 768px | 1024px | 1280px | 1440px |
|---|---|---|---|---|---|---|---|---|
| `/` | 320/320 ok | 375/375 ok | 390/390 ok | 414/414 ok | 768/768 ok | 1024/1024 ok | 1280/1280 ok | 1440/1440 ok |
| `/about` | 320/320 ok | 375/375 ok | 390/390 ok | 414/414 ok | 768/768 ok | 1024/1024 ok | 1280/1280 ok | 1440/1440 ok |
| `/services` | 320/320 ok | 375/375 ok | 390/390 ok | 414/414 ok | 768/768 ok | 1024/1024 ok | 1280/1280 ok | 1440/1440 ok |
| `/portfolio` | 320/320 ok | 375/375 ok | 390/390 ok | 414/414 ok | 768/768 ok | 1024/1024 ok | 1280/1280 ok | 1440/1440 ok |
| `/consultation` | 320/320 ok | 375/375 ok | 390/390 ok | 414/414 ok | 768/768 ok | 1024/1024 ok | 1280/1280 ok | 1440/1440 ok |
| `/upload` | 320/320 ok | 375/375 ok | 390/390 ok | 414/414 ok | 768/768 ok | 1024/1024 ok | 1280/1280 ok | 1440/1440 ok |
| `/contact` | 320/320 ok | 375/375 ok | 390/390 ok | 414/414 ok | 768/768 ok | 1024/1024 ok | 1280/1280 ok | 1440/1440 ok |
| `/qr` | 320/320 ok | 375/375 ok | 390/390 ok | 414/414 ok | 768/768 ok | 1024/1024 ok | 1280/1280 ok | 1440/1440 ok |

Each cell reports `document.documentElement.scrollWidth / clientWidth`. In addition, at every
cell the run asserted that no visible element extended past the viewport on either side, that
no text element was clipped by its own container (`scrollWidth > clientWidth` with visible
overflow), and that no heading, label, lead paragraph or button overlapped another element.
All three assertions passed at all 64 combinations.

## Interactive controls

| Route | Control | Expected | Result | Detail |
|---|---|---|---|---|
| all 7 framed routes | Menu (open) | opens site menu | PASS | tested per route at 390px |
| all 7 framed routes | Escape | closes site menu | PASS | focus returns to the menu button |
| `/consultation` | Build my request summary (empty) | inline validation | PASS | 3 field errors shown, focus moved to first |
| `/consultation` | Build my request summary (filled) | summary appears | PASS | summary rendered |
| `/consultation` | Copy summary | clipboard holds summary, visible feedback | PASS | button reads "Copied" |
| `/consultation` | Download as text | text file download | PASS | confident-concrete-consultation-request.txt |
| `/upload` | Choose files | local previews appear | PASS | 2 previews |
| `/upload` | Capture stage | status updates | PASS | "2 files previewed: 0 before, 0 during, 1 after, 1 document." |
| `/upload` | Remove | preview removed | PASS | |
| `/upload` | Clear all previews | list empties | PASS | |
| `/qr` | Copy link | clipboard holds the /qr URL | PASS | https://confident-concrete.higgsfield.app/qr |
| `/qr` | Download QR code | SVG download | PASS | confident-concrete-qr.svg |
| `/contact` | Copy site link | clipboard holds the site URL | PASS | https://confident-concrete.higgsfield.app/ |

## Links

Every visible link was clicked or resolved at both 390px (menu open) and 1280px.
328 link and control checks, 0 failures.

| Placement | Label | Destination | Result |
|---|---|---|---|
| body | Skip to main content | `#main` | PASS |
| header | Confident Concrete, home | `/` | PASS |
| header (menu) | Home | `/` | PASS |
| header | About | `/about` | PASS |
| header | Services | `/services` | PASS |
| header | Portfolio | `/portfolio` | PASS |
| header | Contact | `/contact` | PASS |
| header (menu) | Prepare photos | `/upload` | PASS |
| header (menu) | QR landing page | `/qr` | PASS |
| header | Request a consultation | `/consultation` | PASS |
| body | Request a consultation | `/consultation` | PASS |
| body | How a project starts | `#process` | PASS |
| body | Request a consultation: Residential concrete | `/consultation` | PASS |
| body | Request a consultation: Commercial concrete | `/consultation` | PASS |
| body | Request a consultation: Not sure what you need | `/consultation` | PASS |
| body | About Zane and Confident Concrete | `/about` | PASS |
| body | See the portfolio standard | `/portfolio` | PASS |
| body | Prepare photos | `/upload` | PASS |
| body | What a first conversation covers | `/services` | PASS |
| body | Prepare photos and documents | `/upload` | PASS |
| body | Open the QR landing page | `/qr` | PASS |
| body | Download QR code | `/qr-code.svg` | PASS |
| body | Contact page | `/contact` | PASS |
| header (QR page) | Full site | `/` | PASS |
| footer | Home, About, Services, Portfolio, Contact | matching routes | PASS |
| footer | Request a consultation, Prepare photos, QR landing page | matching routes | PASS |

No dead control, no empty link, no misleading submit button, and no unexpected
authentication wall was found.

## Accessibility and behavior

| Check | Result | Detail |
|---|---|---|
| Keyboard tab order (home, desktop) | PASS | first stop is "Skip to main content", every stop shows a 3px solid focus ring |
| Text contrast, computed, WCAG AA | PASS | 0 elements below 4.5:1 (3:1 for large text) |
| prefers-reduced-motion: reduce | PASS | 0 running animations |
| `/owner` behavior | PASS | branded 404, no sign-in wall |

## Screenshot index

69 full-page screenshots captured against the live site, 64 of them one per route per
required width, named `<route>-<width>.jpg`:

- Routes: home, about, services, portfolio, consultation, upload, contact, qr
- Widths: 320, 375, 390, 414, 768, 1024, 1280, 1440

Plus five state captures: `menu-open-390.jpg`, `consultation-summary-390.jpg`,
`upload-previews-390.jpg`, `home-390-reduced-motion.jpg`, `404-owner-1280.jpg`.

Archive (screenshots + machine-readable `report.json`):
https://d2ol7oe51mr4n9.cloudfront.net/user_31yrqQpNO1uRz1TyAwuUsNb1BnI/f6f6ad64-e897-4415-8add-905ef198fcf9.zip

Raw report only:
https://d2ol7oe51mr4n9.cloudfront.net/user_31yrqQpNO1uRz1TyAwuUsNb1BnI/f5377013-3b44-4ab8-858d-a9eda36416bd.json

## Brand assets verified on the live page

| Item | Live value |
|---|---|
| Hero badge source served | `/brand/logo-badge-560.webp` |
| Hero badge loaded | true, 480x469 rendered |
| Hero badge alt text | "Confident Concrete. Chester, Pennsylvania. Strong foundations, brighter tomorrow." |
| Header CC monogram | present, 42x35 |
| Footer badge | present, links home |
| Favicon | `/favicon.svg`, charcoal tile with the CC monogram |
| Brand orange token | `#f26b1d` |
| Primary button | background `rgb(194, 69, 15)`, label `rgb(255, 255, 255)`, 4.9:1 |

Archive for this run:
https://d2ol7oe51mr4n9.cloudfront.net/user_31yrqQpNO1uRz1TyAwuUsNb1BnI/185ff479-6efc-40fb-ba7d-ac44d7300c79.zip

## How to re-run

```
node qa/run-qa.mjs https://confident-concrete.higgsfield.app ./qa-output
```

Requires Playwright with Chromium. The script exits after writing `report.json` and prints a
summary plus the detail of any failure.
