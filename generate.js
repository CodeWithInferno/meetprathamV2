// fib-nested-inside.js
const fs = require("fs");

/**
 * Build an SVG where every Fibonacci square nests
 * INSIDE the largest one (right-to-left, top-down spiral).
 *
 * @param {number} n      how many Fibonacci terms (≥2)
 * @param {number} scale  multiplier in pixels
 */
function buildNestedSVG(n = 6, scale = 60) {
  // 1️⃣ Fibonacci list
  const fib = [1, 1];
  for (let i = 2; i < n; i++) fib[i] = fib[i - 1] + fib[i - 2];

  // 2️⃣ canvas is the biggest square
  const big = fib[n - 1] * scale;
  const tiles = [];
  let x = 0,               // insert point
      y = 0,
      dir = 0;             // 0 = →, 1 = ↑, 2 = ←, 3 = ↓

  // 3️⃣ walk the sequence *from large→small*
  for (let i = n - 1; i >= 0; i--) {
    const size = fib[i] * scale;
    tiles.push({ x, y, size });

    // update insert point for the next smaller square
    if      (dir === 0) { x += size;           dir = 1; } // attach at right, next go up
    else if (dir === 1) { y += size;           dir = 2; } // top → left
    else if (dir === 2) { x -= size;           dir = 3; } // left → down
    else if (dir === 3) { y -= size;           dir = 0; } // bottom → right
  }

  // 4️⃣ SVG rectangles
  const rects = tiles.map(({ x, y, size }) => `
    <rect x="${x}" y="${y}" width="${size}" height="${size}"
          fill="none" stroke="#666" stroke-width="2" />
  `).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="${big}" height="${big}" viewBox="0 0 ${big} ${big}">
  <rect width="${big}" height="${big}" fill="#000"/>
  ${rects}
</svg>`;
}

// write it
fs.writeFileSync("fib_boxes_nested.svg", buildNestedSVG(8, 50));
console.log("✅ fib_boxes_nested.svg written");
