import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";
import appMetaJson from "../app-meta.json";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site/seo";
import { Frame } from "@/components/site/Frame";
import { LinkButton, Button } from "@/components/site/Buttons";

declare const __HF_DESIGN_INSPECTOR__: boolean;

type AppMeta = {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
  og_video_url?: string | null;
};

const appMeta = appMetaJson as AppMeta;
const DEFAULT_TITLE = `${SITE_NAME}. Chester, Pennsylvania concrete led by Zane Walker`;
const DEFAULT_DESCRIPTION =
  "Concrete work in Chester, Pennsylvania and Delaware County, led by Zane Walker and roughly 37 years in the trade. We’re pouring with confidence.";

function buildHead(meta: AppMeta) {
  const title = meta.og_title && meta.og_title !== SITE_NAME ? meta.og_title : DEFAULT_TITLE;
  const description = meta.og_description ?? DEFAULT_DESCRIPTION;
  const ogImage = meta.og_image_url?.startsWith("/") ? `${SITE_URL}${meta.og_image_url}` : (meta.og_image_url ?? OG_IMAGE);
  const favicon = meta.favicon_url ?? "/favicon.svg";

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "author", content: SITE_NAME },
      { name: "theme-color", content: "#1a1a19" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "preload", href: "/fonts/archivo-latin.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" as const },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: favicon, type: "image/svg+xml" },
      { rel: "alternate icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  };
}

function NotFoundComponent() {
  return (
    <Frame>
      <section className="container hollow">
        <p className="label">Page not found</p>
        <h1>That page isn’t here.</h1>
        <p className="lead muted measure">
          The address may have changed, or the page is not part of the public site. Everything public is one click
          away.
        </p>
        <div className="cta-row">
          <LinkButton to="/" tone="dark">
            Go to the home page
          </LinkButton>
          <LinkButton to="/consultation">Request a consultation</LinkButton>
        </div>
      </section>
    </Frame>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportHiggsfieldError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <section className="container hollow">
      <p className="label">Something went wrong</p>
      <h1>This page didn’t load.</h1>
      <p className="lead muted measure">You can try again, or head back to the home page.</p>
      <div className="cta-row">
        <Button
          tone="dark"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Try again
        </Button>
        <a href="/" className="btn btn--outline">
          Go to the home page
        </a>
      </div>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => buildHead(appMeta),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if (!__HF_DESIGN_INSPECTOR__) {
      return;
    }

    void import("../module/design-inspector/runtime")
      .then(({ installHiggsfieldDesignInspector }) => {
        installHiggsfieldDesignInspector();
      })
      .catch((error) => {
        reportHiggsfieldError(
          error instanceof Error ? error : new Error("Failed to load design inspector"),
          {
            boundary: "higgsfield_design_inspector_import",
          },
        );
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
