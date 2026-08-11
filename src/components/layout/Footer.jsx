import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { AUDIT_METADATA, NAV_LINKS } from "../../data/siteData";
import Reveal from "../animations/Reveal";

export default function Footer() {
  const bioLines = AUDIT_METADATA.bio.split("\n");

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <Reveal direction="up" className="footer-brand">
          <div className="footer-logo-row">
            <img src="/Logo.jpeg" alt="Invigourate" className="footer-logo" />
            <span className="footer-brand-name">INVIGOURATE</span>
          </div>
          <p className="footer-bio">{bioLines.join(" ")}</p>
          <a
            href={AUDIT_METADATA.contact.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="footer-instagram"
          >
            <Instagram size={18} />
            {AUDIT_METADATA.contact.instagram}
          </a>
        </Reveal>

        <Reveal direction="up" delay={0.1} className="footer-col">
          <h5>Explore</h5>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal direction="up" delay={0.15} className="footer-col">
          <h5>Offerings</h5>
          <ul>
            {AUDIT_METADATA.offerings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal direction="up" delay={0.2} className="footer-col">
          <h5>Community</h5>
          <ul className="footer-stats">
            <li>
              <strong>{AUDIT_METADATA.followersDisplay}</strong> Instagram followers
            </li>
            <li>
              <strong>{AUDIT_METADATA.engagementRate}</strong> engagement rate
            </li>
            <li>
              <strong>{AUDIT_METADATA.totalPosts}</strong> wholefood posts
            </li>
            <li>
              <strong>{AUDIT_METADATA.hygieneRating}</strong>
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {AUDIT_METADATA.accountName}. All rights reserved.
        </p>
        <p className="footer-booking">{AUDIT_METADATA.contact.bookingMethod}</p>
      </div>
    </footer>
  );
}
