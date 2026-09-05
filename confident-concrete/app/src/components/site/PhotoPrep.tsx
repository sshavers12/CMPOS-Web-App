import { useEffect, useId, useRef, useState } from "react";
import { Button } from "./Buttons";
import { CameraIcon, FileIcon } from "./Icons";

type Stage = "Before" | "During" | "After" | "Document";

type Item = {
  id: string;
  name: string;
  size: number;
  kind: "image" | "file";
  url: string | null;
  stage: Stage;
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function PhotoPrep() {
  const [items, setItems] = useState<Item[]>([]);
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  useEffect(() => {
    return () => {
      items.forEach((item) => item.url && URL.revokeObjectURL(item.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next: Item[] = Array.from(list).map((file) => {
      const isImage = file.type.startsWith("image/");
      return {
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
        name: file.name,
        size: file.size,
        kind: isImage ? "image" : "file",
        url: isImage ? URL.createObjectURL(file) : null,
        stage: isImage ? "Before" : "Document",
      };
    });
    setItems((current) => [...current, ...next]);
  }

  function remove(itemId: string) {
    setItems((current) => {
      const target = current.find((i) => i.id === itemId);
      if (target?.url) URL.revokeObjectURL(target.url);
      return current.filter((i) => i.id !== itemId);
    });
  }

  function clearAll() {
    items.forEach((item) => item.url && URL.revokeObjectURL(item.url));
    setItems([]);
    if (inputRef.current) inputRef.current.value = "";
  }

  const counts = items.reduce<Record<Stage, number>>(
    (acc, item) => ({ ...acc, [item.stage]: acc[item.stage] + 1 }),
    { Before: 0, During: 0, After: 0, Document: 0 },
  );

  return (
    <div className="stack stack-lg">
      <div
        className={`dropzone ${over ? "is-over" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          addFiles(e.dataTransfer.files);
        }}
      >
        <CameraIcon style={{ width: "2rem", height: "2rem", color: "var(--accent)" }} />
        <div className="stack" style={{ gap: "0.25rem" }}>
          <strong>Choose photos or documents to preview</strong>
          <span className="muted small">They stay on your device. Nothing is uploaded from this page.</span>
        </div>
        <label htmlFor={`${id}-files`} className="btn btn--dark">
          Choose files
        </label>
        <input
          ref={inputRef}
          id={`${id}-files`}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      <p className="status" role="status" aria-live="polite">
        {items.length === 0
          ? ""
          : `${items.length} file${items.length === 1 ? "" : "s"} previewed: ${counts.Before} before, ${counts.During} during, ${counts.After} after, ${counts.Document} document${counts.Document === 1 ? "" : "s"}.`}
      </p>

      {items.length > 0 ? (
        <>
          <ul className="files">
            {items.map((item) => (
              <li className="file" key={item.id}>
                <div className="file__thumb">
                  {item.kind === "image" && item.url ? (
                    <img src={item.url} alt={`Preview of ${item.name}`} />
                  ) : (
                    <FileIcon style={{ width: "2rem", height: "2rem" }} />
                  )}
                </div>
                <div className="file__body">
                  <span className="file__name">{item.name}</span>
                  <span className="file__meta">{formatSize(item.size)}</span>
                  <div className="field">
                    <label htmlFor={`${id}-stage-${item.id}`} className="small">
                      Capture stage
                    </label>
                    <select
                      id={`${id}-stage-${item.id}`}
                      value={item.stage}
                      onChange={(e) =>
                        setItems((current) =>
                          current.map((i) => (i.id === item.id ? { ...i, stage: e.target.value as Stage } : i)),
                        )
                      }
                    >
                      {(["Before", "During", "After", "Document"] as const).map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="file__actions">
                    <button type="button" className="link-btn" onClick={() => remove(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cta-row">
            <Button tone="outline" onClick={clearAll}>
              Clear all previews
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}
