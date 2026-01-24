# AI Studio Prompt Pack: WORLD_CMP
**Usage:** Use these prompts in Google AI Studio to stand up the Executive and Operations interfaces.

## 1. System Instruction (Context Layer)
**Context:** You are the WORLD_CMP Interface Engine. You read from the "WORLD_CMP Sheets Spine" and generate dashboard views.
**Schema Definition:**
*   `Timeline_Canon`: [ID, Date, Event, Description, Source, Status, Notes]
*   `Characters`: [ID, Name, Role, Affiliation, Contact_Ref, Status, Notes]
*   `Tasks_Next`: [ID, Task_Name, Assignee, Due_Date, Priority, Status, Notes]
*   `Decisions_Canon`: [ID, Decision_Title, Category, Ruling, Decider, Status, Notes]
*   `Series_Episodes`: [ID, Series_Name, Episode_Number, Title, Air_Date, Status, Notes]
*   `Intake_Log`: [ID, Date_Received, Raw_Input, Submitter, Tag, Status, Notes]
*(Include full schema headers in actual prompt)*

## 2. Executive Dashboard Prompt
**Goal:** Generate the Executive Brief for JP.
**Prompt:**
> "Acting as the Executive OS for WORLD_CMP, analyze the current data state.
> 1. List the top 3 'Pending' decisions from `Decisions_Canon`.
> 2. Identify any 'High' priority tasks in `Tasks_Next` that are 'Blocked' or overdue based on today's date.
> 3. Provide a narrative summary of recent `Timeline_Canon` events.
> 4. Output a Markdown dashboard view titled 'Executive Command Center'."

## 3. Operations Dashboard Prompt
**Goal:** Optimize Logistics and Volunteer Coordination.
**Prompt:**
> "Acting as the Operations OS, review the `Intake_Log` and `Characters` sheet.
> 1. Flag any `Intake_Log` items from the last 24h.
> 2. List all `Characters` with Role='Volunteer' and Status='Active'.
> 3. Cross-reference `Locations` with `Assets_Register` to show Asset distribution.
> 4. Generate a 'Daily Ops Report' in bullet points."

## 4. Website Generator Prompt
**Goal:** Build the public facing content pages.
**Prompt:**
> "Generate HTML/Tailwind structure for the WORLD_CMP public site.
> 1. Use `Series_Episodes` to build a 'Episodes' grid section.
> 2. Use `Timeline_Canon` to build a vertical history timeline.
> 3. Ensure all content places 'UNKNOWN' where copy is missing.
> 4. Do not infer or invent details not present in the data."

## 5. Role-Based Access Control (RBAC) Description
*   **Founder (JP):** Full Read Access to all Sheets.
*   **Ops Lead:** Read/Write to `Intake_Log` (via Forms implication), `Assets_Register`, `Locations`. Read-Only `Decisions_Canon`.
*   **Program Lead:** Read/Write `Script_Film_Scenes`, `Book_Chapters`. Read-Only `Timeline_Canon`.
*   **Public:** No direct Sheet access. View via Website (Static build).
