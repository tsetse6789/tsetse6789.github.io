window.apps = [
    {
        id: "unique-app-id-1",
        name: "Your App Name",
        developer: "Developer Name",
        category: "Productivity",
        platforms: [
            {
                os: "Windows",
                version: "10+",
                deviceType: "Desktop"
            },
            {
                os: "macOS",
                version: "11.0+",
                deviceType: "Desktop"
            },
            {
                os: "Android",
                version: "8.0+",
                deviceType: "Mobile"
            }
        ],
        icon: "https://example.com/path/to/app-icon.png",
        gallery: [
            "https://example.com/path/to/screenshot1.png",
            "https://example.com/path/to/screenshot2.png",
            "https://example.com/path/to/screenshot3.png"
        ],
        intro: "Brief description of what your app does and its main features.",
        details: `
# Detailed Description

This is a more comprehensive description of your app.

## Features
- Feature 1
- Feature 2
- Feature 3

## Requirements
- Requirement 1
- Requirement 2

You can use **bold text**, *italic text*, and even links: [Website](https://example.com)
        `,
        downloads: [
            {
                type: "Direct Download",     // Download type: "Direct Download", "App Store", "Google Play", "Steam", etc.
                url: "https://example.com/download/app.exe",
                version: "1.0.0",          // App version (optional)
                size: "25.4 MB"            // File size (optional)
            },
            {
                type: "Microsoft Store",
                url: "https://www.microsoft.com/store/apps/...",
                version: "1.0.0"
            },
            {
                type: "APK Download",
                url: "https://example.com/download/app.apk",
                version: "1.0.0",
                size: "12.8 MB"
            }
        ]
    },
    {
        id: "another-app-id",
        name: "Another App",
        developer: "Another Developer",
        category: "Games",
        platforms: [
            {
                os: "iOS",
                version: "14.0+",
                deviceType: "Mobile"
            },
            {
                os: "Android",
                version: "9.0+",
                deviceType: "Mobile"
            }
        ],
        icon: "https://example.com/path/to/another-icon.png",
        gallery: [
            "https://example.com/path/to/game-screenshot1.png",
            "https://example.com/path/to/game-screenshot2.png"
        ],
        intro: "An exciting mobile game with amazing graphics.",
        details: "Extended description with more details about the game...",
        downloads: [
            {
                type: "App Store",
                url: "https://apps.apple.com/app/...",
                version: "2.1.0"
            },
            {
                type: "Google Play",
                url: "https://play.google.com/store/apps/details?id=...",
                version: "2.1.0"
            }
        ]
    }
];
