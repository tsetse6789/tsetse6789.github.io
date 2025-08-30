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
A powerful YouTube Player by Nut with advanced playlist management, background playback, and ad-free experience. Features smart URL sharing and comprehensive media controls.

---

## YouTube Player Introduction & User Guide

The YouTube Player included in this site offers advanced features for playlist management, playback, sharing, and customization. Below is an overview of its core functions:

🔗 **Universal URL Parameter Support**
- **Video URLs**: Auto-play any YouTube video directly from URL
  - `https://tsetse6789.github.io/player?url=https://youtu.be/VIDEO_ID`
  - `https://tsetse6789.github.io/player?url=https://youtube.com/watch?v=VIDEO_ID`
- **Channel URLs**: Automatically load and browse channel content
  - `https://tsetse6789.github.io/player?url=https://youtube.com/channel/CHANNEL_ID`
  - `https://tsetse6789.github.io/player?url=https://youtube.com/@CHANNEL_HANDLE`
  - `https://tsetse6789.github.io/player?url=https://youtube.com/c/CHANNEL_NAME`
- **Playlist URLs**: Import or browse YouTube playlists instantly
  - `https://tsetse6789.github.io/player?url=https://youtube.com/playlist?list=PLAYLIST_ID`
  - Interactive dialog with options to import playlists or browse videos
  - Supports all playlist videos with pagination

🎵 **Advanced Playlist Management**
- **Create & Organize**: Unlimited custom playlists with drag-and-drop reordering
- **Import/Export**: Save playlists as JSON files for backup and sharing
- **Bulk Operations**: Select multiple videos to move, copy, or delete between playlists
- **Smart Actions**: Rename, duplicate, merge playlists with advanced options
- **Playlist Notes**: Add personal remarks and descriptions to playlists
- **YouTube Integration**: Import entire YouTube playlists with all videos

🚀 **Background Playback & Media Controls**
- **True Background Play**: Continues playing when tab is hidden or device is locked
- **Media Session Integration**: Control playback from lock screen, notification panel, and media keys
- **Smart Resume**: Automatically resumes playback when returning to the app
- **Wake Lock**: Prevents device sleep during active playback
- **Cross-Platform**: Works on desktop, mobile, and tablet devices

🛡️ **Ad-Free Experience**
- **Intelligent Ad Detection**: Multiple detection methods for comprehensive ad blocking
- **Auto-Skip**: Automatically skips ads when possible
- **Overlay Protection**: Hides ad content with elegant loading overlay
- **Audio Management**: Mutes ads while preserving video audio settings

📱 **Enhanced User Interface**
- **Video Details Drawer**: Expandable section with video statistics, description, and channel info
- **Channel Browser**: Browse channel videos and playlists directly in the app
- **Search Integration**: Search YouTube videos and channels with navigation breadcrumbs
- **Responsive Design**: Optimized for all screen sizes with touch-friendly controls
- **Dark Mode**: Automatic system theme detection with smooth transitions

🎛️ **Playback Features**
- **Smart Controls**: Shuffle, repeat (off/all/one), previous/next with playlist integration
- **Auto-Advance**: Intelligent next video selection based on shuffle and repeat settings
- **Current Video Actions**: Add playing video to playlists and generate share links
- **Video Information**: Real-time display of video title, channel, and metadata

💾 **Data Management**
- **Local Storage**: All playlists and settings saved locally with automatic backup
- **Export Capabilities**: Download playlists as structured JSON files
- **Import Support**: Upload and restore playlist files with validation
- **Settings Persistence**: Playback preferences and API configurations saved automatically

🔧 **Technical Features**
- **YouTube API Integration**: Full access to video metadata, channel info, and search
- **Progressive Loading**: Efficient content loading with pagination support
- **Error Handling**: Comprehensive error management with user-friendly messages
- **Performance Optimized**: Minimal resource usage with smart caching strategies

✨ **Key Advantages:**
- **No Ads**: Complete ad-blocking for uninterrupted viewing
- **Background Play**: True background playback on all devices
- **Unlimited Playlists**: Create and manage as many playlists as needed
- **Universal Sharing**: Share videos, channels, and playlists with simple URLs
- **Privacy Focused**: No tracking, no data collection, no account required
- **Cross-Device**: Works seamlessly across all modern browsers and devices

🎯 **Perfect For:**
- Music listening with background playback
- Creating and sharing video collections
- Ad-free video consumption
- Organizing educational content
- Building custom entertainment libraries

---

## Update Notes

### YouTube Player

#### 🔍 Search Videos in Playlist (NEW)
- **Menu Integration:** Added "Search Videos" as the first option in the "Other" menu.
- **Smart Search Dialog:** Opens a dedicated search interface for finding videos within the selected playlist.
- **Real-time Search:** Instant filtering as you type with 300ms debounce for performance.
- **Multi-field Search:** Searches both video titles and channel names.
- **Search Highlighting:** Highlights matching terms in yellow in the results.

