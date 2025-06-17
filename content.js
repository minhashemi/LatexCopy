document.addEventListener('mouseover', function(event) {
    const target = event.target.closest('.MathJax, .katex');

    if (!target) {
        return;
    }

    let latexSource = '';

    if (target.classList.contains('katex')) {
        // standard annotation
        const annotation = target.querySelector('.katex-mathml annotation[encoding="application/x-tex"]');
        if (annotation) {
            latexSource = annotation.textContent;
        }
        // 'data-equation'
        else if (target.dataset.equation) {
            latexSource = target.dataset.equation;
        }
    }
    // MathJax
    else if (target.classList.contains('MathJax')) {
        const script = target.previousElementSibling;
        if (script && script.tagName === 'SCRIPT' && script.type.includes('math/tex')) {
            latexSource = script.textContent;
        }
    }

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
            console.error('Could not copy text: ', err);
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