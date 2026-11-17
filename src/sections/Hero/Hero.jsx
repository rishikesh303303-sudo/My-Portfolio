import { useEffect, useRef, useState } from "react";
import "./Hero.css";

const data = {
  name: "RISHIKESH",
  headline: ["Full Stack", "Developer"],
  tagline: "I build secure, scalable web applications.",
  watermark: "RISHIKESH",
  video: "/assets/character.mp4",
  keyThreshold: 18,  // isse kam difference wale pixel transparent honge
  keyFeather: 14,    // edges ko smooth karne ke liye
  canvasWidth: 420,  // canvas ki width
};

function KeyedCharacter({ src, threshold, feather, canvasWidth }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  // Video ke play/pause state ko UI se sync rakhna
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  // Mute state ko video par lagana
  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = muted;
  }, [muted]);

  // Canvas par background hatane wala loop
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    let bg = null;
    let raf;

    const onMeta = () => {
      canvas.width = canvasWidth;
      canvas.height = Math.round(
        (canvasWidth * video.videoHeight) / video.videoWidth
      );
    };
    video.addEventListener("loadedmetadata", onMeta);

    const loop = () => {
      if (video.readyState >= 2 && canvas.width > 0) {
        const w = canvas.width;
        const h = canvas.height;
        ctx.drawImage(video, 0, 0, w, h);
        const frame = ctx.getImageData(0, 0, w, h);
        const d = frame.data;

        // Pehle frame ke corner se background ka rang lo
        if (!bg) {
          let r = 0, g = 0, b = 0, n = 0;
          for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 6; x++) {
              const i = (y * w + x) * 4;
              r += d[i]; g += d[i + 1]; b += d[i + 2]; n++;
            }
          }
          bg = [r / n, g / n, b / n];
        }

        for (let i = 0; i < d.length; i += 4) {
          const dr = d[i] - bg[0];
          const dg = d[i + 1] - bg[1];
          const db = d[i + 2] - bg[2];
          const dist = Math.sqrt(dr * dr + dg * dg + db * db);

          if (dist < threshold) {
            d[i + 3] = 0;
          } else if (dist < threshold + feather) {
            d[i + 3] = ((dist - threshold) / feather) * 255;
          }
        }

        ctx.putImageData(frame, 0, 0);
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    video.play().catch(() => setPlaying(false));

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [threshold, feather, canvasWidth]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const toggleSound = () => setMuted((m) => !m);

  return (
    <div className="hero-character">
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        preload="auto"
        className="hero-video-src"
      />
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-controls">
        <button
          className="clay-btn"
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <button
          className="clay-btn"
          onClick={toggleSound}
          aria-label={muted ? "Sound on" : "Sound off"}
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <span className="hero-watermark">{data.watermark}</span>

      <KeyedCharacter
        src={data.video}
        threshold={data.keyThreshold}
        feather={data.keyFeather}
        canvasWidth={data.canvasWidth}
      />

      <div className="hero-text">
        <p className="hero-eyebrow">{data.name}</p>
        <h1>
          {data.headline.map((line) => (
            <span key={line} className="hero-line">
              {line}
            </span>
          ))}
        </h1>
        <p className="hero-tagline">{data.tagline}</p>
      </div>
    </section>
  );
}