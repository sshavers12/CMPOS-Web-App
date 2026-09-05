import { createFileRoute, Link } from "@tanstack/react-router";
import { Frame } from "@/components/site/Frame";
import { LinkButton } from "@/components/site/Buttons";
import { PourIllustration } from "@/components/site/PourIllustration";
import { ArrowDown, ArrowRight } from "@/components/site/Icons";
import { CtaBand } from "@/components/site/CtaBand";
import { StructuredData } from "@/components/site/StructuredData";
import { BUSINESS, CONVERSATIONS, FACTS, PHOTO_STAGES, STEPS } from "@/lib/site/content";
import { pageHead, SITE_URL } from "@/lib/site/seo";

const SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "Confident Concrete",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-mark.svg`,
      image: `${SITE_URL}/og.png`,
      slogan: "We’re pouring with confidence.",
      description:
        "Concrete work in Chester, Pennsylvania and Delaware County, led by Zane Walker and roughly 37 years in the trade.",
      founder: { "@id": `${SITE_URL}/#founder` },
      address: { "@type": "PostalAddress", addressLocality: "Chester", addressRegion: "PA", addressCountry: "US" },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: "Zane Walker",
      jobTitle: "Founder and operator",
      worksFor: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Confident Concrete",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#business` },
    },
  ],
});

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Confident Concrete. Chester, Pennsylvania concrete led by Zane Walker",
      description:
        "Concrete work in Chester, Pennsylvania and Delaware County, led by Zane Walker and roughly 37 years in the trade. Request a consultation.",
      path: "/",
    }),
  component: HomePage,
});

function HomePage() {
  return (
    <Frame>
      <StructuredData json={SCHEMA} />

      <section className="hero on-dark">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="label">
              {BUSINESS.city} · {BUSINESS.county}
            </p>
            <h1>We’re pouring with confidence.</h1>
            <p className="lead">
              Confident Concrete is led by Zane Walker, a Chester, Pennsylvania concrete professional with roughly 37
              years in the trade, from residential work to major commercial and high-rise projects.
            </p>
            <div className="cta-row">
              <LinkButton to="/consultation">Request a consultation</LinkButton>
              <a className="text-link" href="#process">
                How a project starts <ArrowDown />
              </a>
            </div>
          </div>
          <div className="hero__art">
            <PourIllustration />
          </div>
        </div>
        <div className="facts">
          <dl className="container facts__grid">
            {FACTS.map((fact) => (
              <div className="facts__item" key={fact.value}>
                <dt className="facts__value">{fact.value}</dt>
                <dd className="facts__label">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" id="conversations">
        <div className="container">
          <div className="section-head">
            <h2>Start with the concrete in front of you.</h2>
            <p className="lead muted">
              Tell us about the pour, the site and the finish you need. Zane reviews the scope on a consultation and
              confirms what Confident Concrete can take on.
            </p>
          </div>
          <div className="ledger">
            {CONVERSATIONS.map((item, index) => (
              <article className="ledger__row" key={item.id} id={item.id}>
                <span className="ledger__num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <Link to="/consultation" className="text-link" aria-label={`Request a consultation: ${item.title}`}>
                  Request a consultation <ArrowRight />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section on-slab joint" id="process">
        <div className="container">
          <div className="section-head">
            <h2>How a project starts.</h2>
            <p className="lead muted">
              Four steps, in the same order every time. The website organizes the conversation. Zane makes the
              decisions.
            </p>
          </div>
          <ol className="steps steps--rail">
            {STEPS.map((step) => (
              <li className="step" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section on-dark" id="zane">
        <div className="container split">
          <div className="split__copy">
            <p className="label">Zane Walker, {BUSINESS.founderRole.toLowerCase()}</p>
            <h2>The person reviewing the job owns the decision.</h2>
            <p className="lead muted">
              Roughly 37 years of concrete, from union crews and residential pours to general foreman and top-lead
              responsibility on major commercial and high-rise work. Every request starts with what is actually in
              front of him.
            </p>
            <Link to="/about" className="text-link">
              About Zane and Confident Concrete <ArrowRight />
            </Link>
          </div>
          <dl className="record">
            <div className="record__head">
              <strong>Field record</strong>
              <span className="muted small">Verified facts only</span>
            </div>
            <div className="record__row">
              <dt>Experience</dt>
              <dd>Approximately 37 years in concrete</dd>
            </div>
            <div className="record__row">
              <dt>Responsibility</dt>
              <dd>General foreman and top-lead leadership</dd>
            </div>
            <div className="record__row">
              <dt>Background</dt>
              <dd>Union concrete</dd>
            </div>
            <div className="record__row">
              <dt>Environments</dt>
              <dd>Residential, major commercial and high-rise</dd>
            </div>
            <div className="record__row">
              <dt>Base</dt>
              <dd>
                {BUSINESS.city}. {BUSINESS.county}.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" id="proof">
        <div className="container">
          <div className="section-head">
            <h2>Real work only.</h2>
            <p className="lead muted">
              Project photography is published only after the images, the details and the customer’s permission are
              approved by Zane. Until then, these frames stay empty. They are the standard, not a substitute.
            </p>
          </div>
          <div className="stages">
            {PHOTO_STAGES.map((stage) => (
              <article className="stage" key={stage.id}>
                <div className="stage__frame" aria-hidden="true">
                  <span>Awaiting approved project photography</span>
                </div>
                <div className="stage__meta">
                  <h3>{stage.title}</h3>
                  <p>{stage.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="cta-row mt-2">
            <Link to="/portfolio" className="text-link">
              See the portfolio standard <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </Frame>
  );
}
