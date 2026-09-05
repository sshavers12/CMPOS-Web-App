import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BUSINESS, NAV, START_LINKS } from "@/lib/site/content";
import { ArrowRight, CloseIcon, MenuIcon } from "./Icons";
import { Lockup } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll, move focus, and close on Escape while the menu is open.
  useEffect(() => {
    if (!open) {
      document.body.removeAttribute("data-menu-open");
      return;
    }
    document.body.setAttribute("data-menu-open", "true");
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        openButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.removeAttribute("data-menu-open");
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Lockup />
        <nav className="nav-desktop" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} activeProps={{ "aria-current": "page" }}>
              {item.label}
            </Link>
          ))}
          <Link to="/consultation" className="btn btn--primary" activeProps={{ "aria-current": "page" }}>
            Request a consultation
          </Link>
        </nav>
        <button
          ref={openButtonRef}
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
          Menu
        </button>
      </div>

      {open ? (
        <div className="menu-panel on-dark" id="site-menu" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="container menu-panel__top">
            <Lockup variant="light" />
            <button ref={closeButtonRef} type="button" className="menu-btn" onClick={() => setOpen(false)}>
              <CloseIcon />
              Close
            </button>
          </div>
          <nav className="container menu-panel__links" aria-label="Site">
            <Link to="/" activeProps={{ "aria-current": "page" }} activeOptions={{ exact: true }}>
              Home <ArrowRight />
            </Link>
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} activeProps={{ "aria-current": "page" }}>
                {item.label} <ArrowRight />
              </Link>
            ))}
          </nav>
          <div className="container menu-panel__secondary">
            {START_LINKS.slice(1).map((item) => (
              <Link key={item.to} to={item.to} activeProps={{ "aria-current": "page" }}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="container menu-panel__cta">
            <Link to="/consultation" className="btn btn--primary btn--block">
              Request a consultation
            </Link>
          </div>
          <div className="container menu-panel__foot">
            {BUSINESS.name}. {BUSINESS.city}. {BUSINESS.county}.
          </div>
        </div>
      ) : null}
    </header>
  );
}
