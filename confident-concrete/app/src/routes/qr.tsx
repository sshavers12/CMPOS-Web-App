import { createFileRoute, Link } from "@tanstack/react-router";
import { LinkButton } from "@/components/site/Buttons";
import { Lockup } from "@/components/site/Logo";
import { CopyLinkButton } from "@/components/site/CopyLinkButton";
import { DownloadIcon } from "@/components/site/Icons";
import { BUSINESS } from "@/lib/site/content";
import { pageHead } from "@/lib/site/seo";

export const Route = createFileRoute("/qr")({
  head: () =>
    pageHead({
      title: "Start a project with Confident Concrete",
      description:
        "QR landing page for Confident Concrete, Chester, Pennsylvania. Request a consultation with Zane Walker or prepare your site photos.",
      path: "/qr",
    }),
  component: QrPage,
});

function QrPage() {
  return (
    <div className="qr-page on-dark">
      <header className="container qr-page__top">
        <Lockup variant="light" />
        <Link to="/">Full site</Link>
      </header>
      <main id="main" className="container qr-page__main">
        <div className="qr-page__copy">
          <p className="label">
            {BUSINESS.city} · {BUSINESS.county}
          </p>
          <h1>Show Zane the concrete.</h1>
          <p className="lead muted">
            {BUSINESS.slogan} Start with a consultation request, then prepare the photos that help Zane Walker
            understand the work in front of you.
          </p>
          <div className="cta-row">
            <LinkButton to="/consultation">Request a consultation</LinkButton>
            <LinkButton to="/upload" tone="outline">
              Prepare photos
            </LinkButton>
          </div>
          <p className="small muted">
            Phone and email will be added here once Zane approves them.{" "}
            <Link to="/contact" className="text-link">
              Contact page
            </Link>
          </p>
        </div>
        <aside className="qr-card" aria-labelledby="qr-title">
          <h2 id="qr-title" className="small label" style={{ color: "var(--muted)" }}>
            Scan to open this page
          </h2>
          <img src="/qr-code.svg" width="240" height="240" alt="QR code linking to the Confident Concrete QR landing page" />
          <p>Print-ready for business cards, yard signs, shirts and invoices.</p>
          <div className="cta-row" style={{ justifyContent: "center" }}>
            <a className="btn btn--dark" href="/qr-code.svg" download="confident-concrete-qr.svg">
              <DownloadIcon /> Download QR code
            </a>
            <CopyLinkButton path="/qr" label="Copy link" tone="outline" />
          </div>
        </aside>
      </main>
      <footer className="container site-footer__notes">
        <p>
          {BUSINESS.name}. {BUSINESS.founder}, {BUSINESS.founderRole.toLowerCase()}.
        </p>
        <p>© 2026 {BUSINESS.name}</p>
      </footer>
    </div>
  );
}
