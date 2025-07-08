'use client';
import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const circle = document.getElementById('cursor-circle');
    const interactiveEls = document.querySelectorAll('a, button');

    function move(e) {
      circle.style.top = `${e.clientY}px`;
      circle.style.left = `${e.clientX}px`;
    }

    function enlarge() {
      circle.classList.add('enlarged');
    }

    function shrink() {
      circle.classList.remove('enlarged');
    }

    document.addEventListener('mousemove', move);
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', enlarge);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', enlarge);
        el.removeEventListener('mouseleave', shrink);
      });
    };
  }, []);

  return null;
}
