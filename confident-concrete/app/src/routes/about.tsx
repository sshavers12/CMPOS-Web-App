import { createFileRoute, Link } from "@tanstack/react-router";
import { Frame, Intro } from "@/components/site/Frame";
import { CtaBand } from "@/components/site/CtaBand";
import { BadgeLogo, Monogram } from "@/components/site/Logo";
import { ArrowRight } from "@/components/site/Icons";
import { BUSINESS } from "@/lib/site/content";
import { pageHead } from "@/lib/site/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About Zane Walker and Confident Concrete",
      description:
        "Zane Walker brings roughly 37 years of concrete experience, union crews to high-rise work, to Confident Concrete in Chester, Pennsylvania.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Frame>
      <Intro
        eyebrow={`${BUSINESS.founder}, ${BUSINESS.founderRole.toLowerCase()}`}
        title="Field judgment, earned over decades."
        lead="Confident Concrete is operated by Zane Walker in Chester, Pennsylvania. Roughly 37 years in concrete, including union work, residential projects, and general foreman and top-lead responsibility on major commercial and high-rise jobs."
      />

      <section className="section">
        <div className="container two-col">
          <div className="prose">
            <h2>How Confident Concrete works</h2>
            <p>
              A website can collect context and organize a conversation. It cannot judge a site, choose a mix, size a
              crew or set a price. Those decisions stay with Zane, because that is where the experience is.
            </p>
            <p>
              The company tone is field first: skilled, direct and professional. You will not find generic construction
              marketing here, and you will not find claims that Zane has not approved.
            </p>
            <h2>What Zane decides</h2>
            <p>
              Feasibility, technical scope, materials and labor, safety and engineering questions, quantities, timing
              and price. If a request needs one of those answers, it waits for him.
            </p>
            <h2>Where the work is rooted</h2>
            <p>
              {BUSINESS.city}, in {BUSINESS.county}. The service area and the full list of services will be published
              once Zane confirms them.
            </p>
            <Link to="/services" className="text-link">
              What a first conversation covers <ArrowRight />
            </Link>
          </div>
          <div className="stack stack-lg">
            <dl className="record record--light">
              <div className="record__head">
                <strong>Field record</strong>
                <span className="muted small">Verified facts only</span>
              </div>
              <div className="record__row">
                <dt>Name</dt>
                <dd>Zane Walker</dd>
              </div>
              <div className="record__row">
                <dt>Role</dt>
                <dd>Founder and operator, Confident Concrete</dd>
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
                <dt>Slogan</dt>
                <dd>{BUSINESS.slogan}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section on-slab joint">
        <div className="container two-col two-col--even">
          <div className="prose">
            <p className="label">The mark</p>
            <h2>A chute, a bridge, a finished slab.</h2>
            <p>
              The Confident Concrete badge puts the work and the place in one mark: a finisher walking a fresh pour,
              the mixer chute running, and the river bridge at sunset. It is the logo Zane approved, and it is the
              logo this site uses.
            </p>
            <p>
              Orange and steel carry the brand. The compact CC monogram is drawn from the same badge for small
              places, the browser tab, a shirt chest, a stamp on an invoice.
            </p>
            <p className="small muted">
              Badge lockup: {BUSINESS.city.replace(", Pennsylvania", ", PA")}. {BUSINESS.logoTagline}
            </p>
          </div>
          <div className="logo-plate">
            <div className="logo-plate__badge">
              <BadgeLogo className="badge" width={340} />
            </div>
            <div className="logo-plate__masters">
              <div className="logo-plate__master logo-plate__master--light">
                <Monogram front="var(--ink)" keyline="var(--white)" title="CC monogram on a light ground" />
                <span>On light</span>
              </div>
              <div className="logo-plate__master logo-plate__master--dark">
                <Monogram front="var(--brand-silver)" keyline="var(--ink)" title="CC monogram on a dark ground" />
                <span>On dark</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </Frame>
  );
}
