# Operations Dashboard Specification
**Project:** WORLD_CMP (Chester Media Project)
**Role:** Operations Leads (Ops)
**Data Source:** WORLD_CMP Google Sheets Spine (Read-Only)

## 1. Overview
The Operations Dashboard focuses on the ground-game logistics, workforce management (volunteers), and efficient handling of incoming data/requests (intake). It serves to keep the engine running smoothly.

## 2. Core Views

### A. Workforce & Volunteer Tracking
**Purpose:** Monitor volunteer availability and assignment.

| Component | binding |
| :--- | :--- |
| **Volunteer Roster** | List of `Characters` where `Role` = "Volunteer" |
| **Assignments** | `Tasks_Next` grouped by `Assignee` |
| **Status Check** | `Characters` where `Status` = "Active" |

### B. Events Cadence (Logistics)
**Purpose:** Prepare for upcoming events.

| Component | Binding |
| :--- | :--- |
| **Upcoming Events** | `Timeline_Canon` (Next 30 Days) |
| **Locations Map** | List of `Locations` with `Access_Level` details |
| **Asset Allocation** | `Assets_Register` filtered by `Location` or `Status` |

### C. Content Pipeline (Flow)
**Purpose:** Ensure content moves from Intake to Production.

| Metric | Source Binding |
| :--- | :--- |
| **New Intake Items** | `Intake_Log` (Recent) - *Read Only* |
| **Raw Assets** | `Assets_Register` (Newly added) |
| **Research Queue** | `Research_Log` where `Status` = "To Verification" |

### D. Intake Visibility
**Purpose:** Monitor the `Intake_Log` for new submissions.
*   **View:** Table of `Intake_Log`
*   **Columns:** `ID`, `Date_Received`, `Raw_Input`, `Submitter`, `Tag`, `Status`
*   **Action items:** Ops team checks this log to create new `Tasks_Next` or `Research_Log` entries (manual process, dashboard is read-only).

## 3. Operational Narratives
*   **Daily Standup:** "Today we have [Count] volunteers active. [Count] new intake items require triage. Next event is [Event Name] in [Days] days."
*   **Resource Alert:** "Location [Location_Name] has [Count] assets."

## 4. Updates & Cadence
*   **Refresh Rate:** Real-time.
*   **Source:** All data flows strictly from the official Google Sheets Spine.
