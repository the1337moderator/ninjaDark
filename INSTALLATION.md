# NinjaDark Installation Guide

## Quick Install (5 minutes)

### Step 1: Download
Download `NinjaDark-v1.0.0.zip` from the GitHub Release

### Step 2: Extract
1. Right-click `NinjaDark-v1.0.0.zip`
2. Choose "Extract All..."
3. Extract to a **permanent location** like:
   - `C:\Users\YourName\Documents\NinjaDark`
   - Or any folder you won't delete

⚠️ **Important:** Don't extract to your Downloads or Temp folder - Chrome needs the files to stay there permanently!

### Step 3: Install in Chrome
1. Open Chrome and go to: `chrome://extensions/`
2. Turn on **Developer mode** (toggle switch in top-right)
3. Click **"Load unpacked"** button
4. Browse to the folder you extracted (select the folder that contains `manifest.json`)
5. Click "Select Folder"

### Step 4: Verify
1. Visit `https://app.ninjarmm.com`
2. Page should display in dark mode with inverted grayscale colors
3. Colorful elements (badges, status indicators) stay vibrant

## Troubleshooting

**"Extension not working?"**
- Force Refresh the NinjaRMM page (Ctrl+Shift+F5)
- Check that Developer mode is enabled
- Make sure you selected the correct folder (should contain manifest.json)

**"Extension disappeared after restart?"**
- The extracted folder was moved or deleted
- Extract to a permanent location and reinstall

**"Can't enable Developer mode?"**
- Your organization may have restricted this via policy

## Why Not a .crx File?

Chrome now blocks .crx files that aren't from the Chrome Web Store for security reasons. The "unpacked" method is the standard way to install private/internal extensions.

## Need Help?
Create an issue at: https://github.com/the1337moderator/ninjaDark/issues
