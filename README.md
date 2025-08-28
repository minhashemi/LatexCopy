# LaTeX Content Copier

A browser extension that copies the underlying LaTeX code from rendered math on websites, including modern AI chat interfaces like ChatGPT, Gemini, Claude, and Perplexity.

## 🌐 **Multi-Browser Support**

This extension now supports **both Chrome and Firefox** with automatic browser detection!

- **Chrome/Edge/Brave**: Uses `manifest-chrome.json` (Manifest V3)
- **Firefox**: Uses `manifest-firefox.json` (Manifest V2)
- **Universal**: `manifest.json` automatically works with both

## ✨ **Features**

- **Multi-platform Support**: Works with ChatGPT, Gemini, Claude, Perplexity, and traditional math websites
- **Smart Detection**: Automatically detects LaTeX content in various formats:
  - MathJax and KaTeX rendering
  - Custom AI chat interfaces
  - Image-based LaTeX renders
  - Dynamic content loading
- **Easy Copy**: Hover over any math content to see a "Copy LaTeX" button
- **One-click Copy**: Click the button to copy LaTeX code to clipboard
- **Real-time Updates**: Automatically detects new content as it loads
- **Complete Expressions**: Captures full LaTeX formulas, not just partial ones

## 🚀 **Quick Installation**

### **Chrome/Edge/Brave Users**
1. Download this repository
2. Go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the folder
5. **That's it!** The extension will automatically use the Chrome version

### **Firefox Users**
1. Download this repository
2. Go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select `manifest-firefox.json`
5. **That's it!** The extension will automatically use the Firefox version

### **Automatic Detection**
- Just download the folder and load it in any browser
- The extension automatically detects your browser and uses the right manifest
- No need to choose between different files!

## 🎯 **Supported Platforms**

### **AI Chat Interfaces**
- **ChatGPT** (chat.openai.com) ✅
- **Google Gemini** (g.co/gemini, gemini.google.com) ✅
- **Claude** (claude.ai) ✅
- **Perplexity** (perplexity.ai) ✅

### **Traditional Math Websites**
- **MathJax-powered sites** ✅
- **KaTeX-powered sites** ✅
- **Any site with LaTeX content** ✅

## 🔧 **How It Works**

1. **Detection**: Automatically scans pages for LaTeX content
2. **Analysis**: Identifies complete LaTeX expressions using smart parsing
3. **Interface**: Shows a "Copy LaTeX" button when hovering over math content
4. **Copy**: One-click copying of the complete LaTeX code to clipboard

## 📁 **File Structure**

```
LatexCopy/
├── manifest.json           # Universal manifest (auto-detects browser)
├── manifest-chrome.json    # Chrome/Edge specific (Manifest V3)
├── manifest-firefox.json   # Firefox specific (Manifest V2)
├── content.js              # Main extension logic
├── styles.css              # Extension styling
├── popup.html              # Extension popup
├── images/                 # Extension icons
└── test.html               # Test page for verification
```

## 🧪 **Testing**

Open `test.html` in your browser to test the extension with various LaTeX expressions.

## 📝 **License**

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 **Contributing**

Feel free to submit issues and enhancement requests!
