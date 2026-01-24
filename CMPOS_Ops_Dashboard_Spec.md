# CMPOS OPS DASHBOARD SPECIFICATION (AGENT 03)

**Target Module:** `INTERNAL OPS`
**Theme:** Kingdom Gold (Black / Orange-Gold / White). *No Blue.*
**Goal:** Structure volunteer goodwill into consistent contribution.

---

## 1. SCREEN BLUEPRINT: INTERNAL OPS

**Layout:** Standard "Studio Container" (Sidebar Left + Main Stage).

### A. Sidebar Tools (Internal Ops Context)
1.  `[TASK BOARD]` (Default Active) - *The Kanban Queue*
2.  `[PROD CALENDAR]` - *Operational Deadlines*
3.  `[TEMPLATES]` - *Standard Operating Procedures*
4.  `[RESEARCH]` - *Topic Index*
5.  `[INVENTORY]` - *Asset Register*

### B. Main Stage View: TASK BOARD (Kanban)
**Visual Style:**
-   **Background:** Deep Black (`#020204`).
-   **Columns:** 3 Glass Panels (Dark Grey/Blue `#0A0B10` with 50% opacity).
-   **Headers:** Uppercase, Bold, Spaced.

**Columns:**
1.  **HIGH PRIORITY**
    -   *Header Style:* Gold Text (`#FFD400`), Gold Bottom Border.
    -   *Card Style:* Black Card, White Text, Left-Border Gold (4px).
2.  **MEDIUM PRIORITY**
    -   *Header Style:* White Text, White Bottom Border.
    -   *Card Style:* Black Card, White Text, Left-Border White (1px).
3.  **LOW PRIORITY**
    -   *Header Style:* Muted Grey Text (`#475569`), Grey Bottom Border.
    -   *Card Style:* Black Card, Grey Text, Left-Border Grey (1px).

**Task Card Anatomy:**
-   **Top Row:** `[Status Badge]` (Text Only, e.g., "IN PROGRESS") | `[Due Date]` (Monospace, Right Align).
-   **Middle:** **Task Title** (Bold, White).
-   **Bottom:**
    -   *Left:* Owner Avatar/Initials (Gold Circle if Admin, White if Vol).
    -   *Right:* "Generate Brief" Action Icon (Gold Document).

**Action Modal: "TASK DETAIL"**
-   **Header:** Task Title + "GENERATE BRIEF" Button (Solid Gold, Black Text).
-   **Body:**
    -   *Description:* Plain text context.
    -   *Linked Template:* Dropdown (Locked if set).
    -   *Checklist:* Interactive checkboxes (Gold checkmarks).
    -   *Comments:* "Ops Comms" log (Reverse chronological).

### C. Main Stage View: PRODUCTION CALENDAR
**Visual Style:**
-   **Grid:** Monthly/Weekly toggle. Dark borders.
-   **Event Pills:** High contrast.
    -   *Deadline:* Solid Gold Pill, Black Text.
    -   *Assignment:* Outlined Pill (Gold Border), White Text.
-   **Sidebar (Right - Collapsible):** "Upcoming Assignments" list.

---

## 2. TASK OBJECT SCHEMA (Plain English)

**Source:** `Tasks_Next` (Google Sheet)

| Field Name | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| **ID** | String | Unique Task ID | `TSK-1024` |
| **Title** | String | Action-oriented headline | "Research MLK Context" |
| **Priority** | Select | sorting weight | `HIGH`, `MED`, `LOW` |
| **Status** | Select | Workflow state | `TODO`, `DOING`, `BLOCKED`, `DONE` |
| **Due_Date** | Date | Hard deadline | `2026-02-14` |
| **Owner** | UserRef | Who is responsible | `vol_sarah` |
| **Linked_Ep** | Ref | Related Episode ID (Optional) | `S01E04` |
| **Linked_Tmpl** | Ref | Standard Procedure to attach | `TMPL-BREIF` |
| **Checklist** | JSON | Array of sub-steps | `["Find 3 sources", "Draft summary"]` |
| **Reviewer** | UserRef | Who approves completion | `staff_jp` |
| **Brief_URL** | Link | Auto-generated brief artifact | `drive.google.com/...` |

