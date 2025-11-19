// Store original colors before CSS inversion
const originalColors = new WeakMap();

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

// Capture original colors before CSS inversion happens
function captureOriginalColors() {
  // Temporarily disable the CSS filter to read original colors
  document.documentElement.style.filter = 'none';
  
  const elements = document.querySelectorAll('*');
  elements.forEach(element => {
    const computed = window.getComputedStyle(element);
    const bgColor = computed.backgroundColor;
    
    // Store if element has colorful background
    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && hasSignificantColor(bgColor)) {
      originalColors.set(element, { hasColorfulBg: true });
    }
  });
  
  // Re-enable the CSS filter
  document.documentElement.style.filter = '';
}

// Process elements after CSS inversion
function processElement(element) {
  // Double-invert images and media to restore them
  if (element.tagName === 'IMG' || element.tagName === 'VIDEO' || 
      element.tagName === 'PICTURE' || element.tagName === 'CANVAS' || 
      element.tagName === 'IFRAME') {
    element.style.setProperty('filter', 'invert(1) hue-rotate(180deg)', 'important');
    return;
  }
  
  // If element originally had colorful background, revert the inversion
  const colorData = originalColors.get(element);
  if (colorData && colorData.hasColorfulBg) {
    element.style.setProperty('filter', 'invert(1) hue-rotate(180deg)', 'important');
  }
}

// Process all elements
function processAllElements() {
  const elements = document.querySelectorAll('*');
  elements.forEach(processElement);
}

// Initial run - capture then process
function init() {
  captureOriginalColors();
  processAllElements();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Watch for DOM changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) {
        // Capture original color for new node
        const computed = window.getComputedStyle(node);
        const bgColor = computed.backgroundColor;
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && hasSignificantColor(bgColor)) {
          originalColors.set(node, { hasColorfulBg: true });
        }
        
        processElement(node);
        node.querySelectorAll('*').forEach(child => {
          const childComputed = window.getComputedStyle(child);
          const childBgColor = childComputed.backgroundColor;
          if (childBgColor && childBgColor !== 'rgba(0, 0, 0, 0)' && hasSignificantColor(childBgColor)) {
            originalColors.set(child, { hasColorfulBg: true });
          }
          processElement(child);
        });
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
