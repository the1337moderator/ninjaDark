// Check if background color is grayscale (R=G=B)
function isGrayscale(color) {
  const rgb = color.match(/\d+/g);
  if (!rgb || rgb.length < 3) return false;
  
  const r = parseInt(rgb[0]);
  const g = parseInt(rgb[1]);
  const b = parseInt(rgb[2]);
  
  return r === g && g === b;
}

// Remove filter from elements with non-grayscale backgrounds
function processElement(element) {
  const computed = window.getComputedStyle(element);
  const bgColor = computed.backgroundColor;
  
  // If element has a non-grayscale background, remove filter
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && !isGrayscale(bgColor)) {
    element.style.setProperty('filter', 'none', 'important');
  }
}

// Process all elements
function processAllElements() {
  const elements = document.querySelectorAll('*');
  elements.forEach(processElement);
}

// Initial run
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', processAllElements);
} else {
  processAllElements();
}

// Watch for DOM changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) {
        processElement(node);
        node.querySelectorAll('*').forEach(processElement);
      }
    });
  });
});

// Start observing once body is available
if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}
