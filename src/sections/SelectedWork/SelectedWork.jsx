import { useState } from "react";
import "./SelectedWork.css";
import ImageStack from "../../components/ImageStack/ImageStack";

const data = {
  label: "03 — SELECTED WORK",
  title: "Things I've",
  titleItalic: "built.",
  projects: [
    {
      name: "RoadWatch",
      category: "Civic Tech · Web",
      description:
        "Citizens upload road damage photos, which go straight to the government. The complaint is then tracked until the road is repaired.",
      features: [
        "Photo upload with location tagging",
        "AI verification using Gemini API",
        "Supabase database for complaint tracking",
        "Built-in AI chatbot for citizens",
      ],
      tech: ["React", "Supabase", "Gemini API", "JPI API"],
      images: [
        "/assets/roadwatch1.jpg",
        "/assets/roadwatch2.jpg",
        "/assets/roadwatch3.jpg",
      ],
      github: "https://github.com/rishikesh303303-sudo/Roadwatch",
      link: "https://roadwatch-opal.vercel.app/",
    },
    {
      name: "Reserve Your Kashi Boat",
      category: "Booking · Web",
      description:
        "An online platform for booking boards and seats, built with plain HTML and CSS.",
      features: ["Online booking flow", "Responsive layout", "Simple, fast interface"],
      tech: ["HTML", "CSS"],
      images: [
        "/assets/kashiboat1.jpg",
        "/assets/kashiboat2.jpg",
        "/assets/kashiboat3.jpg",
      ],
      github: "#",
      link: "https://reserveyourkashiboat.com/",
    },
    {
      name: "HackMate",
      category: "Discovery · Web",
      description:
        "A place to find online hackathons and discover events that match your interests.",
      features: ["Hackathon search and listing", "Clean component-based UI"],
      tech: ["React"],
      images: [
        "/assets/hackmate-1.jpg",
        "/assets/hackmate-2.jpg",
        "/assets/hackmate-3.jpg",
      ],
      github: "https://github.com/rishikesh303303-sudo/HackMate",
      link: "https://hack-mate-nine.vercel.app/",
    },
    {
      name: "Divya Drishti",
      category: "Security · Web",
      description:
        "A system that detects and catches Bitcoin fraud by analysing suspicious transactions.",
      features: ["Fraud pattern detection", "FastAPI backend", "React dashboard"],
      tech: ["React", "Python", "FastAPI"],
      images: [
        "/assets/divya-drishti-1.jpg",
        "/assets/divya-drishti-2.jpg",
        "/assets/divya-drishti-3.jpg",
      ],
      github: "#",
      link: "https://divya-drishti-seven.vercel.app/",
    },
    {
      name: "Drishti",
      category: "Prediction · Web",
      description:
        "A prediction app that forecasts where the money will be withdrawn from.",
      features: ["Withdrawal location prediction", "FastAPI backend", "React frontend"],
      tech: ["React", "FastAPI"],
      images: [
        "/assets/drishti-1.jpg",
        "/assets/drishti-2.jpg",
        "/assets/drishti-3.jpg",
      ],
      github: "#",
      link: "https://drishti-lake-eta.vercel.app/",
    },
    {
      name: "Rikal AI",
      category: "AI · Chatbot",
      description:
        "A study chatbot using RAG, where students can ask questions over their exam papers and notes.",
      features: ["RAG over your own documents", "Study-focused answers"],
      tech: ["RAG", "Python", "LLM"],
      images: [
        "/assets/recall-ai-1.jpg",
        "/assets/recall-ai-2.jpg",
        "/assets/recall-ai-3.jpg",
      ],
      github: "#",
      link: "#",
    },
    {
      name: "The City Guide",
      category: "Travel · Web",
      description:
        "Discover local prices, famous food, restaurants and tourist places in your city, and book a guide.",
      features: ["Local food and restaurant listings", "Tourist places", "Guide booking"],
      tech: ["HTML", "CSS", "JavaScript"],
      images: [
        "/assets/cityguide1.jpg",
        "/assets/cityguide2.jpg",
        "/assets/cityguide3.jpg",
        "/assets/cityguide4.jpg",
      ],
      github: "#",
      link: "https://city-guide-xxk1.vercel.app/",
    },
    {
      name: "Jarvis",
      category: "Voice · Assistant",
      description: "A voice assistant that responds to spoken commands.",
      features: ["Voice command handling", "FastAPI backend"],
      tech: ["Python", "FastAPI"],
      images: [
        "/assets/jarvis-1.jpg",
        "/assets/jarvis-2.jpg",
        "/assets/jarvis-3.jpg",
      ],
      github: "#",
      link: "#",
    },
    {
      name: "Hand Control",
      category: "Computer Vision · Tool",
      description:
        "Control your laptop with hand gestures, using your webcam to track your hand movements.",
      features: ["Hand gesture tracking", "Laptop control from gestures"],
      tech: ["Python", "FastAPI", "Computer Vision"],
      images: [
        "/assets/hand-control-1.jpg",
        "/assets/hand-control-2.jpg",
        "/assets/hand-control-3.jpg",
      ],
      github: "#",
      link: "#",
    },
  ],
};

// Agar link valid nahi hai ("#", "" ya undefined) to disabled button dikhega
const isValidLink = (url) => Boolean(url) && url !== "#";

export default function SelectedWork() {
  const [active, setActive] = useState(0);
  const p = data.projects[active];
  const num = String(active + 1).padStart(2, "0");

  return (
    <section className="work" id="work">
      <div className="work-head">
        <span className="work-label">{data.label}</span>
        <h2>
          {data.title} <em>{data.titleItalic}</em>
        </h2>
      </div>

      <div className="work-body">
        {/* LEFT: active project info */}
        <div className="work-info" key={active}>
          <span className="work-num">
            {num} / {String(data.projects.length).padStart(2, "0")}
          </span>
          <span className="work-cat">{p.category}</span>
          <h3>{p.name}</h3>
          <p className="work-desc">{p.description}</p>

          <ul className="work-features">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <div className="work-tech">
            {p.tech.map((t) => (
              <span key={t} className="tech-chip">
                {t}
              </span>
            ))}
          </div>

          <div className="work-actions">
            {isValidLink(p.github) ? (
              <a
                href={p.github}
                className="work-btn"
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub ↗
              </a>
            ) : (
              <span className="work-btn disabled">GitHub soon</span>
            )}

            {isValidLink(p.link) ? (
              <a
                href={p.link}
                className="work-btn"
                target="_blank"
                rel="noreferrer"
              >
                View Website ↗
              </a>
            ) : (
              <span className="work-btn disabled">Website soon</span>
            )}
          </div>
        </div>

        {/* CENTER: image stack, project badalne par shuru se */}
        <div className="work-shot">
          <ImageStack key={active} images={p.images} alt={p.name} />
        </div>

        {/* RIGHT: vertical deck of all projects */}
        <div className="work-deck">
          {data.projects.map((proj, i) => (
            <button
              key={proj.name}
              className={`deck-item ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={proj.name}
            >
              <span className="deck-text">{proj.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}