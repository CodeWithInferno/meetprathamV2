// src/components/FibonacciSpiral.jsx
'use client';

import React, { useRef, useEffect } from 'react';

export default function FibonacciSpiral({
  count = 8,        // how many squares/arcs
  scale = 20,       // pixels per Fibonacci unit
  mirror = true,    // flip horizontally so tip ends on the left
  strokeColor = '#888',
  strokeWidth = 2,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // 1) build fib sequence
    const fib = [1, 1];
    for (let i = 2; i < count; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
    }

    // 2) tile squares & collect arc params
    let x = 0, y = 0, dir = 0;
    const tiles = [];
    for (let i = 0; i < count; i++) {
      const size = fib[i] * scale;
      tiles.push({ x, y, size, dir });
      if (dir === 0) x += size;
      else if (dir === 1) y -= size;
      else if (dir === 2) x -= size;
      else y += size;
      dir = (dir + 1) % 4;
    }

    // 3) compute bounding box
    const xs = tiles.flatMap(t => [t.x, t.x + t.size]);
    const ys = tiles.flatMap(t => [t.y, t.y + t.size]);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const W = maxX - minX, H = maxY - minY;

    // 4) size canvas
    canvas.width = W;
    canvas.height = H;

    // 5) fill black background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    // 6) prepare stroke
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.beginPath();

    // optional mirror
    if (mirror) {
      ctx.translate(W, 0);
      ctx.scale(-1, 1);
    }

    // 7) draw each quarter-circle
    tiles.forEach(({ x, y, size, dir }) => {
      // map tile coords into positive canvas coords
      const tx = x - minX;
      const ty = y - minY;

      let sx, sy, ex, ey;
      if (dir === 0)      { sx = tx;        sy = ty + size;  ex = tx + size; ey = ty;        }
      else if (dir === 1) { sx = tx + size; sy = ty + size;  ex = tx;        ey = ty;        }
      else if (dir === 2) { sx = tx + size; sy = ty;         ex = tx;        ey = ty + size; }
      else                { sx = tx;        sy = ty;         ex = tx + size; ey = ty + size; }

      // move to start, then draw arc
      ctx.moveTo(sx, sy);
      ctx.arcTo(sx, sy - size, ex, ey, size);
    });

    ctx.stroke();
  }, [count, scale, mirror, strokeColor, strokeWidth]);

  return <canvas ref={canvasRef} className="block w-full h-auto" />;
}
