# Installation Guide for LaTeX Content Copier Extension

## Prerequisites
- A modern web browser (Chrome, Edge, Brave, Firefox)
- Basic computer skills

## 🚀 **Universal Installation (Recommended)**

### **Step 1: Download the Extension**
1. Click the green "Code" button on this GitHub repository
2. Select "Download ZIP"
3. Extract the ZIP file to a folder on your computer
4. Remember the location of this folder

### **Step 2: Install in Your Browser**

#### **For Chrome/Edge/Brave:**
1. Open your browser
2. Type `chrome://extensions/` in the address bar and press Enter
3. In the top-right corner, toggle on "Developer mode"
4. Click "Load unpacked"
5. Navigate to the folder you extracted in Step 1
6. Select the folder (not individual files)
7. Click "Select Folder"

#### **For Firefox:**
1. Open Firefox
2. Type `about:debugging#/runtime/this-firefox` in the address bar and press Enter
3. Click "Load Temporary Add-on"
4. Navigate to the folder you extracted in Step 1
5. Select `manifest-firefox.json`
6. Click "Open"

### **Step 3: Verify Installation**
1. You should see the LaTeX Content Copier extension in your extensions list
2. The extension icon should appear in your browser toolbar
3. Click the icon to see the popup

## 🔍 **Browser Detection Helper**

**Want to know which manifest to use?** Open `browser-detect.js` in your browser to see:
- Which browser you're using
- Which manifest is recommended
- Universal manifest option

**Quick way**: Just drag and drop `browser-detect.js` into any browser tab!

## Testing the Installation

### Test 1: Basic Functionality
1. Open the `test.html` file in your browser
2. Hover over any math content
3. You should see a "Copy LaTeX" button appear
4. Click it to copy the LaTeX code

### Test 2: Real Websites
1. Go to ChatGPT (chat.openai.com)
2. Ask it to write some math equations
3. Hover over the equations to see if the copy button appears
4. Try the same on Gemini (g.co/gemini/*)

## Troubleshooting

### Extension Not Appearing
- Make sure Developer mode is enabled
- Try refreshing the extensions page
- Check if the folder contains `manifest.json`

### Extension Not Working
- Verify the extension is enabled
- Check browser console for errors (F12 → Console)
- Try refreshing the webpage
- Ensure you're on a supported site

### Copy Button Not Showing
- Make sure you're hovering over math content
- Try different parts of the math area
- Check if the site is supported
- Verify the extension has necessary permissions

### Permission Errors
- The extension needs clipboard access
- Grant permissions when prompted
- Check browser settings for clipboard permissions

## Updating the Extension

### Manual Update
1. Download the latest version from GitHub
2. Remove the old extension from `chrome://extensions/`
3. Load the new version using "Load unpacked"

### Automatic Updates
- Currently not available (manual installation only)
- Check GitHub for new releases

## Uninstalling

### Chrome/Edge/Brave
1. Go to `chrome://extensions/`
2. Find "LaTeX Content Copier"
3. Click "Remove"
4. Confirm removal

### Firefox
1. Go to `about:debugging#/runtime/this-firefox`
2. Find the extension
3. Click "Remove"
4. Restart Firefox

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Look for error messages in the browser console
3. Open an issue on the GitHub repository
4. Include your browser version and OS

## Security Note

This extension:
- Only runs on websites you visit
- Cannot access your personal data
- Requires clipboard permission to copy LaTeX code
- Is open source and can be reviewed by anyone

The extension is safe to use and follows browser security best practices.
