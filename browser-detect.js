// Browser Detection Script for LaTeX Content Copier Extension
// This script helps identify which browser you're using and which manifest to use

(function() {
    'use strict';
    
    function detectBrowser() {
        const userAgent = navigator.userAgent;
        let browser = 'Unknown';
        let manifest = 'manifest.json';
        
        if (userAgent.includes('Firefox')) {
            browser = 'Firefox';
            manifest = 'manifest-firefox.json';
        } else if (userAgent.includes('Chrome') || userAgent.includes('Edge') || userAgent.includes('Brave')) {
            browser = 'Chrome/Edge/Brave';
            manifest = 'manifest-chrome.json';
        } else if (userAgent.includes('Safari')) {
            browser = 'Safari';
            manifest = 'manifest-chrome.json'; // Safari uses WebKit like Chrome
        }
        
        return { browser, manifest };
    }
    
    function showBrowserInfo() {
        const info = detectBrowser();
        console.log(`🌐 Browser detected: ${info.browser}`);
        console.log(`📁 Recommended manifest: ${info.manifest}`);
        console.log(`💡 Universal manifest: manifest.json (works on all browsers)`);
        
        // Create a visual indicator on the page
        const div = document.createElement('div');
        div.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #4CAF50;
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            z-index: 10000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        div.innerHTML = `
            <strong>🌐 ${info.browser}</strong><br>
            📁 Use: ${info.manifest}<br>
            💡 Or: manifest.json
        `;
        
        document.body.appendChild(div);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (div.parentNode) {
                div.parentNode.removeChild(div);
            }
        }, 5000);
    }
    
    // Show browser info when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showBrowserInfo);
    } else {
        showBrowserInfo();
    }
    
    // Also show when called directly
    window.showBrowserInfo = showBrowserInfo;
    
})();
