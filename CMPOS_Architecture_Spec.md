# CMPOS Web App Specification: Front-Facing Dashboard + Action Layer

**System:** masOS / CMPOS (Chester Media Project Operating System)
**Theme:** Kingdom Gold (Black/Gold/White) - *Strict adherence to uploaded reference images.*
**Data Source:** Google Sheets Spine (Strict Mapping)

---

## 1. INFORMATION ARCHITECTURE & NAVIGATION

### A. Global Top Bar (Persistent)
*   **Location:** Top of Screen (Fixed).
*   **Elements:**
    1.  **Logo:** **CMPOS`** (Kingdom Gold, Left Align).
    2.  **Active Domain Switcher:** (Center Align) - *Tabs style*
        *   `EXECUTIVE OVERVIEW`
        *   `RADIO OPERATIONS`
        *   `INTERNAL OPS`
        *   `PARTNER PORTAL` (Shown if Role = PARTNER/ADMIN)
    3.  **System Status:**
        *   Text: `SECURE_CONN_ESTABLISHED` (Monospace, Dimmed).
        *   Indicator: Green Pulse Dot.
    4.  **User Module:** (Right Align)
        *   Role Badge (e.g. `[ADMIN]`)
        *   Context Menu: "Logout", "Settings".

*   **Rationale:** Overrides the "Left Sidebar" seen in reference images per user text requirement, maximizing horizontal canvas for data ledgers.

### B. Role-Based Access Control (RBAC)
| Role | View Access | Write/Action Access |
| :--- | :--- | :--- |
| **ADMIN** | All Dashboards | All Actions (Promote, Edit, Delete, Approve) |
| **STAFF** | All Dashboards | Ops Management, Content Updates, Approvals |
| **VOLUNTEER**| Radio Ops, Internal Ops | Log Episodes, Update Tasks, Inventory (No Promotion) |
| **PARTNER** | Partner Portal Only | Submit Briefs, View Own Status (Read-Only) |

---

## 2. SCREEN-BY-SCREEN SPECIFICATION

### A. EXECUTIVE OVERVIEW
**Target:** ADMIN, STAFF
**Goal:** Command-Level Visibility & Governance.

*   **Widget 1: Strategic Timeline (Visual)**
    *   *Source:* `Timeline_Canon`
    *   *Display:* Vertical Timeline (ref: `uploaded_image_4`).
    *   *Fields:* Date, Event Title, Description.
*   **Widget 2: Project Progress (Metrics)**
    *   *Source:* `Book_Chapters`
    *   *Display:* Progress Bars (Gold Fill).
    *   *Metric:* Word Count vs Target (e.g., 7,250 / 15,000).
*   **Widget 3: Governance Ledger**
    *   *Source:* `Decisions_Canon`
    *   *Display:* Table with "Analyze" Button on rows.
    *   *Columns:* ID, Title, Category, Ruling, Status (Colored Text).

**Actions:**
*   **Analyze Ruling:** (Client-Side) Generates summary of the selected ruling decision.
    *   *Write:* NONE.

---

### B. RADIO OPERATIONS
**Target:** ADMIN, STAFF, VOLUNTEER
**Goal:** Production Pipeline & Broadcast Management.

*   **Widget 1: Studio Schedule (Google Calendar)**
    *   *Source:* `Timeline_Canon` (Synced with Google Calendar API).
    *   *Display:* Calendar View (Day/Week).
    *   *Event Types:* `Recording Session` (Gold), `Broadcast` (Green), `Maintenance` (Grey).
*   **Widget 2: Episode Manifest (Production View)**
    *   *Source:* `Series_Episodes`
    *   *Display:* Card Grid.
    *   *Action:* "View Run of Show" (Opens submitted ROS).
*   **Widget 3: Talent Roster**
    *   *Source:* `Characters`.

**Actions:**
*   **Schedule Session:**
    *   *Role:* ADMIN, STAFF.
    *   *Write Target:* Google Calendar API -> `Timeline_Canon` (New Row).
*   **Archive to Drive (Post-Production):**
    *   *Role:* VOLUNTEER, STAFF.
    *   *Action:* Uploads Master File to Google Drive.
    *   *Write Target:* `Series_Episodes` -> `Notes` (Appends: "ARCHIVE_LINK: [Drive_URL]").

---

### C. INTERNAL OPS
**Target:** ADMIN, STAFF, VOLUNTEER
**Goal:** Logistics & Task Execution.

*   **Widget 1: Task Queue**
    *   *Source:* `Tasks_Next`
    *   *Display:* Kanban Columns (High, Medium, Low) (ref: `uploaded_image_0`).
    *   *Card Content:* Title, Owner, Due Date, Status Badge.
*   **Widget 2: Asset Inventory**
    *   *Source:* `Assets_Register`
    *   *Display:* Card Grid (Hardware/Docs) (ref: `uploaded_image_1`).
*   **Widget 3: Research Index**
    *   *Source:* `Research_Log`
    *   *Display:* Data Table (Topic, Relevance, Status) (ref: `uploaded_image_2`).

**Actions:**
*   **Generate Brief:** (Button on Task Card)
    *   *Role:* ADMIN, STAFF.
    *   *Trigger:* Uses Task Description to generate a "Brief" artifact (Client-side or Note append).
*   **Log Task:**
    *   *Role:* ALL.
    *   *Write Target:* `Tasks_Next` (New Row).

---

### D. PARTNER PORTAL (ISOLATED)
**Target:** PARTNER_SHOW_HOST
**Goal:** Submission & Status Tracking (No Canon Access).

*   **Widget 1: My Show Hub**
    *   *Source:* `Characters` (User Match).
*   **Widget 2: Upcoming Recording Sessions**
    *   *Source:* Google Calendar (Filtered by Show Name).
    *   *Action:* "Submit Run of Show" (Active 24h before session).
*   **Widget 3: Submission History**
    *   *Source:* `Intake_Log`.

**Actions:**
*   **Submit Run of Show:**
    *   *Role:* PARTNER.
    *   *Write Target:* `Intake_Log` (Tag: "ROS_Submission").
    *   *Payload:* Time, Guest_List, Segment_Breakdown, Tech_Reqs.
    *   *Effect:* Notifies Volunteer/Producer for specific session.
*   **Submit Episode Brief:**
    *   *Role:* PARTNER.
    *   *Write Target:* `Intake_Log`.
    *   *Payload:* Date, Raw_Input (Brief Text), Submitter, Tag ("Ep_Brief"), Status ("UNREVIEWED").
*   **Upload Script Meta:**
    *   *Role:* PARTNER.
    *   *Write Target:* `Intake_Log` (Update Row -> Notes).

---

## 3. CANON / INTAKE GOVERNOR
**Rule:** PARTNERS/VOLUNTEERS CANNOT WRITE TO CANON DIRECTLY.
1.  **Ingest:** Partner submits to `Intake_Log`.
2.  **Review:** Admin views "Intake Queue" widget (Internal Ops).
3.  **Promotion:** Admin clicks "Promote".
    *   System writes to `Series_Episodes`.
    *   System updates `Intake_Log` status to `PROMOTED`.

---

## 4. GEMINI / AI STUDIO PASTE SPEC

```json
{
  "app_name": "CMPOS_Control_Deck",
  "version": "2.4.0",
  "theme": {
    "mode": "dark",
    "primary": "#FFD400",
    "secondary": "#FFFFFF",
    "background": "#020204",
    "surface": "#0A0B10",
    "font": "Inter, JetBrains Mono"
  },
  "modules": [
    {
      "id": "global_nav",
      "layout": "top_bar",
      "elements": ["logo_cmpos", "domain_tabs", "secure_indicator", "user_profile"]
    },
    {
      "id": "executive_overview",
      "access_roles": ["ADMIN", "STAFF"],
      "widgets": [
        { "name": "strategic_timeline", "type": "vertical_timeline", "source": "Timeline_Canon" },
        { "name": "project_progress", "type": "progress_bar_group", "source": "Book_Chapters" },
        { "name": "governance_ledger", "type": "data_table", "source": "Decisions_Canon" }
      ]
    },
    {
      "id": "radio_operations",
      "access_roles": ["ADMIN", "STAFF", "VOLUNTEER"],
      "widgets": [
        { "name": "episode_manifest", "type": "card_grid", "source": "Series_Episodes", "visual_style": "broadcast_status" },
        { "name": "broadcast_schedule", "type": "list_view", "source": "Timeline_Canon" }
      ],
      "actions": [
        { "label": "Create Episode", "write_target": "Series_Episodes", "required_roles": ["ADMIN", "STAFF"] },
        { "label": "Update Status", "write_target": "Series_Episodes.Status", "required_roles": ["VOLUNTEER", "STAFF"] }
      ]
    },
    {
      "id": "internal_ops",
      "access_roles": ["ADMIN", "STAFF", "VOLUNTEER"],
      "widgets": [
        { "name": "task_queue", "type": "kanban_board", "source": "Tasks_Next", "group_by": "Priority" },
        { "name": "asset_inventory", "type": "card_grid", "source": "Assets_Register" }
      ],
      "actions": [
        { "label": "Generate Brief", "trigger": "client_summary", "required_roles": ["ADMIN"] }
      ]
    },
    {
      "id": "partner_portal",
      "access_roles": ["PARTNER"],
      "widgets": [
        { "name": "my_submissions", "type": "status_list", "source": "Intake_Log", "filter": "user_match" }
      ],
      "actions": [
        { "label": "Submit Brief", "write_target": "Intake_Log", "default_status": "UNREVIEWED", "required_roles": ["PARTNER"] }
      ]
    }
  ]
}
```
