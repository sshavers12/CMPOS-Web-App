export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page did not load. Confident Concrete</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 16px/1.6 system-ui, -apple-system, sans-serif; background: #edeae4; color: #1a1a19; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.5rem; margin: 0 0 0.5rem; }
      p { color: #56534d; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.75rem 1.25rem; border-radius: 4px; font: inherit; font-weight: 600; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #1a1a19; color: #fff; }
      .secondary { background: #fff; color: #1a1a19; border-color: #c9c4ba; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page did not load</h1>
      <p>Something went wrong on our end. You can try again or head back to the home page.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go to home page</a>
      </div>
    </div>
  </body>
</html>`;
}
