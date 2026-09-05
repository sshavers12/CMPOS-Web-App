import { createFileRoute, Link } from "@tanstack/react-router";
import { Frame, Intro } from "@/components/site/Frame";
import { ConsultationPlanner } from "@/components/site/ConsultationPlanner";
import { Notice } from "@/components/site/Notice";
import { ArrowRight } from "@/components/site/Icons";
import { STEPS } from "@/lib/site/content";
import { pageHead } from "@/lib/site/seo";

export const Route = createFileRoute("/consultation")({
  head: () =>
    pageHead({
      title: "Request a consultation with Confident Concrete",
      description:
        "Prepare a consultation request for Zane Walker of Confident Concrete, Chester, Pennsylvania. Build a summary of your concrete project to copy or save.",
      path: "/consultation",
    }),
  component: ConsultationPage,
});

function ConsultationPage() {
  return (
    <Frame>
      <Intro
        eyebrow="Request a consultation"
        title="Begin with the concrete in front of you."
        lead="Share the basics Zane needs for an informed first review. This page organizes the conversation; Zane makes the technical decisions."
      />

      <section className="section">
        <div className="container two-col">
          <div className="stack stack-lg">
            <Notice>
              <strong>Online submission is being set up.</strong> Until Zane approves a contact channel, use this page to
              prepare your request. It builds a summary you can copy or save, and nothing you type is sent or stored.
            </Notice>
            <ConsultationPlanner />
          </div>
          <aside className="stack stack-lg">
            <div className="panel stack">
              <h2 style={{ fontSize: "var(--text-h3)" }}>What happens next</h2>
              <ol className="steps">
                {STEPS.map((step) => (
                  <li className="step" key={step.title}>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="panel stack">
              <h3>Helpful materials</h3>
              <p className="muted">
                Photos of the area as it is now, from far and from close, make the first conversation faster. Preview
                and label them before you talk to Zane.
              </p>
              <Link to="/upload" className="text-link">
                Prepare photos and documents <ArrowRight />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </Frame>
  );
}
