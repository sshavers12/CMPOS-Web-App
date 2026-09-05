import { createFileRoute } from "@tanstack/react-router";
import { Frame, Intro } from "@/components/site/Frame";
import { LinkButton } from "@/components/site/Buttons";
import { Notice } from "@/components/site/Notice";
import { CopyLinkButton } from "@/components/site/CopyLinkButton";
import { BUSINESS } from "@/lib/site/content";
import { pageHead } from "@/lib/site/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact Confident Concrete in Chester, Pennsylvania",
      description:
        "Reach Confident Concrete and Zane Walker in Chester, Pennsylvania. Request a consultation online; phone and email are published once Zane approves them.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Frame>
      <Intro
        eyebrow={`${BUSINESS.city} · ${BUSINESS.county}`}
        title="Tell us what you are working on."
        lead="Start with the property, the concrete need and any timing or photos that help Zane understand the project."
      />

      <section className="section">
        <div className="container grid-2">
          <article className="panel stack stack-lg">
            <div className="stack">
              <p className="label">01</p>
              <h2>Start online</h2>
              <p className="muted">
                Walk through the information that shapes the first conversation, then keep a copy of your request
                summary.
              </p>
            </div>
            <div className="cta-row">
              <LinkButton to="/consultation">Request a consultation</LinkButton>
              <LinkButton to="/upload" tone="outline">
                Prepare photos
              </LinkButton>
            </div>
          </article>
          <article className="panel stack stack-lg">
            <div className="stack">
              <p className="label">02</p>
              <h2>Call or email</h2>
              <p className="muted">
                A business phone number and email address will appear here as soon as Zane confirms them. Until then,
                the consultation page is the reliable way to prepare a request.
              </p>
            </div>
            <dl className="record record--light">
              <div className="record__row">
                <dt>Contact</dt>
                <dd>Zane Walker, founder and operator</dd>
              </div>
              <div className="record__row">
                <dt>Based in</dt>
                <dd>
                  {BUSINESS.city}. {BUSINESS.county}.
                </dd>
              </div>
              <div className="record__row">
                <dt>Phone</dt>
                <dd>Pending owner approval</dd>
              </div>
              <div className="record__row">
                <dt>Email</dt>
                <dd>Pending owner approval</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      <section className="section on-slab joint">
        <div className="container two-col">
          <div className="prose">
            <h2>Share this site.</h2>
            <p>
              Sending the site to someone who needs concrete work reviewed? Copy the link, or use the QR landing page on
              a card, a sign or an invoice.
            </p>
            <div className="cta-row">
              <CopyLinkButton path="/" label="Copy site link" />
              <LinkButton to="/qr" tone="outline">
                Open the QR landing page
              </LinkButton>
            </div>
          </div>
          <Notice>
            <strong>About your information.</strong> This site does not yet send or store anything you type. Request
            summaries and photo previews stay on your device until Zane approves a contact channel and a secure way to
            receive files.
          </Notice>
        </div>
      </section>
    </Frame>
  );
}
