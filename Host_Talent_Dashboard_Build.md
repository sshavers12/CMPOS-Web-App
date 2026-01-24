# Host & Talent Dashboard Blueprint

## Overview
**Audience:** Hosts, Co-hosts, and Talent (Internal & External).
**Purpose:** centralized command center for managing shows, planning episodes, and requesting production support.
**Tone:** Professional, high-energy, focused, "Showtime".
**Design Authority:**
- **Colors:** Black (`#000000`), CMP Orange (`#FF5722` or similar variant), White (`#FFFFFF`).
- **NO BLUE ALLOWED.**
- **Texture:** Glassmorphism panels, high-contrast text, sharp borders.
- **Mobile:** Mobile-first design for on-the-go brief editing.

## Core Modules

### 1. My Show(s) Dashboard
*The landing view for authenticated hosts.*
- **Top Card:** "Next Recording" countdown and status.
- **Show Selector:** (If host handles multiple shows) Dropdown or card carousel.
- **Quick Stats:** Engagement summary of last 3 episodes (simple arrows: up/down).
- **Notifications:** "Approval Required", "Brief Incomplete", "Promo Ready".

### 2. Episode Manifest (The Calendar)
*A list view of past and upcoming episodes.*
- **Views:** List (default), Calendar.
- **Columns/Data:**
    - Episode Number / Title.
    - Recording Date.
    - Status: `Idea` -> `Briefing` -> `Approved` -> `Recording` -> `Post-Prod` -> `Published`.
    - **Action:** Quick "Edit Brief" button.

### 3. Episode Brief Builder (The Core Tool)
*A guided form to move from concept to execution. This is the "Productivity" engine.*
- **Step 1: The Hook:** "What is the one sentence that sells this episode?"
- **Step 2: The Outline:** Drag-and-drop Run-of-Show blocks (Intro, Topic 1, Break, Topic 2, Outro).
- **Step 3: Guest Info:** Integration with Guest Booking (see below).
- **Step 4: Media Needs:** "Do you need specific clips? Images?"
- **Governance Check:** Mandatory tick-box: "I confirm this content adheres to CMP Truth & Dignity standards."
- **Submit for Approval:** Large Orange Button. (Triggers Operations Queue).

### 4. Guest Booking Checklist
*Integrated simple CRM for guests.*
- **Add Guest:** Name, Bio, Social Links.
- **Checklist:**
    - [ ] Initial Invite Sent.
    - [ ] Date Confirmed.
    - [ ] Tech Check Completed (Mic/Cam).
    - [ ] **Release Form Signed** (Critical blocker: if not signed, distinct warning UI).
    - [ ] Thank You Sent.

### 5. Promotion Pack Request
*Post-recording capability.*
- **Trigger:** Button "Request Promo Assets".
- **Inputs:**
    - "Best quote timestamp?"
    - "Key takeaway for social?"
    - "Select 3 vibiest screenshots (optional)."
- **Output:** Creates a ticket in the Operations Dashboard for the media team.

## UI Layout (Wireframe Description)
**Desktop:**
- **Sidebar (Glass):** Navigation (Dashboard, Calendar, Guests, Requests). Orange active state indicators.
- **Main Area (Black Background):** Content cards with white text.
- **Header:** "CMP | [Show Name]" (Orange accent).

**Mobile:**
- **Bottom Nav:** Apps-style (Home, Calendar, Create (+), Profile).
- **Cards:** Stacked, swipeable glass cards.
