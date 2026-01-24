# Public Website Structure: WORLD_CMP (Dual-Portal)

**Visual Strategy:**
*   **The Foundation:** "Structural High-Tech." Dark grey, architectural lines, serious, funding & governance focused.
*   **The Station (CMP Radio):** "The Pulse." Dynamic, video-heavy, 'Live' indicator, Youtube API integration, darker background with vibrant overlays.

## 1. Global Navigation (The Switch)
*   **Top Bar:** Always present. Allows instant toggling between "Foundation" and "Radio".
    *   *Left:* **WORLD_CMP** (Foundation)
    *   *Right:* **CMP RADIO** (Station) - *Includes "Live Now" indicator if active.*

---

## 2. Portal A: The Foundation (`/foundation`)
**Focus:** Governance, Mission, Support, Operations.

### A. Home (`/`)
*   **Hero:** "Architecture of Community." High-contrast B&W photo of Chester architecture.
*   **Mission Statement:** Define specific acronym usage:
    *   *C*onstantly *M*aking *P*rogress
    *   *C*ultivating *M*ature *P*ositivity
*   **The Spines (Impact):** Data viz of `Timeline_Canon` and `Book_Chapters` progress.

### B. The Canon (`/canon`)
*   **Governance:** Public version of `Decisions_Canon`.
*   **History:** Vertical timeline of the Chester Media Project.

### C. Get Involved (`/connect`)
*   **Intake:** "Submit to the Archive" (Link to Intake Form).
*   **Volunteer:** "Join the Ops Team."

---

## 3. Portal B: CMP Radio (`/radio`)
**Focus:** Content, Entertainment, Voice, Youth.
**Source:** Heavily reliant on YouTube Data API (`@cmpradio6904`).

### A. Station Home (`/radio`)
*   **Hero:** "The Voice of Chester." Embedded latest video or Livestream.
*   **Featured Shows:** Grid of playlists:
    *   *The Voice No Chill Show*
    *   *Keeping It 100*
    *   *Parenting With A Purpose*
*   **Ticker:** "Bringing you the best that ever did it..."

### B. Schedule (`/radio/schedule`)
*   **Upcoming:** Calendar view from `Timeline_Canon` (filtered by Event Type = 'Broadcast').

### C. Join The Network (`/radio/join`)
*   **Hero:** "Broadcast With Us."
*   **Value Prop:** "Access our studios, equipment, and distribution."
*   **Onboarding Flow:**
    *   **Step 1:** "Submit Your Concept" (Form -> `Intake_Log`).
    *   **Step 2:** "Schedule Orientation" (Link to Calendly/Studio Booking).
    *   **Requirements:** "Must be Chester-based or focused."

### D. About The Station
*   **Acronym:**
    *   *C*hester *M*ade *P*roducts
    *   *C*hanging *M*edia's *P*erspective

---

## 4. Technical Bindings

| Zone | Component | Data Source |
| :--- | :--- | :--- |
| **Foundation** | History Feed | `Timeline_Canon` |
| **Foundation** | Team/Board | `Characters` (Role = 'Exec/Board') |
| **Station** | Live Stream | YouTube Data API (Channel: `@cmpradio6904`) |
| **Station** | Show List | `Series_Episodes` OR YouTube Playlists |
| **Station** | Hosts | `Characters` (Role = 'Talent') |

## 5. Copy & Tone Distinction
*   **Foundation:** "We build the infrastructure for narrative power." (Strategic, authoritative).
*   **Station:** "We are the voice." (Immediate, engaged, energetic).
