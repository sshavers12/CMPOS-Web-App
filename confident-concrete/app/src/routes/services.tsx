import { createFileRoute, Link } from "@tanstack/react-router";
import { Frame, Intro } from "@/components/site/Frame";
import { CtaBand } from "@/components/site/CtaBand";
import { LinkButton } from "@/components/site/Buttons";
import { ArrowRight, CheckIcon } from "@/components/site/Icons";
import { CONVERSATIONS, STEPS } from "@/lib/site/content";
import { pageHead } from "@/lib/site/seo";

const REVIEW_COVERS = [
  ["Feasibility", "Whether the work can be done well on this site, in this condition."],
  ["Scope", "What the job actually involves, including what should not be done."],
  ["Materials and labor", "What the pour needs, judged by Zane, not by a form."],
  ["Safety and access", "Equipment, delivery, drainage and the people around the work."],
  ["Timing", "When the work can happen, weather and sequence included."],
  ["Price", "Set by Zane once the scope is confirmed. Never quoted by the website."],
] as const;

export const Route = createFileRoute("/services")({
  head: () =>
    pageHead({
      title: "Services. What a Confident Concrete consultation covers",
      description:
        "Residential and commercial concrete conversations in Chester, Pennsylvania and Delaware County, reviewed by Zane Walker. The full service list is published once Zane approves it.",
      path: "/services",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <Frame>
      <Intro
        eyebrow="Services"
        title="Begin with a clear look at the work."
        lead="Concrete work informed by roughly 37 years of field experience, residential and major commercial, led by a founder who has run crews as general foreman and top lead. Tell us about the pour, the site and the finish you need."
      >
        <div className="cta-row">
          <LinkButton to="/consultation">Request a consultation</LinkButton>
        </div>
      </Intro>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Three ways a conversation starts.</h2>
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

      <section className="section on-slab joint">
        <div className="container two-col">
          <div className="stack stack-lg">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <h2>What Zane’s review covers.</h2>
              <p className="lead muted">
                A consultation is a working review, not a sales call. These are the questions it answers.
              </p>
            </div>
            <ul className="checklist">
              {REVIEW_COVERS.map(([title, body]) => (
                <li key={title}>
                  <CheckIcon />
                  <div>
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel stack">
            <h3>About the service list</h3>
            <p className="muted">
              Zane has not yet published a fixed menu of services or a service radius, and this site will not invent
              one. Describe what you need and where it is. If it is outside what Confident Concrete takes on, you will
              be told plainly.
            </p>
            <ol className="steps mt-1">
              {STEPS.map((step) => (
                <li className="step" key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand />
    </Frame>
  );
}
