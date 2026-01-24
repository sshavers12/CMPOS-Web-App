# CMP OS Authentication & Role-Based Access Control (RBAC) Model

**Version:** 1.0  
**Authority:** Agent 01 (Google Anti-Gravity)  
**Context:** CMP OS Dashboard System for Staff, Volunteers, and Leadership.

---

## 1. Role Matrix

This matrix defines the **maximum** allowed visibility and action capabilities for each role.

| Feature / Area | SUPER_ADMIN (JP) | ADMIN (Ops Lead) | OPS_STAFF | VOLUNTEER | HOST_TALENT | PARTNER |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **DASHBOARD ACCESS** | | | | | | |
| Executive Overview | **FULL ACCESS** | **VIEW ONLY** | NO ACCESS | NO ACCESS | NO ACCESS | NO ACCESS |
| Radio Operations | **FULL ACCESS** | **FULL ACCESS** | **FULL ACCESS** | VIEW ( Assigned) | VIEW (Own Show) | NO ACCESS |
| Internal Ops | **FULL ACCESS** | **FULL ACCESS** | **FULL ACCESS** | VIEW (Assigned) | NO ACCESS | NO ACCESS |
| Partner Portal | **FULL ACCESS** | **FULL ACCESS** | VIEW ONLY | NO ACCESS | NO ACCESS | **OWN PORTAL** |
| Talent Hub (New) | **FULL ACCESS** | **FULL ACCESS** | VIEW (Managed) | NO ACCESS | **OWN HUB** | NO ACCESS |
| **DATA & ACTIONS** | | | | | | |
| **Governance** | Edit / Delete | View Only | No Access | No Access | No Access | No Access |
| **Finance / Donors**| Full Control | View (Limited) | No Access | No Access | No Access | No Access |
| **User Mgmt** | Create/Delete | Assign Roles | No Access | No Access | No Access | No Access |
| **Content Canon** | Full Write | Full Write | Edit / Append | No Write | Read Only | No Access |
| **Task Queue** | Manage All | Manage All | Manage All | Complete Own | No Access | No Access |
| **Production Cal** | Full Edit | Full Edit | Edit | View Only | View Own | View Own |
| **Submissions** | Approve/Reject | Approve/Reject | Process | Checklist | Submit | Submit |

---

## 2. Routing Map

Defines the default "Home" and visible navigation tabs upon successful login.

| Role | Default Landing Page | Visible Navigation Tabs |
| :--- | :--- | :--- |
| **SUPER_ADMIN** | `/executive` | EXECUTIVE, RADIO OPS, INTERNAL OPS, PARTNER NET, TALENT HUB, ADMIN SETTINGS |
| **ADMIN** | `/executive` | EXECUTIVE, RADIO OPS, INTERNAL OPS, PARTNER NET, TALENT HUB |
| **OPS_STAFF** | `/radio-ops` | RADIO OPS, INTERNAL OPS, TASK QUEUE |
| **VOLUNTEER** | `/my-tasks`* | MY TASKS, PRODUCTION CALENDAR, UPLOAD PORTAL |
| **HOST_TALENT** | `/talent-hub` | MY SHOW, EPISODE BRIEFS, GUEST BOOKING, PROMOTION |
| **PARTNER** | `/partner-portal` | MY SUBMISSIONS, STATUS HISTORY |

*\*Note: Volunteer "My Tasks" view is a filtered view of the Internal Ops dashboard.*

---

## 3. Permission Policy

**Philosophy:** "Strict Denial by Default." Users are granted access *only* to what they explicitly require to function.

1.  **The JP Rule (Super Admin Validity):** Only the user identified as `SUPER_ADMIN` (JP) has ownership-level destruction rights (e.g., deleting dashboards, changing governance logs, accessing full donor financial data). This role cannot be reassigned by anyone other than the system owner.
2.  **The Ops Shield:** `ADMIN` and `OPS_STAFF` are the engine room. They can see operational data (tasks, calendars) but are shielded from high-level governance disputes or financial sensitivities unless explicitly cleared.
3.  **Volunteer Blinders:** Volunteers are task-execution units. They see *what* they need to do, *when* it is due, and *where* to put the result. They do not see the broader strategic timeline, the full asset inventory, or other volunteers' performance logs.
4.  **Talent Isolation:** On-air talent (`HOST_TALENT`) and external partners (`PARTNER`) are totally isolated. They exist in "silos" where they can only see data tagged with their specific `Show_ID` or `User_ID`. They never see the internal "kitchen" (Ops Boards, Triage Queues).
5.  **No Discovery:** URL manipulation (e.g., changing `/partner/123` to `/partner/124`) will result in an immediate block and security flag. Routes are protected at the middleware level, not just the UI level.

---

## 4. Security Edge Cases & Blocks

| Scenario | System Response (Block) |
| :--- | :--- |
| **Volunteer attempts to access Admin Settings URL manually.** | **403 FORBIDDEN.** User is redirected to their Default Landing Page (`/my-tasks`). Incident logged: "Unauthorized Access Attempt". |
| **Partner A changes URL ID to view Partner B's submission.** | **DATA BLOCK.** The system validates `User_ID` against the requested resource ownership. If mismatch -> 404 NOT FOUND (prevents ID enumeration). |
| **Ops Staff tries to delete a "Governance" record.** | **ACTION DENIED.** UI element for "Delete" is not rendered. If API is called directly, backend returns `PERMISSION_DENIED: ROLE_SCOPE_VIOLATION`. |
| **Host Talent tries to view internal "Task Queue".** | **ROUTING ERROR.** The `/internal-ops` route does not exist in their routing table. Redirects to `/talent-hub`. |
| **Login with valid credentials but no Role assigned.** | **Orphan State.** User sees a "Contact Administrator" splash screen. No dashboard data is loaded. |

---

## 5. Implementation Notes for MCP

*These notes guide the coding agent or developers on how to implement this model.*

**A. Authentication Provider & Custom Claims**
*   Use a managed auth provider (e.g., Firebase Auth, Supabase, Auth0).
*   **Critical:** Embed the `ROLE` string (e.g., `role: 'OPS_STAFF'`) directly into the user's ID Token (Custom Claims). This allows the frontend to render the correct UI *instantly* without waiting for a database round-trip.

**B. Middleware Protection (The Gatekeeper)**
*   Implement a global navigation guard (Middleware) that runs *before* any page load.
*   Logic: `if (route.meta.requiredRole > user.role) return Redirect(user.defaultLanding);`
*   Do not rely solely on hiding buttons. API endpoints must verify `request.auth.token.role` for every write operation.

**C. Data Logic & Row-Level Security**
*   For **PARTNER** and **HOST_TALENT** views, standard fetching must be wrapped in a "Silo Filter".
*   *Query Rule:* `WHERE owner_id == current_user.id`.
*   Never fetch the full list of submissions to the client and filter there. Filter at the database/API level to ensure zero data leakage.

**D. Session Persistence**
*   Ensure login state persists on refresh, but validate the token validity periodically (e.g., every 15 minutes) to strip access if a role is revoked mid-session by an Admin.
