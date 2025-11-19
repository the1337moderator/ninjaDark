// Invert only grayscale colors (where R=G=B)
function invertGrayscale(color) {
  const rgb = color.match(/\d+/g);
  if (!rgb || rgb.length < 3) return color;
  
  const r = parseInt(rgb[0]);
  const g = parseInt(rgb[1]);
  const b = parseInt(rgb[2]);
  
  // Only invert if it's true grayscale (R=G=B)
  if (r === g && g === b) {
    const inverted = 255 - r;
    const alpha = rgb[3] ? `, ${rgb[3]}` : '';
    return rgb.length === 4 
      ? `rgba(${inverted}, ${inverted}, ${inverted}${alpha})`
      : `rgb(${inverted}, ${inverted}, ${inverted})`;
  }
  
  return color;
}

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

function processElement(element) {
  const computed = window.getComputedStyle(element);
  
  // Process color properties
  const color = computed.color;
  const bgColor = computed.backgroundColor;
  const borderColor = computed.borderColor;
  
  // Always invert text color (force with !important to override inline styles)
  if (color && color !== 'rgba(0, 0, 0, 0)') {
    const inverted = invertColor(color);
    element.style.setProperty('color', inverted, 'important');
  }
  
  // Only invert background if grayscale
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
    const inverted = invertGrayscale(bgColor);
    if (inverted !== bgColor) {
      element.style.setProperty('background-color', inverted, 'important');
    }
  }
  
  // Always invert border color
  if (borderColor && borderColor !== 'rgba(0, 0, 0, 0)') {
    const inverted = invertColor(borderColor);
    element.style.setProperty('border-color', inverted, 'important');
  }
}

// Process all elements
function invertAllGrayscale() {
  const elements = document.querySelectorAll('*');
  elements.forEach(processElement);
}

// Initial run
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', invertAllGrayscale);
} else {
  invertAllGrayscale();
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
