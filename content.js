// Check if a color is close to grayscale (within threshold)
function isNearGrayscale(color, threshold = 10) {
  const rgb = color.match(/\d+/g);
  if (!rgb || rgb.length < 3) return false;
  
  const r = parseInt(rgb[0]);
  const g = parseInt(rgb[1]);
  const b = parseInt(rgb[2]);
  
  // Calculate max difference between RGB values
  const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
  
  return maxDiff <= threshold;
}

// Invert a color
function invertColor(color) {
  const rgb = color.match(/\d+/g);
  if (!rgb || rgb.length < 3) return color;
  
  const r = parseInt(rgb[0]);
  const g = parseInt(rgb[1]);
  const b = parseInt(rgb[2]);
  const inverted = [255 - r, 255 - g, 255 - b];
  const alpha = rgb[3] ? `, ${rgb[3]}` : '';
  
  return rgb.length === 4 
    ? `rgba(${inverted[0]}, ${inverted[1]}, ${inverted[2]}${alpha})`
    : `rgb(${inverted[0]}, ${inverted[1]}, ${inverted[2]})`;
}

// Process an element's colors
function processElement(element) {
  const computed = window.getComputedStyle(element);
  
  // Process text color
  const color = computed.color;
  if (color && color !== 'rgba(0, 0, 0, 0)' && isNearGrayscale(color)) {
    element.style.setProperty('color', invertColor(color), 'important');
  }
  
  // Process background color
  const bgColor = computed.backgroundColor;
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && isNearGrayscale(bgColor)) {
    element.style.setProperty('background-color', invertColor(bgColor), 'important');
  }
  
  // Process border color
  const borderColor = computed.borderColor;
  if (borderColor && borderColor !== 'rgba(0, 0, 0, 0)' && isNearGrayscale(borderColor)) {
    element.style.setProperty('border-color', invertColor(borderColor), 'important');
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
