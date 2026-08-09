'use client';

import { useEffect, useState } from 'react';

// Counts once per browser session, then shows whatever the server says the
// total actually is. The digits are never invented — if the count can't be
// read, the counter shows that instead of a plausible number.
export default function HitCounter({ initial }) {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    if (sessionStorage.getItem('counted-writing') === '1') return;
    sessionStorage.setItem('counted-writing', '1');
    fetch('/api/hit', { method: 'POST' })
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.pageviews === 'number') setCount(d.pageviews);
      })
      .catch(() => {});
  }, []);

  return (
    <span className="w1-counter">
      {typeof count === 'number' ? String(count).padStart(6, '0') : '------'}
    </span>
  );
}
