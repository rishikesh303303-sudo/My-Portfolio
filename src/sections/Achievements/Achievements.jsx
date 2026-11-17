import { useEffect, useRef, useState } from "react";
import "./Achievements.css";
import { removeLightBackground } from "../../utils/removeBg";


const data = {
  label: "05 — ACHIEVEMENTS",
  title: "Proud",
  titleItalic: "moments.",
  stats: [
    {
      value: 100,
      suffix: "+",
      label: "Bookings completed",
      sub: "Reserve Your Kashi Boat",
      image: "/assets/ticket.jpg",
      big: true,
    },
    {
      value: 10,
      prefix: "Top ",
      suffix: "",
      label: "Qualified in Tech Expo",
      sub: "IIT Guwahati, offline project showcase",
      image: "/assets/trophy.jpg",
    },
    {
     
  value: 5,
  suffix: "+",
  label: "Hackathons Finalist",
  sub: "Attended several, including finals",
  image: "/assets/code.jpg",
},
    {
      value: 40,
      suffix: "%",
      label: "DSA sheet completed",
      sub: "Data Structures & Algorithms",
      progress: 40,
      image: "/assets/graph.jpg",
    },
  ],
};

function CountUp({ value, prefix = "", suffix = "", duration = 1400 }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = null;

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    };

    const io = new IntersectionObserver(
      ([e]) => {
        stop();
        if (!e.isIntersecting) {
          // Screen se bahar: 0 par reset, taaki wapas aane par phir count ho
          setN(0);
          return;
        }
        // Screen par aaya: shuru se count karo
        setN(0);
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

export default function Achievements() {
  const [ref, shown] = useRevealAll();

  return (
    <section className="ach" id="achievements">
      <div className="ach-head">
        <span className="ach-label">{data.label}</span>
        <h2>
          {data.title} <em>{data.titleItalic}</em>
        </h2>
      </div>

      <div ref={ref} className={`ach-grid ${shown ? "shown" : ""}`}>
        {data.stats.map((s, i) => (
          <article
            key={s.label}
            className={`clay ach-card ${s.big ? "big" : ""}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <div className="ach-top">
              <img src={s.image} alt="" className="ach-icon" />
              <span className="ach-tag">{s.sub}</span>
            </div>

            <div className="ach-num">
              {s.placeholder ? (
                s.placeholder
              ) : (
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              )}
            </div>

            <p className="ach-label-text">{s.label}</p>

            {s.progress !== undefined && (
              <div className="ach-bar">
                <i style={{ width: `${s.progress}%` }} />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

// Grid ek saath reveal ho, aur bahar jaane par chhup jaaye
function useRevealAll() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShown(e.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, shown];
}