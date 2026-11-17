import { useEffect, useRef, useState } from "react";
import "./Education.css";

const data = {
  label: "04 — EXPERIENCE",
  title: "Education &",
  titleItalic: "experience.",
  timeline: [
    {
      year: "2024",
      tag: "EDUCATION",
      title: "B.Tech in Computer Science",
      org: "Jai Narain College of Technology",
      desc: "Pursuing B.Tech in CSE, focused on web development, cybersecurity and building real projects.",
      badge: "CSE",
      bullets: ["Web development and cybersecurity", "Building real-world projects"],
    },
    {
      year: "2025",
      tag: "LEARNING",
      title: "HTML & CSS",
      org: "Self-learning",
      desc: "Learned the foundations of web structure and styling, then started building responsive pages.",
      bullets: ["Semantic HTML", "Responsive layouts with CSS"],
    },
    {
      year: "2026",
      tag: "COURSE",
      title: "Full Stack Web Development",
      org: "Completed",
      desc: "React, databases, PostgreSQL, Docker, Kubernetes and advanced web technologies.",
      bullets: ["React and frontend architecture", "PostgreSQL, Docker and Kubernetes"],
    },
    {
      year: "2026",
      tag: "PROJECTS",
      title: "Built multiple websites",
      org: "Self-driven",
      desc: "Designed and deployed several full stack projects, from frontend to backend and database.",
      bullets: ["Frontend to database end to end", "Deployment and real use cases"],
    },
  ],
  openTo: {
    title: "Open to internship",
    desc: "Looking for an internship where I can work on real products and keep growing as a full stack developer.",
    cta: "Let's talk",
    href: "#contact",
  },
};

// Screen par aane par true, screen se bahar jaane par false
function useReveal(threshold = 0.3) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setShown(e.isIntersecting);
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, shown];
}

function TimelineItem({ item, index }) {
  const [ref, shown] = useReveal();
  const left = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`tl-row ${left ? "card-left" : "card-right"} ${shown ? "shown" : ""}`}
    >
      <div className="tl-card clay">
        <span className="tl-tag">{item.tag}</span>
        {item.badge && <span className="tl-badge">{item.badge}</span>}
        <h3>{item.title}</h3>
        <p className="tl-org">{item.org}</p>
        <p className="tl-desc">{item.desc}</p>
        <ul className="tl-bullets">
          {item.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="tl-center">
        <span className="tl-dot" />
      </div>

      <div className="tl-year">{item.year}</div>
    </div>
  );
}

export default function Education() {
  const [ref, shown] = useReveal(0.4);

  return (
    <section className="edu" id="education">
      <div className="edu-head">
        <span className="edu-label">{data.label}</span>
        <h2>
          {data.title} <em>{data.titleItalic}</em>
        </h2>
      </div>

      <div className="timeline">
        <span className="tl-line" />

        {data.timeline.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}

        <div ref={ref} className={`tl-row card-left last ${shown ? "shown" : ""}`}>
          <aside className="clay open-card">
            <span className="open-badge">● Available</span>
            <h3>{data.openTo.title}</h3>
            <p>{data.openTo.desc}</p>
            <a href={data.openTo.href} className="open-btn">
              {data.openTo.cta} ↗
            </a>
          </aside>
          <div className="tl-center">
            <span className="tl-dot" />
          </div>
          <div />
        </div>
      </div>
    </section>
  );
}