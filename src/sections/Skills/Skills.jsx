import { useEffect, useRef, useState } from "react";
import { removeLightBackground } from "../../utils/removeBg";
import "./Skills.css";

// Ek baar process hone wali images ka cache
const cache = new Map();

function PanelImage({ src, alt }) {
  const [url, setUrl] = useState(cache.get(src) || null);

  useEffect(() => {
    if (cache.has(src)) {
      setUrl(cache.get(src));
      return;
    }
    let alive = true;
    removeLightBackground(src)
      .then((u) => {
        cache.set(src, u);
        if (alive) setUrl(u);
      })
      .catch(() => alive && setUrl(src));
    return () => {
      alive = false;
    };
  }, [src]);

  return <img src={url || src} alt={alt} />;
}

const data = {
  label: "02 — SKILLS",
  title: "The periodic table",
  titleItalic: "of my stack.",
  intro: "Hover a tile to see it. Click a family to light it up.",
  families: [
    { name: "Languages", color: "#c9b27a" },
    { name: "Frontend", color: "#8fb3a0" },
    { name: "Backend", color: "#9aa7c7" },
    { name: "Tools", color: "#d9a58a" },
    { name: "AI", color: "#b8a6d9" },
  ],
  // tone: "dark" | "mid" | "light" → unlit tile ka shade
  tiles: [
    { sym: "C++", name: "C++", label: "Language", family: "Languages", tone: "dark", image: "/assets/c++.jpg" },
    { sym: "Py", name: "Python", label: "Language", family: "Languages", tone: "dark", image: "/assets/python.jpg" },
    { sym: "Js", name: "JavaScript", label: "Language", family: "Languages", tone: "dark", image: "/assets/javascript.jpg" },
    { sym: "Ts", name: "TypeScript", label: "Language", family: "Languages", tone: "dark", image: "/assets/typescript.jpg" },
    { sym: "Jv", name: "Java", label: "Language", family: "Languages", tone: "dark", image: "/assets/java.jpg" },
    { sym: "Re", name: "React", label: "Frontend", family: "Frontend", tone: "mid", image: "/assets/react.jpg" },
    { sym: "Ht", name: "HTML", label: "Frontend", family: "Frontend", tone: "mid", image: "/assets/html.jpg" },
    { sym: "Tw", name: "Tailwind", label: "Frontend", family: "Frontend", tone: "mid", image: "/assets/talwind.jpg" },
    { sym: "No", name: "Node.js", label: "Backend", family: "Backend", tone: "mid", image: "/assets/node.jpg" },
    { sym: "Ex", name: "Express", label: "Backend", family: "Backend", tone: "light", image: "/assets/express.jpg" },
    { sym: "Po", name: "PostgreSQL", label: "Database", family: "Backend", tone: "light", image: "/assets/SQL.jpg" },
    { sym: "Mg", name: "MongoDB", label: "Database", family: "Backend", tone: "light", image: "/assets/mongo.jpg" },
    { sym: "Gi", name: "Git", label: "Tool", family: "Tools", tone: "light", image: "/assets/git.jpg" },
    { sym: "Dk", name: "Docker", label: "Tool", family: "Tools", tone: "light", image: "/assets/docker.jpg" },
    { sym: "Sec", name: "Security", label: "Tool", family: "Tools", tone: "mid", image: "/assets/security.jpg" },
    { sym: "Cs", name: "CSS", label: "Frontend", family: "Frontend", tone: "dark", image: "/assets/css.jpg" },
    { sym: "K8s", name: "Kubernetes", label: "Tool", family: "Tools", tone: "light", image: "/assets/k.jpg" },
{ sym: "Aws", name: "AWS", label: "Cloud", family: "Tools", tone: "mid", image: "/assets/aws.jpg" },
{ sym: "LLM", name: "LLM", label: "AI", family: "AI", tone: "dark", image: "/assets/llm.jpg" },
{ sym: "RAG", name: "RAG", label: "AI", family: "AI", tone: "mid", image: "/assets/rag.jpg" },
{ sym: "ML", name: "AIML", label: "AI", family: "AI", tone: "dark", image: "/assets/ml.jpg" },
  ],
};

export default function Skills() {
  const [family, setFamily] = useState(null); 
  const [locked, setLocked] = useState(null); 
  const [hover, setHover] = useState(null);   
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const isLit = (t) => family === null || t.family === family;

  // Panel: click kiya hua tile, warna hover wala
  const shownIndex = locked !== null ? locked : hover;
  const shown = shownIndex !== null ? data.tiles[shownIndex] : null;

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="skills-head">
        <span className="skills-label">{data.label}</span>
        <h2>
          {data.title} <em>{data.titleItalic}</em>
        </h2>
        <p className="skills-intro">{data.intro}</p>

        <div className="skills-chips">
          {data.families.map((f) => (
            <button
              key={f.name}
              className={`chip ${family === f.name ? "on" : ""}`}
              onClick={() => {
                setFamily(family === f.name ? null : f.name);
                setLocked(null);
              }}
            >
              <span className="chip-dot" style={{ background: f.color }} />
              {f.name}
            </button>
          ))}
        </div>
      </div>

      <div className="skills-body">
        <div className="skills-grid">
          {data.tiles.map((t, i) => {
            const lit = isLit(t);
            const cls = [
              "tile",
              `tone-${t.tone}`,
              inView ? "show" : "",
              lit ? "lit" : "dim",
              locked === i ? "selected" : "",
            ].join(" ");

            return (
              <button
                key={t.sym + i}
                className={cls}
                style={{ transitionDelay: `${(i % 8) * 50 + Math.floor(i / 8) * 120}ms` }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setLocked(locked === i ? null : i)}
              >
                <span className="tile-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="tile-sym">{t.sym}</span>
                <span className="tile-name">{t.name}</span>
              </button>
            );
          })}
        </div>

        <aside className="skills-panel">
          {shown ? (
            <div className="panel-content" key={shownIndex}>
              <PanelImage src={shown.image} alt={shown.name} />
              <strong>{shown.name}</strong>
              <span>{shown.label}</span>
            </div>
          ) : (
            <p className="panel-hint">Hover any element to see its logo</p>
          )}
        </aside>
      </div>
    </section>
  );
}