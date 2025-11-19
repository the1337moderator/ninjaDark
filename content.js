// Check if a color has significant color (not near grayscale)
function hasSignificantColor(color, threshold = 10) {
  const rgb = color.match(/\d+/g);
  if (!rgb || rgb.length < 3) return false;
  
  const r = parseInt(rgb[0]);
  const g = parseInt(rgb[1]);
  const b = parseInt(rgb[2]);
  
  // Calculate max difference between RGB values
  const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
  
  return maxDiff > threshold;
}

// Check if element has colorful styling
function hasColorfulStyling(element) {
  const computed = window.getComputedStyle(element);
  
  // Check text color
  const color = computed.color;
  if (color && color !== 'rgba(0, 0, 0, 0)' && hasSignificantColor(color)) {
    return true;
  }
  
  // Check background color
  const bgColor = computed.backgroundColor;
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && hasSignificantColor(bgColor)) {
    return true;
  }
  
  // Check border color
  const borderColor = computed.borderColor;
  if (borderColor && borderColor !== 'rgba(0, 0, 0, 0)' && hasSignificantColor(borderColor)) {
    return true;
  }
  
  return false;
}

// Remove inversion from colorful elements
function processElement(element) {
  // Skip images and media
  if (element.tagName === 'IMG' || element.tagName === 'VIDEO' || 
      element.tagName === 'PICTURE' || element.tagName === 'CANVAS' || 
      element.tagName === 'IFRAME' || element.tagName === 'SVG') {
    element.style.setProperty('filter', 'invert(1) hue-rotate(180deg)', 'important');
    return;
  }
  
  // If element has colorful styling, remove the inversion
  if (hasColorfulStyling(element)) {
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
