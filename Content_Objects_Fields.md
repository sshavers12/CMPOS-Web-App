# Content Objects + Fields Data Schema

**Objective:** Define the rigid data structures that power the Content Lifecycle Engine. Note: These schemas map to the Google Sheets "Spine" but represent the application-layer logic.

## 1. EPISODE_CANON (The Parent)
*Represents a single full-length show/broadcast.*

*   **ID:** `EP_{SHOW_CODE}_{DATE}_{SEQ}` (e.g., `EP_TMT_20231024_01`)
*   **Show_Ref:** Link to `Series_Canon`
*   **Air_Date:** Date/Time
*   **Status:** `SCHEDULED` | `LIVE` | `ARCHIVED` | `PROCESSING` | `DONE`
*   **Youtube_URL:** Full Episode Link
*   **Drive_Archive_Link:** Raw file path
*   **Metadata_Pack:** (JSON or Related Object)
    *   `Topic_Tags`: [List]
    *   `Guest_List`: [List]
    *   `Key_Quotes`: [Long Text]
    *   `Golden_Moments`: [Timestamp Ranges]

## 2. CLIP_UNIT (The Child)
*Represents a single derived piece of content intended for vertical distribution.*

*   **ID:** `CL_{EP_ID}_{SEQ}` (e.g., `CL_TMT_20231024_01_01`)
*   **Parent_Ref:** Link to `EPISODE_CANON`
*   **Target_Duration:** `30s` | `60s` | `90s`
*   **Hook_Strategy:** `Question`, `Controversy`, `Statement`, `Visual`
*   **Hook_Copy:** Text description of the first 3 seconds info.
*   **Status:** `PLANNED` | `IN_EDIT` | `QC_READY` | `APPROVED` | `PUBLISHED`
*   **Editor_Assigned:** Volunteer User ID
*   **Asset_Video_Final:** Drive Link to processed .mp4
*   **Asset_Thumbnail:** Drive Link to .jpg

## 3. PROMOTION_PACK (The Wrapper)
*Represents the platform-specific wrapper for a CLIP_UNIT.*

*   **ID:** `PP_{CLIP_ID}_{PLATFORM}`
*   **Clip_Ref:** Link to `CLIP_UNIT`
*   **Platform:** `YOUTUBE_SHORTS` | `IG_REELS` | `FB_REELS` | `TIKTOK`
*   **Title_Optimized:** Platform-specific title (e.g., Shorts allows 100 chars, TikTok allows more).
*   **Caption_Body:** Structured text for the post description.
    *   *Rules:* Must include Catchy Opening Line + Context + CTA.
*   **Hashtag_Set:**
    *   `Global`: #Chester #Media #Kingdom
    *   `Niche`: #TopicSpecific (e.g., #LocalPolitics)
*   **CTA_Type:** `SUBSCRIBE` | `WATCH_FULL_LINK` | `COMMENT_BELOW`
*   **Schedule_Time:** Target Publish Time
*   **Live_Link:** URL to published post (for tracking)

## 4. PERFORMANCE_LOG (The Feedback)
*Weekly snapshot of metrics for a specific CLIP_UNIT.*

*   **ID:** `MET_{CLIP_ID}_{WEEK_ENDING}`
*   **Clip_Ref:** Link to `CLIP_UNIT`
*   **Views:** Integer
*   **Watch_Time_Avg:** Seconds
*   **Engagement_Score:** (Likes + Comments + Shares)
*   **Subscriber_Impact:** Estimated new subs
