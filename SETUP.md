# 🚀 **Quick Setup Guide - LaTeX Content Copier**

## 🌐 **What You Get**

Your extension now supports **BOTH Chrome AND Firefox** automatically!

## 📁 **File Structure**

```
LatexCopy/
├── manifest.json           # 🎯 UNIVERSAL (works on all browsers)
├── manifest-chrome.json    # 🟢 Chrome/Edge/Brave specific
├── manifest-firefox.json   # 🟠 Firefox specific
├── content.js              # 🧠 Main extension logic
├── styles.css              # 🎨 Extension styling
├── popup.html              # 📱 Extension popup
├── images/                 # 🖼️ Extension icons
├── test.html               # 🧪 Test page
└── browser-detect.js       # 🔍 Browser detection helper
```

## 🎯 **Installation - Super Simple!**

### **For ANY Browser:**
1. Download this folder
2. Load it in your browser
3. **That's it!** Browser automatically picks the right version

### **Chrome/Edge/Brave:**
- Go to `chrome://extensions/`
- Enable "Developer mode"
- Click "Load unpacked" → Select this folder

### **Firefox:**
- Go to `about:debugging#/runtime/this-firefox`
- Click "Load Temporary Add-on"
- Select `manifest-firefox.json`

## 🔍 **Which Manifest to Use?**

- **`manifest.json`** → Works on ALL browsers (recommended)
- **`manifest-chrome.json`** → Chrome-specific features
- **`manifest-firefox.json`** → Firefox-specific features

## 🧪 **Test It!**

1. Open `test.html` in your browser
2. Hover over math content
3. Click "Copy LaTeX" button
4. Paste anywhere to see the LaTeX code!

## 🎉 **You're Done!**

The extension now works on:
- ✅ ChatGPT
- ✅ Google Gemini  
- ✅ Claude
- ✅ Perplexity
- ✅ Any math website

**No more choosing between different versions - it just works!** 🚀
