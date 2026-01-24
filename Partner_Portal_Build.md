# Partner Portal Blueprint (External)

## Overview
**Audience:** Independent Creators, Community Partners, External Production Houses.
**Purpose:** A secure, streamlined gateway for external entities to submit content for CMP hosting.
**Tone:** Welcoming but Strict, Trustworthy, "Sanctuary for Creators".
**Design Authority:**
- **Colors:** Black, White, Orange accents.
- **NO BLUE.**
- **Style:** Clean glass panels over a dark, unified background.

## Core Modules

### 1. The Welcome Airlock
*Public landing page.*
- **Hero:** "Host Your Voice with CMP."
- **Value Prop:** "Editorial Freedom. Governance Safety. Community Reach."
- **Primary Action:** "Submit a Brief" (Orange CTA).
- **Secondary Action:** "Read Policy" (White outline).

### 2. Submit Brief Interface
*The intake form. Must be frictionless but rigorous.*
- **Creator Info:** Name, Organization, Contact.
- **Show Concept:** Title, Logline, Format (Audio/Video).
- **The Pitch:** "Why this? Why now? Why Chester?"
- **Safety Self-Audit (The "Gatekeeper"):**
    - [ ] "Does this contain explicit content?" (Yes/No - if Yes, triggers required context field).
    - [ ] "Does this name real private individuals?"
    - [ ] "Does this involve minors?" (Critical Flag).
- **Upload:** Script/Outline or Pilot Link.

### 3. Submission History & Status
*The "My Orders" view for partners.*
- **Status Tracker:**
    - `Received` (Dot: White)
    - `Under Review` (Dot: Orange Pulse)
    - `Approved / In-Production` (Dot: Solid Orange)
    - `Returned for Edits` (Dot: Red Outline)
- **Feedback Loop:** View comments from JP/Admin directly on the submission card.

### 4. Required Compliance Checklist
*Must be 100% complete before "Publishing" is unlocked.*
- **Copyright:** "I own or have licensed all music/video."
- **Releases:** "All on-camera subjects have signed the CMP Standard Release."
- **Defamation:** "I have not made false operational claims about private citizens."
- **Minors:** "Parental consent on file for any under-18s."
- **Safety:** "No hate speech, incitement, or exploitation."

### 5. Policy Summary Widget
*Persistent side-panel or drawer.*
- Quick access to "CMP Hosting Policy" (Plain English version).
- Contact link for "Governance Questions" (routes to Admin).

## User Journey
1.  **Register/Login:** Email based (passwordless magic link preferred for ease).
2.  **Dashboard:** Empty state with "Start New Submission".
3.  **Drafting:** Auto-save enabled.
4.  **Submission:** Confetti animation (Orange/White).
5.  **Review:** Notification via email when status changes.

## Technical Notes
- **Auth:** Separate from Internal Staff. "Partner Role" in RBAC.
- **Data:** Submissions feed into the `Structure Engine` (Task Queue) for Admin Review.
