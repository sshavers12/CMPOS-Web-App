# Volunteer Task Packs

**Objective:** Standardize execution so any volunteer can drop in and perform high-value work without training.

---

## 1. TASK PACK: THE CLIPPER
**Role:** `VOLUNTEER_EDITOR`
**Tool:** Dashboard "Task Queue" -> "Editing" Column
**Input:** `Episode_Archive_Link`, `Clip_Plan` (Segment timestamps)

### CHECKLIST:
- [ ] **Download Source:** Pull the full episode file or use the provided cloud editor link.
- [ ] **Isolate Segment:** Cut strictly to the timestamps provided in the Clip Plan.
- [ ] **Verify Hook:** Ensure the specific 3-second hook logic (e.g., "Start with the question") is respected.
- [ ] **Ratio Check:** Confirm project settings are 1080x1920 (9:16 Vertical).
- [ ] **Safe Zones:** Ensure face/action is centered and not obscured by UI overlay zone (bottom 20%).
- [ ] **Export:** Render as H.264 .mp4 (High Bitrate).
- [ ] **Upload:** Attach file to the Task Card.
- [ ] **Status:** Move card to `READY_FOR_QC`.

---

## 2. TASK PACK: THE UPLOADER
**Role:** `VOLUNTEER_ASSISTANT`
**Tool:** Dashboard "Content Pipeline"
**Input:** `Asset_Video_Final`, `Metadata_Pack`

### CHECKLIST:
- [ ] **QC Pass:** Watch the full clip. Glitches? Audio sync issues? -> *Reject if failed.*
- [ ] **Caption Burn:** Generate auto-captions.
    - [ ] **Style:** Uppercase, "Kingdom Gold" highlight for emphasis words.
    - [ ] **Placement:** Center-Bottom (just above safe zone).
    - [ ] **Spelling Check:** Verify names and local terms (e.g., "Chester", not "Chestnut").
- [ ] **Title Overlay:** Add the "Headline" text (white, bold font) to the top 15% of the frame.
- [ ] **Render Final:** Export the captioned version.
- [ ] **Upload Final:** Replace the asset on the card with the captioned version.
- [ ] **Status:** Move card to `READY_FOR_SCHEDULING`.

---

## 3. TASK PACK: THE SOCIAL SCHEDULER
**Role:** `SOCIAL_LEAD`
**Tool:** Social Management Platform (or Dashboard native integration)
**Input:** `Promotion_Pack` (Title, Copy, Tags), `Asset_Video_Final`

### CHECKLIST:
- [ ] **Platform Check:** Select the correct videos for YouTube Shorts, IG, FB, and TikTok.
- [ ] **Copy Paste:**
    - [ ] Copy the **Title_Optimized** to the video title field.
    - [ ] Copy the **Caption_Body** to the description.
    - [ ] Append the **Hashtag_Set** at the bottom.
- [ ] **Thumbnail:** Select the most engaging frame (usually a face + emotion).
- [ ] **Link Verify:** Ensure the "Link in Bio" or "Related Video" link points to the Full Episode.
- [ ] **Schedule:** Set date/time as defined in the Promotion Pack.
- [ ] **Status:** Move card to `SCHEDULED`.
