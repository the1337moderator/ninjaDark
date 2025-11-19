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

function processElement(element) {
  const computed = window.getComputedStyle(element);
  
  // Process color properties
  const color = computed.color;
  const bgColor = computed.backgroundColor;
  const borderColor = computed.borderColor;
  
  if (color && color !== 'rgba(0, 0, 0, 0)') {
    const inverted = invertGrayscale(color);
    if (inverted !== color) {
      element.style.color = inverted;
    }
  }
  
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
    const inverted = invertGrayscale(bgColor);
    if (inverted !== bgColor) {
      element.style.backgroundColor = inverted;
    }
  }
  
  if (borderColor && borderColor !== 'rgba(0, 0, 0, 0)') {
    const inverted = invertGrayscale(borderColor);
    if (inverted !== borderColor) {
      element.style.borderColor = inverted;
    }
  }
}

// Process all elements
function invertAllGrayscale() {
  const elements = document.querySelectorAll('*');
  elements.forEach(processElement);
}

// Initial run
invertAllGrayscale();

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

observer.observe(document.body, {
  childList: true,
  subtree: true
});
