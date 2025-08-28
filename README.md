# LaTeX Content Copier

A browser extension that copies the underlying LaTeX code from rendered math on websites, including modern AI chat interfaces like ChatGPT, Gemini, Claude, and Perplexity.

## Features

- **Multi-platform Support**: Works with ChatGPT, Gemini, Claude, Perplexity, and traditional math websites
- **Smart Detection**: Automatically detects LaTeX content in various formats:
  - MathJax and KaTeX rendering
  - Custom AI chat interfaces
  - Image-based LaTeX renders
  - Dynamic content loading
- **Easy Copy**: Hover over any math content to see a "Copy LaTeX" button
- **One-click Copy**: Click the button to copy LaTeX code to clipboard
- **Real-time Updates**: Automatically detects new content as it loads

## Supported Platforms

### AI Chat Interfaces
- **ChatGPT** (chat.openai.com) ✅
- **Google Gemini** (g.co/gemini/*, gemini.google.com) ✅
- **Claude** (claude.ai) ✅
- **Perplexity** (perplexity.ai) ✅

### Traditional Math Sites
- **MathJax-powered sites** ✅
- **KaTeX-powered sites** ✅
- **Sites with custom math rendering** ✅

## How It Works

1. **Install the extension** in your browser
2. **Navigate to any supported site** (ChatGPT, Gemini, etc.)
3. **Hover over math content** - you'll see a "Copy LaTeX" button appear
4. **Click the button** to copy the LaTeX source code to your clipboard
5. **Paste anywhere** you need the LaTeX code

## Installation

### Chrome/Edge/Brave
1. Download the extension files
2. Go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder

### Firefox
1. Download the extension files
2. Go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on" and select `manifest.json`

## Technical Details

The extension uses multiple detection methods to find LaTeX content:

- **Direct Detection**: Looks for standard MathJax/KaTeX elements
- **Data Attributes**: Searches for `data-latex` and `data-math` attributes
- **Class Patterns**: Identifies elements with math-related class names
- **Context Analysis**: Examines surrounding elements for LaTeX content
- **Image Analysis**: Checks alt text and context for image-based renders
- **Dynamic Content**: Uses MutationObserver to detect newly loaded content

## Version History

### v2.1 (Current)
- Added support for Google Gemini
- Enhanced detection for modern AI chat interfaces
- Improved dynamic content detection
- Added support for image-based LaTeX renders
- Better context analysis for complex layouts

### v2.0
- Initial release with ChatGPT support
- Basic MathJax and KaTeX detection

## Troubleshooting

### Extension not working on Gemini?
1. Make sure you're on a Gemini page (g.co/gemini/* or gemini.google.com)
2. Try refreshing the page
3. Check if the extension is enabled
4. Look for any console errors

### Not detecting LaTeX content?
1. Verify the content is actually LaTeX (not just text)
2. Try hovering over different parts of the math content
3. Check if the site is in the supported list
4. Ensure the extension has the necessary permissions

### Copy button not appearing?
1. Make sure you're hovering over math content
2. Check if another copy button is already visible
3. Try moving your mouse around the math area
4. Refresh the page and try again

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the extension!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you're having issues or want to request support for a new platform, please open an issue on the GitHub repository.
