'use client';

import { useEffect, useRef } from 'react';
import AudioMotionAnalyzer from 'audiomotion-analyzer';

function MutedVisualizer() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const analyser = new AudioMotionAnalyzer(wrapRef.current, {
      mode: 10,
      gradient: 'prism',
      bgAlpha: 0,
      alphaBars: true,
      overlay: true,
      connectSpeakers: false,
      showScaleX: false,
      showScaleY: false,
    });

    const audio = new Audio('/Audio/track.wav');
    audio.loop = true;
    audio.volume = 0;
    audio.crossOrigin = 'anonymous';

    const ready = () => {
      const src = analyser.audioCtx.createMediaElementSource(audio);
      analyser.connectInput(src);
      audio.play();
    };

    audio.addEventListener('canplay', ready);
    audio.load();

    return () => {
      audio.removeEventListener('canplay', ready);
      audio.pause();
      analyser.destroy();
    };
  }, []);

  return <div ref={wrapRef} className="absolute inset-0 pointer-events-none mix-blend-screen" />;
}