import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Frame({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}

type IntroProps = { eyebrow?: string; title: string; lead: string; children?: ReactNode };

export function Intro({ eyebrow, title, lead, children }: IntroProps) {
  return (
    <section className="intro">
      <div className="container intro__inner">
        {eyebrow ? <p className="label">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {children}
      </div>
    </section>
  );
}
