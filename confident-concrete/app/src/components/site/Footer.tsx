import { Link } from "@tanstack/react-router";
import { BUSINESS, NAV, START_LINKS } from "@/lib/site/content";
import { Lockup } from "./Logo";

export function Footer() {
  return (
    <footer className="site-footer on-dark">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Lockup variant="light" size="large" />
          <p className="site-footer__slogan">{BUSINESS.slogan}</p>
          <p>
            {BUSINESS.founder}, {BUSINESS.founderRole.toLowerCase()}. {BUSINESS.city}. {BUSINESS.county}.
          </p>
        </div>
        <nav aria-label="Explore">
          <span className="label">Explore</span>
          <Link to="/">Home</Link>
          {NAV.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Start">
          <span className="label">Start</span>
          {START_LINKS.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="container site-footer__notes">
        <p>
          Phone and email will be published here once Zane approves them. The chute mark is a review concept and is
          pending Zane Walker’s approval.
        </p>
        <p>© 2026 {BUSINESS.name}</p>
      </div>
    </footer>
  );
}
