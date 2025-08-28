document.addEventListener('mouseover', function(event) {
    const target = event.target.closest('.MathJax, .katex, [data-latex], [data-math], .math, .latex, .equation, [class*="math"], [class*="latex"], [class*="equation"], img, svg, canvas');

    if (!target) {
        return;
    }

    let latexSource = '';

    // Standard KaTeX detection
    if (target.classList.contains('katex')) {
        const annotation = target.querySelector('.katex-mathml annotation[encoding="application/x-tex"]');
        if (annotation) {
            latexSource = annotation.textContent;
        }
        // 'data-equation'
        else if (target.dataset.equation) {
            latexSource = target.dataset.equation;
        }
    }
    // MathJax detection
    else if (target.classList.contains('MathJax')) {
        const script = target.previousElementSibling;
        if (script && script.tagName === 'SCRIPT' && script.type.includes('math/tex')) {
            latexSource = script.textContent;
        }
    }
    // Gemini and modern AI chat interfaces - look for data attributes
    else if (target.dataset.latex) {
        latexSource = target.dataset.latex;
    }
    else if (target.dataset.math) {
        latexSource = target.dataset.math;
    }
    // Look for common class patterns
    else if (target.className && (
        (typeof target.className === 'string' && (
            target.className.includes('math') || 
            target.className.includes('latex') || 
            target.className.includes('equation')
        )) ||
        (target.classList && (
            target.classList.contains('math') || 
            target.classList.contains('latex') || 
            target.classList.contains('equation') ||
            Array.from(target.classList).some(cls => 
                cls.includes('math') || cls.includes('latex') || cls.includes('equation')
            )
        ))
    )) {
        // Try to find LaTeX source in various ways
        latexSource = findLatexInElement(target);
    }
    // Look for alt text or title attributes that might contain LaTeX
    else if (target.alt && target.alt.includes('\\')) {
        latexSource = extractCompleteLatex(target.alt);
    }
    else if (target.title && target.title.includes('\\')) {
        latexSource = extractCompleteLatex(target.title);
    }
    // Look for aria-label that might contain LaTeX
    else if (target.getAttribute('aria-label') && target.getAttribute('aria-label').includes('\\')) {
        latexSource = extractCompleteLatex(target.getAttribute('aria-label'));
    }
    // Special handling for images that might be LaTeX renders
    else if (target.tagName === 'IMG') {
        latexSource = findLatexInImage(target);
    }
    // Look for LaTeX in surrounding context
    else {
        latexSource = findLatexInContext(target);
    }

    // If we found LaTeX, try to get the complete expression
    if (latexSource) {
        // Try to expand the LaTeX to get the complete expression
        const completeLatex = expandLatexExpression(target, latexSource);
        if (completeLatex) {
            latexSource = completeLatex;
        }
        
        if (document.getElementById('latex-copier-overlay')) return;
        createOverlay(target, latexSource);
    }
});

// Function to find LaTeX source in various element types
function findLatexInElement(element) {
    let latex = '';
    
    // Check if element itself contains LaTeX-like content
    if (element.textContent && element.textContent.includes('\\')) {
        // Look for complete LaTeX expressions
        latex = extractCompleteLatex(element.textContent);
    }
    
    // Check for LaTeX in child elements
    if (!latex) {
        const mathElements = element.querySelectorAll('[class*="math"], [class*="latex"], [class*="equation"]');
        for (const mathEl of mathElements) {
            if (mathEl.dataset.latex) {
                latex = mathEl.dataset.latex;
                break;
            }
            if (mathEl.dataset.math) {
                latex = mathEl.dataset.math;
                break;
            }
            // Check if the element itself contains LaTeX
            if (mathEl.textContent && mathEl.textContent.includes('\\\\')) {
                const extracted = extractCompleteLatex(mathEl.textContent);
                if (extracted) {
                    latex = extracted;
                    break;
                }
            }
        }
    }
    
    // Check for LaTeX in script tags (common in MathJax)
    if (!latex) {
        const scripts = element.querySelectorAll('script[type*="math/tex"], script[type*="math/tex; mode=display"]');
        for (const script of scripts) {
            if (script.textContent && script.textContent.includes('\\')) {
                latex = script.textContent.trim();
                break;
            }
        }
    }
    
    return latex;
}

