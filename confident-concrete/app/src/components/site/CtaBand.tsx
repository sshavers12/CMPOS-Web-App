import { LinkButton } from "./Buttons";

type Props = { title?: string; body?: string };

export function CtaBand({
  title = "Ready to talk about your concrete?",
  body = "Start with the site and the scope. Zane reviews every request himself.",
}: Props) {
  return (
    <section className="section section--tight on-dark joint">
      <div className="container cta-band__inner">
        <div className="stack">
          <h2>{title}</h2>
          <p className="muted lead">{body}</p>
        </div>
        <div className="cta-row">
          <LinkButton to="/consultation">Request a consultation</LinkButton>
          <LinkButton to="/upload" tone="outline">
            Prepare photos
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