---

## 3. TEMPLATE PACK LIBRARY

**Location:** `Templates_Registry` (Locked Standards)

### 1. Episode Brief Template (`TMPL-BRIEF`)
*   **Purpose:** Standardizes the specific "ask" for a show episode.
*   **Fields:** Topic, Guest Bio, Key Questions, Tone Guide, Music Cues.
*   **Output:** PDF/Doc for Host.

### 2. Run-of-Show Template (`TMPL-ROS`)
*   **Purpose:** Minute-by-minute breakdown for recording blocks.
*   **structure:**
    -   00:00 - Intro (Hook)
    -   05:00 - Guest Seg 1
    -   15:00 - Break
    -   20:00 - Guest Seg 2
    -   28:00 - Outro

### 3. YouTube Upload Checklist (`TMPL-YT-UP`)
*   **Purpose:** Ensures SEO and quality consistency.
*   **Items:** [ ] Thumbnail 1080p, [ ] Title <60 chars, [ ] Description with Timecodes, [ ] Tags, [ ] End Screen, [ ] Playlist Add.

### 4. Clip Package Checklist (`TMPL-CLIPS`)
*   **Purpose:** Social media micro-content specs.
*   **Items:** [ ] 30s Vertical (TikTok), [ ] 60s Square (IG), [ ] 90s Horizontal (LinkedIn), [ ] Captions Burned-in, [ ] Logo Watermark (Top Right).

### 5. Consent & Release (`TMPL-SAFE`)
*   **Purpose:** Youth safety and legal compliance.
*   **Items:** [ ] Guardian Sig (if <18), [ ] Talent Sig, [ ] Photo Release, [ ] Safety Briefing Completed.

---

## 4. EXECUTION CADENCE (RHYTHMS)

### A. Daily Standup (Async)
*   **Time:** By 10:00 AM.
*   **Channel:** Slack / Ops Dashboard.
*   **Action:**
    -   Volunteers: Mark tasks `DOING` or `BLOCKED`.
    -   Staff: Review `BLOCKED` columns, clear hurdles.
    -   *No Zoom required.*

### B. Weekly Production Sync (Live)
*   **Time:** Mondays @ 4:00 PM.
*   **Focus:** "Load the Board"
    1.  Review usage of `Production Calendar` for next 2 weeks.
    2.  Assign Owners to upcoming Episode Tasks.
    3.  "Promote" tasks from Backlog to `HIGH PRIORITY`.
    4.  Bulk "Generate Briefs" for assigned volunteers.

### C. The "Handoff" Protocol
*   **Rule:** Never move to `DONE` without an artifact.
*   **Process:**
    1.  Volunteer finishes task.
    2.  Uploads link/file to Task Card.
    3.  Moves card to `REVIEW` (or notifies Owner).
    4.  Staff checks artifact -> Moves to `DONE`.

---

## 5. PERMISSIONS MAP & COMM PROTOCOLS

### "No Shame" Accountability Rules
1.  **Visibility is not Surveillance:** We track tasks to help, not to blame.
2.  **Red Flags are Good:** Marking "BLOCKED" is a contribution. It saves time.
3.  **Role Clarity:** You are only responsible for what is assigned to you in the system.

### Role Capabilities

| Feature | ADMIN (JP/Exec) | STAFF (Prod) | VOLUNTEER | PARTNER |
| :--- | :--- | :--- | :--- | :--- |
| **View Dashboard** | ALL | ALL | Internal Ops Only | Partner Portal Only |
| **Create Task** | YES | YES | YES (Draft Only) | NO |
| **Assign Owner** | YES | YES | Self-Assign Only | NO |
| **Delete Task** | YES | NO | NO | NO |
| **Generate Brief**| YES | YES | NO | NO |
| **Edit Template** | YES | NO | NO | NO |
| **Approve/Done** | YES | YES | NO (Request Review) | N/A |

### Communication Flows
*   **Assignment:** Notification via push/email -> "You have a new Brief".
*   **Update:** Comment on Task Card (Centralized context).
*   **Completion:** "Submit for Review" button -> Notifies Staff.
