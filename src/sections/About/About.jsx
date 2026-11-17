import { useState } from "react";
import "./About.css";
import photo from "../../assets/character.png";

const data = {
  name: "Rishikesh",
  bio: "Full Stack Developer who builds secure, scalable web applications using React, Node.js, and modern backend technologies.",
  sub: "I work across frontend, backend, APIs, databases, and cybersecurity.",
  resume: "/resume.pdf",
  github: "https://github.com/yourname",
  linkedin: "https://linkedin.com/in/yourname",
  facts: [
    { label: "Based in", value: "Bhopal" },
    { label: "Studying", value: "CSE, 3rd Year" },
    { label: "Batch", value: "2024-2028" },
    { label: "Focus", value: "Full Stack Developer" },
  ],
  quote: "Code that scales, systems that hold up, interfaces that feel right",
  card: {
    portfolio: "Portfolio",
    name: "RISHIKESH",
    role: "Full Stack Developer",
    id: "RSH-0001",
    dept: "Computer Science",
    year: "2028",
    photo: photo,
    location: "Bhopal",
    email: "rishikesh303303@gmail.com",
    status: "Open to work",
  },
};

export default function About() {
  const [flipped, setFlipped] = useState(false);
  const c = data.card;

  return (
    <section className="about">
      <div className="about-wrap">
        {/* LEFT: text */}
        <div className="about-left">
          <span className="about-label">01 — ABOUT</span>
          <h2>
            Hi, I'm <em>{data.name}</em>
          </h2>
          <p className="about-bio">{data.bio}</p>
          <p className="about-sub">{data.sub}</p>

          <div className="about-links">
            <a href={data.resume} className="pill dark">
              Resume ↓
            </a>
            <a
              href={data.github}
              className="pill"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a
              href={data.linkedin}
              className="pill"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* CENTER: flipping ID card with lanyard */}
        <div className="id-wrap">
          <div className="lanyard">
            <div className="lanyard-strap" />
            <div className="lanyard-clip" />
          </div>

          <div className="id-scene" onClick={() => setFlipped(!flipped)}>
            <div className={`id-card ${flipped ? "flipped" : ""}`}>
              {/* FRONT */}
              <div className="id-face id-front">
                <div className="id-top">
                  <span className="id-logo">
                    {data.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <div className="id-title">DEVELOPER ID</div>
                    <div className="id-sub">{c.portfolio}</div>
                  </div>
                </div>

                <div className="id-photo-frame">
                  <img src={c.photo} alt={c.name} />
                </div>

                <h3 className="id-name">{c.name}</h3>
                <p className="id-role">{c.role}</p>

                <div className="id-bottom">
                  <div>
                    <small>ID</small>
                    <span>{c.id}</span>
                  </div>
                  <div>
                    <small>DEPT</small>
                    <span>{c.dept}</span>
                  </div>
                  <div>
                    <small>YEAR</small>
                    <span>{c.year}</span>
                  </div>
                </div>
                <div className="id-barcode" />
              </div>
              {/* BACK */}
              <div className="id-face id-back">
                <div className="id-back-top">
                  <span className="id-title">DETAILS</span>
                  <span className="id-sub">{c.portfolio}</span>
                </div>

                <ul className="back-list">
                  <li>
                    <span>Location</span>
                    <strong>{c.location}</strong>
                  </li>
                  <li>
                    <span>Email</span>
                    <strong>{c.email}</strong>
                  </li>
                  <li>
                    <span>Status</span>
                    <strong>{c.status}</strong>
                  </li>
                </ul>

                <p className="id-hint">Click to flip back</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: facts */}
        <div className="about-right">
          <span className="about-label">QUICK FACTS</span>
          <ul className="facts">
            {data.facts.map((f) => (
              <li key={f.label}>
                <span>{f.label}</span>
                <strong>{f.value}</strong>
              </li>
            ))}
          </ul>
          <blockquote>"{data.quote}"</blockquote>
        </div>
      </div>
    </section>
  );
}
