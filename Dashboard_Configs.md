# masOS CONTROL-SYSTEM: KINGDOM GOLD EDITION
**Visual Authority:** Kingdom Communications / MC MAS Cinematic Studio
**Palette:** Deep Black, Signal White, Kingdom Gold (#FFD400).
**Layout Structure:** Sidebar Tools + Main Stage Canvas.

---

## 1. VISUAL THEME DEFINITION
*   **Background:** Deepest Navy/Black (`#020204`).
*   **Surface:** Dark Grey/Blue (`#0A0B10`) for panels/sidebars.
*   **Accents:**
    *   **Primary:** Kingdom Gold (`#FFC107` / `#FFA000`) - Used for Active States, Borders, Important Data.
    *   **Secondary:** Signal White (`#FFFFFF`) - Primary Text.
    *   **Muted:** Steel Blue (`#475569`) - Inactive Text, Subtitles.
*   **Component Style:**
    *   **Borders:** 1px Solid Gold (Active) or Steel (Inactive).
    *   **Corners:** Micro-rounded (4px) - referencing the "Studio" UI.
    *   **Typography:** Sans-Serif (Inter/Roboto), Bold, All-Caps Headers.

---

## 2. LAYOUT FRAMEWORK (THE STUDIO CONTAINER)
Every dashboard follows the "Studio" layout seen in reference images.

### Region A: Studio Sidebar (Left, 250px)
*   **Role:** Navigation & Tool Selection.
*   **Structure:**
    1.  **Context Header:** "STUDIO TOOLS" (Gold Text).
    2.  **Category Groups:** (e.g., "SCENES", "WRITING", "AUDIO").
    3.  **Active Indicator:** Gold Dot (`•`) on the active view.
    4.  **Buttons:** Full-width outlined buttons. Default: Dark Grey Fill + Steel Border. Active: Gold Border + Gold Glow.

### Region B: Main Stage (Center, Fluid)
*   **Role:** Data Visualization & Content.
*   **Structure:**
    *   **Header:** Dashboard Title (e.g., "MC MAS Music Studio").
    *   **Canvas:** Grid-based data display.

---

## 3. DASHBOARD CONFIGURATIONS

### DASHBOARD 1: EXECUTIVE OVERVIEW (FOUNDATION)
*   **Sidebar Tools:**
    *   `[GOVERNANCE]` -> Loads Decision Ledger.
    *   `[TIMELINE]` -> Loads Vertical Timeline.
    *   `[PERSONNEL]` -> Loads Team Snapshot.
*   **Main Stage View:**
    *   **Governance Ledger:**
        *   Table with Gold headers.
        *   Rows: Alternate extremely subtle dark tints.
        *   Status: Text-only (e.g., "RULING PENDING") in Gold.
    *   **Progress Meters:**
        *   Linear bars. Filled portion is Gold Gradient. Empty portion is detailed grey hatch/grid.

### DASHBOARD 2: RADIO OPERATIONS (CMP RADIO)
*   **Sidebar Tools:**
    *   `[EPISODES]` -> Loads Episode Manifest.
    *   `[BROADCAST]` -> Loads Schedule.
    *   `[TALENT]` -> Loads Roster.
    *   `[PARTNER NET]` -> Loads External Studio List.
*   **Main Stage View:**
    *   **Live Indicator:** "ON AIR" Badge (Solid Gold background, Black Text) if active.
    *   **Episode Manifest:**
        *   Cards with thin Gold outlines.
        *   Content: `SERIES_ID` | `EPISODE_TITLE` | `DATE`.
    *   **Partner Network:**
        *   **Source:** `Characters` (Role = 'Partner'); `Intake_Log` (Tag = 'Partner_Req').
        *   **View:** "Affiliate Cards" - Show Name, Host, RSS Status.
        *   **PENDING:** "New Application" Alert for Intake items.

### DASHBOARD 3: INTERNAL OPS (LOGISTICS)
*   **Sidebar Tools:**
    *   `[TASK QUEUE]`
    *   `[RESEARCH]`
    *   `[INVENTORY]`
*   **Main Stage View:**
    *   **Task Board:**
        *   Kanban columns with "Studio" styling (Dark backgrounds, Gold headers).
        *   Cards: High contrast White text on Black. Priority items get Gold left-border.

---

## 4. UI COMPONENT MAPPINGS
*   **Data Tables:** Replaced by "List Panels". Each row is a distinct block with a bottom border.
*   **Status Indicators:** No traffic light colors (Red/Green). Use Bright Gold for "Attention" and Dimmed White for "Normal".
*   **Inputs (Read-Only Look):** Text inputs look like "Console Fields" - Dark background, Monospace font, dimmed value.

---
**Constraint Checklist:**
*   [x] Colors: Orange/Gold, Black, White.
*   [x] Style: High-end "Cinematic Studio" application.
*   [x] Data: Read-only bindings to WORLD_CMP spine.
