import { createFileRoute } from "@tanstack/react-router";
import { Frame, Intro } from "@/components/site/Frame";
import { CtaBand } from "@/components/site/CtaBand";
import { LinkButton } from "@/components/site/Buttons";
import { Notice } from "@/components/site/Notice";
import { PHOTO_STAGES } from "@/lib/site/content";
import { pageHead } from "@/lib/site/seo";

export const Route = createFileRoute("/portfolio")({
  head: () =>
    pageHead({
      title: "Portfolio. Confident Concrete project proof standard",
      description:
        "Confident Concrete publishes real project photography only after Zane Walker approves the images, details and permissions. See the before, during and after standard.",
      path: "/portfolio",
    }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <Frame>
      <Intro
        eyebrow="Portfolio"
        title="A gallery should show what words cannot."
        lead="This space is reserved for real Confident Concrete projects, photographed clearly from the original condition through the finished result. Nothing here will ever be a stock photo or an invented job."
      />

      <section className="section">
        <div className="container stack stack-lg">
          <Notice>
            <strong>Gallery in preparation.</strong> Customer work appears here only when the photographs, the project
            details and the permission to publish have been reviewed and approved by Zane Walker.
          </Notice>
          <div className="section-head" id="before-after">
            <h2>Before, during, after.</h2>
            <p className="lead muted">
              When it is practical, every job is captured at three points so homeowners and commercial clients can see
              the work clearly. This is the standard each published project will meet.
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
        </div>
      </section>

      <section className="section on-slab joint">
        <div className="container two-col">
          <div className="prose">
            <h2>Useful photos have context.</h2>
            <p>
              Wide views explain the setting. Close details explain the condition. Consistent angles make the change
              easy to understand, and they make the first conversation with Zane faster.
            </p>
            <p>
              If you are preparing a request, the same three-stage habit helps: capture the area as it is now, from
              far and from close.
            </p>
          </div>
          <div className="panel stack">
            <h3>Have photos of your site?</h3>
            <p className="muted">
              Preview and label them on your device before you talk to Zane. Nothing is uploaded until an approved
              channel is live.
            </p>
            <LinkButton to="/upload" tone="dark">
              Prepare photos
            </LinkButton>
          </div>
        </div>
      </section>

      <CtaBand />
    </Frame>
  );
}
