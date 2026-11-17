import { useState } from "react";
import "./Navbar.css";

const data = {
  initials: "R",
  name: "Rishi",
  links: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
  ],
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <a href="#hero" className="nav-brand">
        <span className="nav-logo">{data.initials}</span>
        <span className="nav-name">{data.name}</span>
      </a>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        {data.links.map((l) => (
          <a key={l.label} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>

      <button
        className="nav-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span />
        <span />
      </button>
    </header>
  );
}