// Function to extract complete LaTeX expressions from text
function extractCompleteLatex(text) {
    let latex = '';
    
    // Remove extra whitespace and normalize
    text = text.trim().replace(/\s+/g, ' ');
    
    // Look for display math blocks first ($$...$$ or \[...\])
    const displayMathMatch = text.match(/\$\$([^$]+)\$\$|\\\[([^\]]+)\\\]/);
    if (displayMathMatch) {
        latex = displayMathMatch[1] || displayMathMatch[2];
        return latex.trim();
    }
    
    // Look for inline math ($...$ or \(...\))
    const inlineMathMatch = text.match(/\$([^$]+)\$|\\\(([^)]+)\\\)/);
    if (inlineMathMatch) {
        latex = inlineMathMatch[1] || inlineMathMatch[2];
        return latex.trim();
    }
    
    // Look for LaTeX commands with balanced braces
    const latexMatch = findBalancedLatex(text);
    if (latexMatch) {
        return latexMatch;
    }
    
    // Fallback: look for any LaTeX-like pattern
    const fallbackMatch = text.match(/\\[a-zA-Z]+(\{[^}]*\})*/);
    if (fallbackMatch) {
        return fallbackMatch[0];
    }
    
    return '';
}

// Function to find LaTeX with properly balanced braces
function findBalancedLatex(text) {
    let startIndex = text.indexOf('\\');
    if (startIndex === -1) return null;
    
    let latex = '';
    let braceCount = 0;
    let inCommand = false;
    let commandStart = startIndex;
    
    for (let i = startIndex; i < text.length; i++) {
        const char = text[i];
        
        if (char === '\\' && !inCommand) {
            // Start of a new LaTeX command
            inCommand = true;
            commandStart = i;
            latex = '';
            braceCount = 0;
        } else if (inCommand) {
            if (char === '{') {
                braceCount++;
            } else if (char === '}') {
                braceCount--;
                if (braceCount < 0) {
                    // Unbalanced closing brace, stop here
                    break;
                }
            } else if (char === '\\' && braceCount === 0) {
                // New command without braces, check if it's part of the same expression
                const nextChar = text[i + 1];
                if (nextChar && /[a-zA-Z]/.test(nextChar)) {
                    // Continue with the new command
                    continue;
                } else {
                    // End of LaTeX expression
                    break;
                }
            } else if (char === ' ' && braceCount === 0) {
                // Space outside braces, check if next character is LaTeX
                const nextChar = text[i + 1];
                if (nextChar === '\\') {
                    // Continue with next command
                    continue;
                } else {
                    // End of LaTeX expression
                    break;
                }
            }
            
            latex += char;
        }
    }
    
    // Clean up the extracted LaTeX
    if (latex) {
        latex = text.substring(commandStart, commandStart + latex.length + 1);
        return latex.trim();
    }
    
    return null;
}

// Function to find LaTeX in image context (for Gemini-style rendering)
function findLatexInImage(imgElement) {
    let latex = '';
    
    // Check alt text
    if (imgElement.alt && imgElement.alt.includes('\\')) {
        latex = extractCompleteLatex(imgElement.alt);
    }
    // Check title
    else if (imgElement.title && imgElement.title.includes('\\')) {
        latex = extractCompleteLatex(imgElement.title);
    }
    // Check aria-label
    else if (imgElement.getAttribute('aria-label') && imgElement.getAttribute('aria-label').includes('\\')) {
        latex = extractCompleteLatex(imgElement.getAttribute('aria-label'));
    }
    // Check data attributes
    else if (imgElement.dataset.latex) {
        latex = imgElement.dataset.latex;
    }
    else if (imgElement.dataset.math) {
        latex = imgElement.dataset.math;
    }
    // Check if image is inside a math container
    else {
        const mathContainer = imgElement.closest('[class*="math"], [class*="latex"], [class*="equation"]');
        if (mathContainer) {
            latex = findLatexInElement(mathContainer);
        }
    }
    
    return latex;
}

// Function to find LaTeX in surrounding context
function findLatexInContext(element) {
    let latex = '';
    
    // Check parent elements for LaTeX context
    let parent = element.parentElement;
    let depth = 0;
    const maxDepth = 5; // Limit search depth
    
    while (parent && depth < maxDepth) {
        // Check if parent has math-related classes
        if (parent.className && (
            parent.className.includes('math') || 
            parent.className.includes('latex') || 
            parent.className.includes('equation')
        )) {
            latex = findLatexInElement(parent);
            if (latex) break;
        }
        
        // Check for LaTeX in text content
        if (parent.textContent && parent.textContent.includes('\\')) {
            latex = extractCompleteLatex(parent.textContent);
            if (latex) break;
        }
        
        parent = parent.parentElement;
        depth++;
    }
    
    return latex;
}