**Search Interface Features:**
- **Empty State:** Shows a film emoji and helpful text when no search is entered.
- **No Results State:** Shows a magnifying glass emoji and helpful suggestions when no matches found.
- **Result Actions:** Each result shows:
  - Video thumbnail, title, and channel (with highlighting)
  - Position in playlist and if currently playing
  - "▶️ Play" button to immediately play the video
  - "📍 Show" button to jump to and highlight the video in the playlist

**User Experience Enhancements:**
- **Keyboard Support:** Enter key plays the first result; Escape key closes the dialog.
- **Visual Feedback:** Results show position in playlist (e.g., "Position: 5 of 24") and indicate if the video is currently playing; temporarily highlights the video when using "Show" action.
- **Responsive Design:** Works well on both desktop and mobile devices.

**How to Use:**
1. Click on any playlist's "⋯ Other" button.
2. Select "🔍 Search Videos" from the dropdown.
3. Start typing to search by video title or channel name.
4. Click on any result to play it, or use the "Show" button to locate it in the playlist.

This feature makes it much easier to find specific videos in large playlists, especially imported YouTube playlists that might contain hundreds of videos. The search is instant and intuitive, providing a much better user experience for playlist management.

---
---
## 🎯 **Quiz Game JSON Documentation & Templates**

### 📋 **Complete Game Structure**

```json
{
"name": "Sample Quiz Game",
"author": "Quiz Creator",
"description": "A comprehensive quiz covering various topics",
"version": "1.0",
"created": "2024-01-01T00:00:00.000Z",
"questions": [
// Array of question objects (see question types below)
],
"settings": {
"randomizeQuestions": true,
"randomizeAnswers": true,
"timeBonus": false,
"streakBonus": false,
"deductIncorrect": false
},
"metadata": {
"difficulty": "medium",
"category": "general",
"estimatedTime": "10 minutes",
"tags": ["trivia", "general knowledge"]
}
}
```

---

## 🔥 **Question Types & Templates**

### **1. 📊 Multiple Choice (Radio)**
```json
{
"questionType": "multiple choice",
"questionContent": "What is the capital of France?",
"time": "00:30",
"points": 100,
"answerType": "radio",
"answerSettings": {
"options": ["London", "Berlin", "Paris", "Madrid"]
},
"answer": 2,
"explanation": "Paris has been the capital of France since 987 AD."
}
```

### **2. ☑️ Multiple Select (Checkbox)**
```json
{
"questionType": "multiple select",
"questionContent": "Which of the following are programming languages?",
"time": "00:45",
"points": 150,
"answerType": "checkbox",
"answerSettings": {
"options": ["JavaScript", "HTML", "Python", "CSS", "Java", "XML"]
},
"answer": [0, 2, 4],
"explanation": "JavaScript, Python, and Java are programming languages. HTML, CSS, and XML are markup languages."
}
```

### **3. 🎚️ Range/Rating (Slider)**
```json
{
"questionType": "rating",
"questionContent": "Rate your programming experience from 1 to 10",
"time": "00:20",
"points": 50,
"answerType": "range",
"answerSettings": {
"min": 1,
"max": 10,
"step": 1,
"unit": "points"
},
"answer": null,
"explanation": "This is a subjective rating question with no wrong answer."
}
```

### **4. ✏️ Text Input**
```json
{
"questionType": "text",
"questionContent": "What is the largest planet in our solar system?",
"time": "00:30",
"points": 100,
"answerType": "text",
"answerSettings": {
"maxLength": 50,
"caseSensitive": false,
"allowPartialMatch": false
},
"answer": ["jupiter", "Jupiter"],
"explanation": "Jupiter is the largest planet in our solar system by both mass and volume."
}
```

### **5. 🔢 Number Input**
```json
{
"questionType": "number",
"questionContent": "How many continents are there?",
"time": "00:25",
"points": 75,
"answerType": "number",
"answerSettings": {
"min": 1,
"max": 10,
"allowDecimals": false,
"unit": "continents"
},
"answer": 7,
"explanation": "There are 7 continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia."
}
```

### **6. 🔄 Arrange/Reorder**
```json
{
"questionType": "arrange",
"questionContent": "Arrange these planets by their distance from the sun (closest to farthest)",
"time": "01:00",
"points": 200,
"answerType": "rearrange",
"answerSettings": {
"items": ["Venus", "Mercury", "Earth", "Mars"],
"direction": "horizontal"
},
"answer": "1,0,2,3",
"explanation": "The correct order is: Mercury (closest), Venus, Earth, Mars (farthest)."
}
```

### **7. 🖼️ Image-Based Question**
```json
{
"questionType": "image multiple choice",
"questionContent": "What landmark is shown in this image?",
"time": "00:45",
"points": 125,
"answerType": "radio",
"answerSettings": {
"options": ["Eiffel Tower", "Big Ben", "Statue of Liberty", "Leaning Tower of Pisa"],
"imageUrl": "https://example.com/landmark.jpg",
"imageAlt": "Famous landmark silhouette"
},
"answer": 0,
"explanation": "The Eiffel Tower is an iconic iron lattice tower in Paris, France."
}
```

