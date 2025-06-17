# LaTeX Content Copier

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg) ![Version](https://img.shields.io/badge/version-1.0-brightgreen)

A simple browser extension to solve a common frustration: easily copying the original source code of rendered LaTeX equations from modern web apps like ChatGPT, and more.

## About The Project

Have you ever tried to copy a complex mathematical formula from an AI chat or a technical blog, only to get garbled, unreadable text? This extension restores sanity by allowing you to grab the clean, original LaTeX source code from an entire message block with a single click.

It works by finding the message container you're interacting with, extracting all LaTeX formulas (both inline and display), and copying them to your clipboard.

![Extension Demo](/DEMO/demo.png)
### Features

* **Finds All Formulas:** Intelligently locates all LaTeX formulas (`$$...$$` and `$....$`) within a specific message block.
* **Simple Interface:** Displays a clean "Copy LaTeX" button when you hover over a formula.
* **Broad Compatibility:** Works on modern websites that use KaTeX or MathJax for rendering, including AI chat platforms.

## Getting Started

Since this extension is not yet published on the official web stores, you will need to install it manually using your browser's Developer Mode.

### Manual Installation Instructions

These instructions are for Google Chrome, but the process is nearly identical for other Chromium-based browsers like **Arc**, **Microsoft Edge**, and **Brave**.

1.  **Download the Files:**
    * Go to the main page of this GitHub repository.
    * Click the green `<> Code` button.
    * Select **Download ZIP**.

2.  **Unzip the Folder:**
    * Find the downloaded `.zip` file on your computer (usually in your `Downloads` folder).
    * Unzip or extract the folder. You should now have a folder named `latex-copier-extension-main` (or similar).

3.  **Load the Extension in Your Browser:**
    * Open your Chrome-based browser.
    * Navigate to the extensions page by typing `chrome://extensions` in your address bar and pressing Enter.
    * In the top-right corner of the page, turn on the **Developer mode** toggle switch.
        ![Developer Mode Toggle](/DEMO/dev.png)
    * Three new buttons will appear. Click on **Load unpacked**.
        ![Load Unpacked](/DEMO/load.png)
    * A file selection dialog will open. Navigate to and select the unzipped folder from Step 2 (the one that contains `manifest.json`).
    * The "LaTeX Content Copier" extension will now appear in your list of extensions and is ready to use!
        ![Extension installed](/DEMO/install.png)


    

## How to Use

1.  Navigate to a website that has rendered LaTeX (e.g., a conversation in ChatGPT).
2.  Hover your mouse over any part of a mathematical formula.
3.  A "Copy LaTeX" button will appear above the formula.
4.  Click the button. All formulas found in that specific message block will be copied to your clipboard, separated by newlines.

## To-Do / Future Features

This is a list of potential improvements and features for the future:

-   [ ] **Single Formula Copy:** Add an option (perhaps with a modifier key like `Alt`+`Click`) to copy only the specific formula being hovered over, instead of all formulas in the block.
-   [ ] **Options Page:** Create a settings page where users can:
    -   Customize the appearance of the copy button (color, text).
    -   Configure the format of the copied text (e.g., change the newline separator).
-   [ ] **Improve Website Compatibility:** Add and test selectors for more websites that use LaTeX and specifically Gemini.
-   [ ] **Visual Feedback:** Make the "Copied!" confirmation more visually prominent.
-   [ ] **Store Publication:** Complete the process to publish on the Chrome Web Store and Firefox Browser Add-ons store.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See the `LICENSE` file for more information.
