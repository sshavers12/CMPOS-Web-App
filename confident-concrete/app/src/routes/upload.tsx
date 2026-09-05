import { createFileRoute, Link } from "@tanstack/react-router";
import { Frame, Intro } from "@/components/site/Frame";
import { PhotoPrep } from "@/components/site/PhotoPrep";
import { Notice } from "@/components/site/Notice";
import { ArrowRight, CheckIcon } from "@/components/site/Icons";
import { PHOTO_STAGES } from "@/lib/site/content";
import { pageHead } from "@/lib/site/seo";

export const Route = createFileRoute("/upload")({
  head: () =>
    pageHead({
      title: "Prepare photos and documents for Confident Concrete",
      description:
        "Preview and label before, during and after photos of your concrete project on your device before talking to Zane Walker of Confident Concrete.",
      path: "/upload",
    }),
  component: UploadPage,
});

function UploadPage() {
  return (
    <Frame>
      <Intro
        eyebrow="Photos and documents"
        title="Show the work clearly."
        lead="Before, during and after photos turn a conversation into an organized project record, and a completed job into proof of the work."
      />

      <section className="section">
        <div className="container two-col">
          <div className="stack stack-lg">
            <Notice>
              <strong>Uploads are not switched on yet.</strong> Secure storage and access rules are still Zane’s
              decision. This page previews and labels files on your device only; nothing leaves your phone or computer.
            </Notice>
            <PhotoPrep />
          </div>
          <aside className="stack stack-lg">
            <div className="panel stack">
              <h2 style={{ fontSize: "var(--text-h3)" }}>Field capture standard</h2>
              <ul className="checklist">
                {PHOTO_STAGES.map((stage) => (
                  <li key={stage.id}>
                    <CheckIcon />
                    <div>
                      <strong>{stage.title}</strong>
                      <span>{stage.body}</span>
                    </div>
                  </li>
                ))}
                <li>
                  <CheckIcon />
                  <div>
                    <strong>Documents</strong>
                    <span>Plans, notes or paperwork that describe the property or the project.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="panel stack">
              <h3>Then request a consultation</h3>
              <p className="muted">Build a request summary that notes you have photos ready for Zane.</p>
              <Link to="/consultation" className="text-link">
                Request a consultation <ArrowRight />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </Frame>
  );
}
