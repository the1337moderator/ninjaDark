// Check if a color has significant color (not near grayscale)
function hasSignificantColor(color, threshold = 30) {
  const rgb = color.match(/\d+/g);
  if (!rgb || rgb.length < 3) return false;
  
  const r = parseInt(rgb[0]);
  const g = parseInt(rgb[1]);
  const b = parseInt(rgb[2]);
  
  // Calculate max difference between RGB values
  const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
  
  return maxDiff > threshold;
}

// Process element - invert if grayscale, preserve if colorful
function processElement(element) {
  // Double-invert images and media to restore them
  if (element.tagName === 'IMG' || element.tagName === 'VIDEO' || 
      element.tagName === 'PICTURE' || element.tagName === 'CANVAS' || 
      element.tagName === 'IFRAME') {
    element.style.setProperty('filter', 'invert(1) hue-rotate(180deg)', 'important');
    return;
  }
  
  // Check ORIGINAL colors before any inversion
  const computed = window.getComputedStyle(element);
  const bgColor = computed.backgroundColor;
  
  // If background is colorful (not grayscale), don't invert
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && hasSignificantColor(bgColor)) {
    // Don't apply filter - keep original colors
    return;
  }
  
  // Otherwise, element is grayscale - invert it
  element.style.setProperty('filter', 'invert(1) hue-rotate(180deg)', 'important');
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
