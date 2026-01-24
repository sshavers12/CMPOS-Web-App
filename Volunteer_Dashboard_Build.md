# Volunteer Dashboard Build Specification
**Agent:** 04
**Role:** Volunteer (Execution-Only)
**Design Philosophy:** Minimal, Mobile-First, Execution-Focused. No admin clutter.
**Theme:** Black background, Orange accents (#FF6D00), White text. Glassmorphism panels. NO BLUE.

## A. Desktop Layout (The "Command Center")
*Layout uses a 3-column grid, but focuses on single-task focus.*

### 1. Header (Global)
*   **Left:** "Volunteer Console" (White, Bold)
*   **Right:** user profile pic (circle), "Help / I'm Stuck" (Ghost button, Orange border)

### 2. Main Grid
*   **Column 1: My Assignments (Current Focus)** - *Glass Panel*
    *   **Header:** "My Tasks" (H2)
    *   **Filter:** [Today] [This Week] (Toggle)
    *   **List Item Card:**
        *   Task Title (Bold White)
        *   Due Time (Orange)
        *   Action Button: "Start" (Solid Orange, Black Text) -> Opens Template Runner
    
*   **Column 2: Production Calendar** - *Glass Panel*
    *   **Header:** "My Schedule"
    *   **Content:** Vertical list of events *only* where user is assigned.
    *   **Style:** Minimal list, not a traditional calendar grid.
    *   **Item:** Date (Left), Event Name (Right), Role (Subtitle).

*   **Column 3: Submission Zone** - *Glass Panel*
    *   **Header:** "Uploads & Returns"
    *   **State: Empty** -> "Select a task to see upload requirements."
    *   **State: Active Task** -> Drag & Drop Zone (Dashed Orange Border).
    *   **History List:** recent uploads with status pills.

## B. Mobile Layout (The "Field Unit")
*Single column scroll. Big touch targets.*

### 1. Top Bar
*   Sticky Header.
*   "My Tasks" (Active Tab), "Schedule" (Inactive Tab).
*   Floating Action Button (Bottom Right) -> "I'm Stuck" (SOS).

### 2. Main View (My Tasks)
*   **Hero Card:** The *immediate next* task.
    *   Large Title.
    *   Countdown/Due Time.
    *   "OPEN TASK" (Full Width Orange Button).
*   **Secondary List:** "Up Next" (smaller cards below).

### 3. Template Runner Overlay
*   When "OPEN TASK" is tapped, screen fills.
*   **Top:** Task Instructions (Bullet points).
*   **Middle:** The specific Template (Link or Embedded Form).
*   **Bottom:** "Upload/Complete" action bar (Sticky).

## C. Task Brief Standard
*Every assignment seen by a volunteer follows this strict schema.*

| Field | Description | Display Style |
| :--- | :--- | :--- |
| **Mission (Purpose)** | 1 sentence "Why". | Italic, Grey text at top. |
| **Deliverable** | What exactly needs to be done. | Bold, White. |
| **Due By** | Absolute deadline. | Orange text. |
| **Template Link** | The *one* tool they need. | Button: "Launch [Tool Name]" |
| **Input Req** | What they must upload/type to finish. | Checklist items. |
| **POC** | Who to ping if stuck. | Hidden (auto-pings via "Help" button). |

## D. Submission Status Lifecycle
*Clear states for the volunteer.*

1.  **PENDING** (Grey)
    *   *Meaning:* Task is assigned, work not started.
2.  **IN PROGRESS** (Orange Pulse)
    *   *Meaning:* Volunteer has opened the brief/template.
3.  **SUBMITTED** (White/Solid)
    *   *Meaning:* Files uploaded or form sent. Waiting on Ops.
    *   *User Action:* None. Read-only.
4.  **NEEDS REVISION** (Red text/Orange Border)
    *   *Meaning:* Admin pushed it back with a comment.
    *   *User Action:* "View Feedback" button appears.
5.  **APPROVED** (Green Check - *The only green allowed, use sparingly*)
    *   *Meaning:* Task complete. Moves to archive.

## E. Failure Prevention Rules
*How the UI prevents volunteers from messing up.*

1.  **No "Raw" Links:** Volunteers never see a raw spreadsheet URL. They only see "Launch Template" buttons that open specific filtered views or forms.
2.  **Single Path Upload:** The upload zone is Context-Aware. It only accepts the file type required by the active task.
3.  **No Deletion:** Volunteers cannot delete tasks or files. They can only "Archive" (hide from their view), but data remains.
4.  **SOS Context:** Clicking "I'm Stuck" automatically grabs the Task ID, User ID, and timestamp, generating a pre-filled message to the Ops channel. User just types "I don't have the key" (etc).
5.  **Read-Only Calendar:** They can't drag/drop events. They can only click "Confirm Attendance".
