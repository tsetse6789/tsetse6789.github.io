# YouTube Player Introduction & User Guide

The YouTube Player included in this site offers advanced features for playlist management, playback, sharing, and customization. Below is an overview of its core functions:

🔗 **Universal URL Parameter Support**
- **Video URLs**: Auto-play any YouTube video directly from URL
  - ·`https://tsetse6789.github.io/player?url=https://youtu.be/VIDEO_ID`
  - ·`https://tsetse6789.github.io/player?url=https://youtube.com/watch?v=VIDEO_ID`
- **Channel URLs**: Automatically load and browse channel content
  - ·`https://tsetse6789.github.io/player?url=https://youtube.com/channel/CHANNEL_ID`
  - ·`https://tsetse6789.github.io/player?url=https://youtube.com/@CHANNEL_HANDLE`
  - ·`https://tsetse6789.github.io/player?url=https://youtube.com/c/CHANNEL_NAME`
- **Playlist URLs**: Import or browse YouTube playlists instantly
  - ·`https://tsetse6789.github.io/player?url=https://youtube.com/playlist?list=PLAYLIST_ID`
  - ·Interactive dialog with options to import playlists or browse videos
  - ·Supports all playlist videos with pagination

🎵 **Advanced Playlist Management**
- ·**Create & Organize**: Unlimited custom playlists with drag-and-drop reordering
- ·**Import/Export**: Save playlists as JSON files for backup and sharing
- ·**Bulk Operations**: Select multiple videos to move, copy, or delete between playlists
- ·**Smart Actions**: Rename, duplicate, merge playlists with advanced options
- ·**Playlist Notes**: Add personal remarks and descriptions to playlists
- ·**YouTube Integration**: Import entire YouTube playlists with all videos

🚀 **Background Playback & Media Controls**
- ·**True Background Play**: Continues playing when tab is hidden or device is locked
- ·**Media Session Integration**: Control playback from lock screen, notification panel, and media keys
- ·**Smart Resume**: Automatically resumes playback when returning to the app
- ·**Wake Lock**: Prevents device sleep during active playback
- ·**Cross-Platform**: Works on desktop, mobile, and tablet devices

🛡️ **Ad-Free Experience**
- ·**Intelligent Ad Detection**: Multiple detection methods for comprehensive ad blocking
- ·**Auto-Skip**: Automatically skips ads when possible
- ·**Overlay Protection**: Hides ad content with elegant loading overlay
- ·**Audio Management**: Mutes ads while preserving video audio settings

📱 **Enhanced User Interface**
- ·**Video Details Drawer**: Expandable section with video statistics, description, and channel info
- ·**Channel Browser**: Browse channel videos and playlists directly in the app
- ·**Search Integration**: Search YouTube videos and channels with navigation breadcrumbs
- ·**Responsive Design**: Optimized for all screen sizes with touch-friendly controls
- ·**Dark Mode**: Automatic system theme detection with smooth transitions

🎛️ **Playback Features**
- ·**Smart Controls**: Shuffle, repeat (off/all/one), previous/next with playlist integration
- ·**Auto-Advance**: Intelligent next video selection based on shuffle and repeat settings
- ·**Current Video Actions**: Add playing video to playlists and generate share links
- ·**Video Information**: Real-time display of video title, channel, and metadata

💾 **Data Management**
- ·**Local Storage**: All playlists and settings saved locally with automatic backup
- ·**Export Capabilities**: Download playlists as structured JSON files
- ·**Import Support**: Upload and restore playlist files with validation
- ·**Settings Persistence**: Playback preferences and API configurations saved automatically

🔧 **Technical Features**
- ·**YouTube API Integration**: Full access to video metadata, channel info, and search
- ·**Progressive Loading**: Efficient content loading with pagination support
- ·**Error Handling**: Comprehensive error management with user-friendly messages
- ·**Performance Optimized**: Minimal resource usage with smart caching strategies

✨ **Key Advantages:**
- ·**No Ads**: Complete ad-blocking for uninterrupted viewing
- ·**Background Play**: True background playback on all devices
- ·**Unlimited Playlists**: Create and manage as many playlists as needed
- ·**Universal Sharing**: Share videos, channels, and playlists with simple URLs
- ·**Privacy Focused**: No tracking, no data collection, no account required
- ·**Cross-Device**: Works seamlessly across all modern browsers and devices

🎯 **Perfect For:**
- ·Music listening with background playback
- ·Creating and sharing video collections
- ·Ad-free video consumption
- ·Organizing educational content
- ·Building custom entertainment libraries

---

## Update Notes

### YouTube Player

#### 🔍 Search Videos in Playlist (NEW)
- ·**Menu Integration:** Added "Search Videos" as the first option in the "Other" menu.
- ·**Smart Search Dialog:** Opens a dedicated search interface for finding videos within the selected playlist.
- ·**Real-time Search:** Instant filtering as you type with 300ms debounce for performance.
- ·**Multi-field Search:** Searches both video titles and channel names.
- ·**Search Highlighting:** Highlights matching terms in yellow in the results.

**Search Interface Features:**
- ·**Empty State:** Shows a film emoji and helpful text when no search is entered.
- ·**No Results State:** Shows a magnifying glass emoji and helpful suggestions when no matches found.
- ·**Result Actions:** Each result shows:
  - ·～Video thumbnail, title, and channel (with highlighting)
  - ·～Position in playlist and if currently playing
  - ·～"▶️ Play" button to immediately play the video
  - ·～"📍 Show" button to jump to and highlight the video in the playlist

**User Experience Enhancements:**
- ·**Keyboard Support:** Enter key plays the first result; Escape key closes the dialog.
- ·**Visual Feedback:** Results show position in playlist (e.g., "Position: 5 of 24") and indicate if the video is currently playing; temporarily highlights the video when using "Show" action.
- ·**Responsive Design:** Works well on both desktop and mobile devices.

**How to Use:**
1. Click on any playlist's "⋯ Other" button.
2. Select "🔍 Search Videos" from the dropdown.
3. Start typing to search by video title or channel name.
4. Click on any result to play it, or use the "Show" button to locate it in the playlist.

This feature makes it much easier to find specific videos in large playlists, especially imported YouTube playlists that might contain hundreds of videos. The search is instant and intuitive, providing a much better user experience for playlist management.

---
