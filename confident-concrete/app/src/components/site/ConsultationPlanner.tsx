import { useId, useState } from "react";
import { Button } from "./Buttons";
import { CheckIcon, CopyIcon, DownloadIcon } from "./Icons";
import { copyText, downloadText } from "./clipboard";

type Form = {
  name: string;
  contact: string;
  location: string;
  projectType: "" | "Residential" | "Commercial" | "Not sure yet";
  description: string;
  timing: string;
  photos: "" | "Yes" | "Not yet";
};

const EMPTY: Form = {
  name: "",
  contact: "",
  location: "",
  projectType: "",
  description: "",
  timing: "",
  photos: "",
};

const TIMING = ["As soon as possible", "In the next few months", "Planning ahead", "Not sure yet"];

function buildSummary(form: Form) {
  const lines = [
    "CONSULTATION REQUEST. CONFIDENT CONCRETE",
    "Chester, Pennsylvania. Delaware County.",
    "",
    `Name: ${form.name.trim()}`,
    `Preferred contact: ${form.contact.trim() || "(not provided)"}`,
    `Project location: ${form.location.trim() || "(not provided)"}`,
    `Project type: ${form.projectType || "(not provided)"}`,
    `Timing: ${form.timing || "(not provided)"}`,
    `Photos ready: ${form.photos || "(not provided)"}`,
    "",
    "What I am working on:",
    form.description.trim(),
    "",
    "Prepared on the Confident Concrete website. Scope, feasibility and price are decided by Zane Walker.",
  ];
  return lines.join("\n");
}

export function ConsultationPlanner() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [summary, setSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");
  const id = useId();

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function onBuild(event: React.FormEvent) {
    event.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Please add your name.";
    if (!form.projectType) next.projectType = "Choose the closest project type.";
    if (form.description.trim().length < 12) next.description = "Describe the work in a sentence or two.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSummary(null);
      const first = Object.keys(next)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    const text = buildSummary(form);
    setSummary(text);
    setCopied("idle");
    window.setTimeout(() => document.getElementById(`${id}-summary`)?.scrollIntoView({ block: "nearest" }), 0);
  }

  async function onCopy() {
    if (!summary) return;
    const ok = await copyText(summary);
    setCopied(ok ? "done" : "failed");
    window.setTimeout(() => setCopied("idle"), 3000);
  }

  function onDownload() {
    if (!summary) return;
    downloadText("confident-concrete-consultation-request.txt", summary);
  }

  return (
    <div className="stack stack-lg">
      <form className="form" onSubmit={onBuild} noValidate aria-describedby={`${id}-note`}>
        <div className="form__row form__row--2">
          <div className={`field ${errors.name ? "field--error" : ""}`}>
            <label htmlFor={`${id}-name`}>Your name</label>
            <input
              id={`${id}-name`}
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${id}-name-error` : undefined}
              required
            />
            {errors.name ? (
              <span className="field__error" id={`${id}-name-error`}>
                {errors.name}
              </span>
            ) : null}
          </div>
          <div className="field">
            <label htmlFor={`${id}-contact`}>How you prefer to be reached</label>
            <input
              id={`${id}-contact`}
              name="contact"
              placeholder="Phone or email"
              value={form.contact}
              onChange={(e) => set("contact", e.target.value)}
            />
            <span className="hint">Kept in your summary only. Nothing is sent from this page.</span>
          </div>
        </div>

        <div className="form__row form__row--2">
          <div className="field">
            <label htmlFor={`${id}-location`}>Project location</label>
            <input
              id={`${id}-location`}
              name="location"
              placeholder="Town or neighborhood"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor={`${id}-timing`}>Timing</label>
            <select id={`${id}-timing`} name="timing" value={form.timing} onChange={(e) => set("timing", e.target.value)}>
              <option value="">Choose one</option>
              {TIMING.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset className={`field ${errors.projectType ? "field--error" : ""}`}>
          <legend className="label" style={{ marginBottom: "0.5rem" }}>
            Project type
          </legend>
          <div className="radio-group" role="radiogroup" aria-describedby={errors.projectType ? `${id}-type-error` : undefined}>
            {(["Residential", "Commercial", "Not sure yet"] as const).map((type, index) => (
              <label key={type}>
                <input
                  type="radio"
                  name="projectType"
                  id={index === 0 ? `${id}-projectType` : undefined}
                  value={type}
                  checked={form.projectType === type}
                  onChange={() => set("projectType", type)}
                />
                {type}
              </label>
            ))}
          </div>
          {errors.projectType ? (
            <span className="field__error" id={`${id}-type-error`}>
              {errors.projectType}
            </span>
          ) : null}
        </fieldset>

        <div className={`field ${errors.description ? "field--error" : ""}`}>
          <label htmlFor={`${id}-description`}>What are you working on?</label>
          <textarea
            id={`${id}-description`}
            name="description"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Describe the current condition, the concrete need, and anything Zane should know."
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? `${id}-description-error` : undefined}
            required
          />
          {errors.description ? (
            <span className="field__error" id={`${id}-description-error`}>
              {errors.description}
            </span>
          ) : null}
        </div>

        <fieldset className="field">
          <legend className="label" style={{ marginBottom: "0.5rem" }}>
            Do you have photos of the site?
          </legend>
          <div className="radio-group">
            {(["Yes", "Not yet"] as const).map((v) => (
              <label key={v}>
                <input type="radio" name="photos" value={v} checked={form.photos === v} onChange={() => set("photos", v)} />
                {v}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="cta-row">
          <Button type="submit">Build my request summary</Button>
          <span className="small muted" id={`${id}-note`}>
            Creates a summary you can copy or save. Nothing is transmitted.
          </span>
        </div>
      </form>

      {summary ? (
        <section className="summary" id={`${id}-summary`} aria-labelledby={`${id}-summary-title`}>
          <div className="summary__head">
            <strong id={`${id}-summary-title`}>Your request summary</strong>
            <div className="cta-row" style={{ gap: "0.5rem" }}>
              <Button tone="dark" onClick={onCopy}>
                {copied === "done" ? <CheckIcon /> : <CopyIcon />}
                {copied === "done" ? "Copied" : "Copy summary"}
              </Button>
              <Button tone="outline" onClick={onDownload}>
                <DownloadIcon /> Download as text
              </Button>
            </div>
          </div>
          <pre className="summary__body">{summary}</pre>
          <p className="status" role="status" aria-live="polite" style={{ padding: "0 1.15rem 1rem" }}>
            {copied === "done"
              ? "The summary is on your clipboard."
              : copied === "failed"
                ? "Copy failed. You can select the text above and copy it."
                : ""}
          </p>
        </section>
      ) : null}
    </div>
  );
}