// Enhanced detection for dynamic content (like Gemini)
function observeForLatex() {
    // Create a mutation observer to watch for new LaTeX content
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if the new node contains LaTeX
                        const latexElements = node.querySelectorAll && node.querySelectorAll('[class*="math"], [class*="latex"], [class*="equation"], [data-latex], [data-math], img, svg, canvas');
                        if (latexElements && latexElements.length > 0) {
                            // Add mouseover listeners to new elements
                            latexElements.forEach(function(el) {
                                if (!el.hasAttribute('data-latex-copier-initialized')) {
                                    el.setAttribute('data-latex-copier-initialized', 'true');
                                    el.addEventListener('mouseover', function(event) {
                                        const target = event.target.closest('[class*="math"], [class*="latex"], [class*="equation"], [data-latex], [data-math], img, svg, canvas');
                                        if (target) {
                                            let latexSource = findLatexInElement(target) || findLatexInImage(target) || findLatexInContext(target);
                                            if (latexSource && !document.getElementById('latex-copier-overlay')) {
                                                createOverlay(target, latexSource);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        });
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Initialize the observer when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeForLatex);
} else {
    observeForLatex();
}

// Additional initialization for pages that load content dynamically
window.addEventListener('load', function() {
    // Re-initialize after page load for dynamic content
    setTimeout(observeForLatex, 1000);
});

function createOverlay(element, latex) {
    const overlay = document.createElement('div');
    overlay.id = 'latex-copier-overlay';
    overlay.textContent = 'Copy LaTeX';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the click from bubbling up
        navigator.clipboard.writeText(latex).then(function() {
            overlay.textContent = 'Copied!';
            setTimeout(() => {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
            }, 1000);
        }).catch(function(err) {
            overlay.textContent = 'Error!';
            // Silently handle copy errors
        });
    });

    const rect = element.getBoundingClientRect();

    const targetCenterX = rect.left + rect.width / 2;
    const targetCenterY = rect.top + rect.height / 2;

    overlay.style.left = `${window.scrollX + targetCenterX - (overlay.offsetWidth / 2)}px`;
    overlay.style.top = `${window.scrollY + targetCenterY - (overlay.offsetHeight * 3/2)}px`;

    const handleMouseLeave = () => {
        setTimeout(() => {
            const overlayElement = document.getElementById('latex-copier-overlay');
            if (overlayElement && !overlayElement.matches(':hover') && !element.matches(':hover')) {
                 if (document.body.contains(overlayElement)) {
                    document.body.removeChild(overlayElement);
                }
            }
        }, 100);
    };

    element.addEventListener('mouseleave', handleMouseLeave);
    document.getElementById('latex-copier-overlay').addEventListener('mouseleave', handleMouseLeave);
}

// Function to expand LaTeX expression to get the complete formula
function expandLatexExpression(element, initialLatex) {
    // If the initial LaTeX is already complete, return it
    if (isCompleteLatex(initialLatex)) {
        return initialLatex;
    }
    
    // Try to find the complete expression in the element's context
    let completeLatex = '';
    
    // Check the element's text content for complete LaTeX
    if (element.textContent && element.textContent.includes('\\')) {
        completeLatex = extractCompleteLatex(element.textContent);
        if (completeLatex && isCompleteLatex(completeLatex)) {
            return completeLatex;
        }
    }
    
    // Check parent elements for complete LaTeX
    let parent = element.parentElement;
    let depth = 0;
    const maxDepth = 3;
    
    while (parent && depth < maxDepth) {
        if (parent.textContent && parent.textContent.includes('\\')) {
            completeLatex = extractCompleteLatex(parent.textContent);
            if (completeLatex && isCompleteLatex(completeLatex)) {
                return completeLatex;
            }
        }
        parent = parent.parentElement;
        depth++;
    }
    
    // Check sibling elements for complete LaTeX
    const siblings = element.parentElement ? element.parentElement.children : [];
    for (const sibling of siblings) {
        if (sibling !== element && sibling.textContent && sibling.textContent.includes('\\')) {
            completeLatex = extractCompleteLatex(sibling.textContent);
            if (completeLatex && isCompleteLatex(completeLatex)) {
                return completeLatex;
            }
        }
    }
    
    // If we still don't have complete LaTeX, return the initial
    return initialLatex;
}

// Function to check if LaTeX expression is complete
function isCompleteLatex(latex) {
    if (!latex) return false;
    
    // Check for balanced braces
    let braceCount = 0;
    let bracketCount = 0;
    let parenCount = 0;
    
    for (const char of latex) {
        if (char === '{') braceCount++;
        else if (char === '}') braceCount--;
        else if (char === '[') bracketCount++;
        else if (char === ']') bracketCount--;
        else if (char === '(') parenCount++;
        else if (char === ')') parenCount--;
    }
    
    // Check if all brackets are balanced
    if (braceCount !== 0 || bracketCount !== 0 || parenCount !== 0) {
        return false;
    }
    
    // Check if the expression ends with a proper LaTeX command
    const trimmed = latex.trim();
    if (trimmed.endsWith('\\')) {
        return false;
    }
    
    // Check if we have at least one complete LaTeX command
    const hasCommand = /\\[a-zA-Z]+/.test(trimmed);
    if (!hasCommand) {
        return false;
    }
    
    return true;
}