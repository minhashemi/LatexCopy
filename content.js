document.addEventListener('mouseover', function(event) {
    const target = event.target.closest('.MathJax, .katex');

    if (!target) {
        return;
    }

    let latexSource = null; // Use null to indicate "not found yet"

    // --- Logic for KaTeX sites ---
    if (target.classList.contains('katex')) {

        // Method 1: Check for the standard annotation tag (for ChatGPT, etc.)
        const annotation = target.querySelector('annotation[encoding="application/x-tex"]');
        if (annotation) {
            latexSource = annotation.textContent;
        }

        // TODO: We will add one more check here for Gemini once we find the attribute name.
        // For example, if the attribute is named 'data-latex', we will add:
        // else if (target.dataset.latex) {
        //     latexSource = target.dataset.latex;
        // }

    }
    // --- Logic for MathJax sites ---
    else if (target.classList.contains('MathJax')) {
        const script = target.previousElementSibling;
        if (script && script.tagName === 'SCRIPT' && script.type.includes('math/tex')) {
            latexSource = script.textContent;
        }
    }

    // If we found the source code, create the overlay
    if (latexSource) {
        if (document.getElementById('latex-copier-overlay')) return;
        createOverlay(target, latexSource);
    }
});

function createOverlay(element, latex) {
    const overlay = document.createElement('div');
    overlay.id = 'latex-copier-overlay';
    overlay.textContent = 'Copy LaTeX';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function() {
        navigator.clipboard.writeText(latex).then(function() {
            overlay.textContent = 'Copied!';
            setTimeout(() => {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
            }, 1000);
        }).catch(function(err) {
            overlay.textContent = 'Error!';
            console.error('Could not copy text: ', err);
        });
    });

    const rect = element.getBoundingClientRect();
    overlay.style.left = `${rect.left + window.scrollX}px`;
    overlay.style.top = `${rect.top + window.scrollY - overlay.offsetHeight - 5}px`;

    const handleMouseLeave = () => {
        setTimeout(() => {
            if (!overlay.matches(':hover') && !element.matches(':hover')) {
                 if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
            }
        }, 100);
    };

    element.addEventListener('mouseleave', handleMouseLeave);
    overlay.addEventListener('mouseleave', handleMouseLeave);
}