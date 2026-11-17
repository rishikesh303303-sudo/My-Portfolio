import { useEffect, useState } from "react";
import "./ImageStack.css";

export default function ImageStack({ images, alt = "", autoPlay = true, interval = 3500 }) {
  // order[0] sabse upar wali card ka index hai
  const [order, setOrder] = useState(() => images.map((_, i) => i));

  const next = () => setOrder((o) => [...o.slice(1), o[0]]);

  useEffect(() => {
    if (!autoPlay || images.length < 2) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [autoPlay, interval, images.length]);

  return (
    <div className="stack" onClick={next} role="button" tabIndex={0} aria-label="Next image">
      {order.map((imgIndex, pos) => {
        const style = {
          transform: `translate(${pos * 12}px, ${-pos * 8}px) rotate(${pos * -2.5}deg) scale(${1 - pos * 0.03})`,
          zIndex: order.length - pos,
          opacity: pos > 4 ? 0 : 1,
        };
        return (
          <div key={imgIndex} className="stack-card" style={style}>
            <img src={images[imgIndex]} alt={`${alt} ${imgIndex + 1}`} />
          </div>
        );
      })}

      <div className="stack-dots">
        {images.map((_, i) => (
          <span key={i} className={i === order[0] ? "on" : ""} />
        ))}
      </div>
    </div>
  );
}