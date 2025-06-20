# tsetse6789.github.io
This is a website of Nut.
## About
These are the contents of ```tsetse6789.github.io``` :
* #### index.html:
A menu redirects to Nut Fun, Fun Chat and more.
* #### chat:
The website of Fun Chat. Learn more on:
```txt
https://sites.google.com/view/nut-fun/apps/funchat
```
* #### player:
A YouTube Player by Nut. You can add playlist and play videos on background. Enjoy no-ads YouTube!
## Update Notes:
* #### YouTube Player:
✅ New Features:
1. **"Add to..." Button**
- Adds the currently playing video to any existing playlist
- Shows a dropdown menu with all available playlists
- Includes success feedback when a video is added
- Handles cases when no playlists exist or when the video is already in a playlist
2. **"Share" Button**
- Creates a shareable URL in the format: `https://tsetse6789.github.io/player?url=https://youtu.be/{VIDEO_ID}`
- Uses the Clipboard API to copy the URL automatically
- Shows a success message with the copied URL
- Falls back to a modal dialog for manual copying if clipboard access fails
- The URL allows others to auto-play the video when they visit the link

🎯 **Key Features:**
- **Smart Positioning:** The "Add to..." dropdown appears in the center of the screen for better visibility.
- **Error Handling:** Both buttons handle cases when no video is playing or when video data can't be retrieved.
- **User Feedback:** Clear success messages show when actions are completed.
- **Responsive Design:** Both features work well on mobile and desktop.
- **Accessibility:** Proper keyboard navigation and screen reader support.

🚀 **Placement and Styling:**
- The buttons are positioned after the existing playback controls (Previous/Next) and use consistent styling with the rest of the interface.
- The share URL format works perfectly with the existing auto-play functionality already built into the player.
