# Executive Dashboard Specification for JP
**Project:** WORLD_CMP (Chester Media Project)
**Role:** Founder / Executive
**Data Source:** WORLD_CMP Google Sheets Spine (Read-Only)

## 1. Overview
This dashboard provides a high-level command view for the Founder (JP), focusing on decision-making, strategic timeline alignment, and overall project health across film, book, and community operations.

## 2. Core Views

### A. Command Center (Home)
**Purpose:** Immediate visibility into critical blockers, upcoming major milestones, and recent governance rulings.

| Component | Metric / Data Point | Source Binding |
| :--- | :--- | :--- |
| **Active Tasks** | Count of Tasks where `Status` != "Complete" AND `Priority` = "High" | `Tasks_Next` (Columns: `Status`, `Priority`) |
| **Pending Decisions** | List of Decisions where `Status` = "Pending" | `Decisions_Canon` (Columns: `Decision_Title`, `Status`) |
| **Next 3 Events** | Earliest 3 records where `Date` >= TODAY | `Timeline_Canon` (Columns: `Date`, `Event`) |
| **Recent Intake** | Count of Intake items from last 7 days | `Intake_Log` (Columns: `Date_Received`) |

### B. Creative Pipeline Status
**Purpose:** Track progress of key creative deliverables (Series, Script, Book).

| Metric | Source Binding |
| :--- | :--- |
| **Script Progress** | Count of Scenes by `Status` (Draft vs Final) | `Script_Film_Scenes` (Columns: `Status`) |
| **Book Progress** | Sum of `Word_Count` | `Book_Chapters` (Columns: `Word_Count`) |
| **Series Readiness** | List of Episodes with `Air_Date` approaching | `Series_Episodes` (Columns: `Air_Date`, `Status`) |

### C. Governance Ledger
**Purpose:** distinct view of rigorous canon decisions and rules.

*   **View:** Table of `Decisions_Canon`
*   **Filters:** `Ruling` != Empty
*   **Columns:** `Decision_Title`, `Category`, `Ruling`, `Decider`

## 3. Narrative Summaries (AI Generated)
*   **Weekly Executive Brief:** "On [Date], the project has [X] active high-priority tasks. Key friction points involve [Category from Decisions]. Creative output increased by [Word_Count delta] words."
*   **Blocker Report:** Summarize `Tasks_Next` where `Status` = "Blocked" or `Priority` = "Critical".

## 4. Updates & Cadence
*   **Refresh Rate:** Real-time (Read-only from Sheets).
*   **Flagging:** Any `Intake_Log` item tagged "Urgent" triggers an immediate alert.