### **8. ⏱️ True/False**
```json
{
"questionType": "true/false",
"questionContent": "The Great Wall of China is visible from space with the naked eye.",
"time": "00:20",
"points": 50,
"answerType": "radio",
"answerSettings": {
"options": ["True", "False"]
},
"answer": 1,
"explanation": "This is a common myth. The Great Wall is not visible from space with the naked eye."
}
```

---

## 🎛️ **Advanced Features & Settings**

### **Time Formats**
```json
{
"time": "00:30", // 30 seconds
"time": "01:15", // 1 minute 15 seconds
"time": "02:00", // 2 minutes
"time": null // No time limit
}
```

### **Point Systems**
```json
{
"points": 100, // Fixed points
"points": 50, // Lower for easier questions
"points": 200, // Higher for harder questions
"timeBonus": true, // Extra points for fast answers
"streakBonus": true // Bonus for consecutive correct answers
}
```

### **Difficulty Levels**
```json
{
"difficulty": "easy", // 50-100 points, 30+ seconds
"difficulty": "medium", // 100-150 points, 20-30 seconds
"difficulty": "hard", // 150-250 points, 10-20 seconds
"difficulty": "expert" // 250+ points, <15 seconds
}
```

---

## 📝 **Complete Game Template**

```json
{
"name": "General Knowledge Quiz",
"author": "Quiz Master",
"description": "Test your knowledge across various subjects",
"version": "1.0",
"created": "2024-01-01T00:00:00.000Z",
"settings": {
"randomizeQuestions": true,
"randomizeAnswers": true,
"timeBonus": false,
"streakBonus": false,
"deductIncorrect": false
},
"metadata": {
"difficulty": "medium",
"category": "general",
"estimatedTime": "15 minutes",
"tags": ["trivia", "general knowledge", "mixed"]
},
"questions": [
{
"questionType": "multiple choice",
"questionContent": "What is the capital of Japan?",
"time": "00:30",
"points": 100,
"answerType": "radio",
"answerSettings": {
"options": ["Tokyo", "Osaka", "Kyoto", "Hiroshima"]
},
"answer": 0,
"explanation": "Tokyo has been the capital of Japan since 1868."
},
{
"questionType": "multiple select",
"questionContent": "Which of these are primary colors?",
"time": "00:25",
"points": 150,
"answerType": "checkbox",
"answerSettings": {
"options": ["Red", "Green", "Blue", "Yellow", "Purple", "Orange"]
},
"answer": [0, 2, 3],
"explanation": "Red, blue, and yellow are the primary colors in traditional color theory."
},
{
"questionType": "number",
"questionContent": "In what year did World War II end?",
"time": "00:30",
"points": 125,
"answerType": "number",
"answerSettings": {
"min": 1900,
"max": 2000
},
"answer": 1945,
"explanation": "World War II ended in 1945 with the surrender of Japan."
},
{
"questionType": "text",
"questionContent": "What is the chemical symbol for gold?",
"time": "00:20",
"points": 75,
"answerType": "text",
"answerSettings": {
"maxLength": 5,
"caseSensitive": false
},
"answer": ["Au", "au"],
"explanation": "Au comes from the Latin word 'aurum' meaning gold."
},
{
"questionType": "arrange",
"questionContent": "Arrange these numbers in ascending order",
"time": "00:45",
"points": 100,
"answerType": "rearrange",
"answerSettings": {
"items": ["15", "3", "8", "12"]
},
"answer": "1,2,3,0",
"explanation": "The correct ascending order is: 3, 8, 12, 15."
}
]
}
```

---

## 🎯 **Best Practices & Tips**

### **🏗️ Question Design**
- **Clear and concise** question text
- **Balanced difficulty** progression
- **Varied question types** for engagement
- **Appropriate time limits** (15-60 seconds typical)
- **Meaningful point values** (50-250 range)

### **📊 Answer Options**
- **4-6 options** for multiple choice (optimal)
- **Mix obvious and tricky** distractors
- **Avoid "all of the above"** options
- **Keep option length** similar
- **Use realistic alternatives**

### **⚡ Performance Tips**
- **Questions**: 10-30 questions per game
- **Time limits**: Match question complexity
- **Points**: Scale with difficulty
- **Mix question types** for variety
- **Test thoroughly** before publishing

### **🎨 Accessibility**
- **Clear, simple language**
- **Avoid ambiguous wording**
- **Provide helpful explanations**
- **Consider color-blind players**
- **Test on mobile devices**

---

## 🔧 **Features Supported**

✅ **Auto-randomized answer options**
✅ **Auto-randomized question order**
✅ **Real-time multiplayer**
✅ **Auto-finish when all players answer**
✅ **Mobile-responsive design**
✅ **Dark/light mode support**
✅ **QR code joining**
✅ **Game export/import**
✅ **Game history tracking**
✅ **Leaderboards**
🚧 **Time bonus system** (ready for implementation)
🚧 **Streak bonus system** (ready for implementation)
🚧 **Point deduction** (ready for implementation)

Save your game as a `.json` file and import it into the quiz app to start playing! The app automatically handles randomization, scoring, and real-time multiplayer functionality.
