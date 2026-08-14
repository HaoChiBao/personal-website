import type { ProjectEntry } from "../types";

const youtubeUploader: ProjectEntry = {
  id: "youtube-uploader",
  name: "YouTube Uploader",
  title: "Multi-channel YouTube upload microservice",
  blurb:
    "OAuth multi-channel uploads, scheduled publish, R2-backed queues, and a Studio-style dashboard.",
  dates: "2026",
  section: "projects",
  labels: ["indie", "tooling", "shipped", "featured"],
  stack: [
    "Python",
    "YouTube Data API v3",
    "YouTube Analytics API",
    "Cloudflare R2",
    "Docker",
    "CLI",
  ],
  links: [
    {
      label: "github",
      href: "https://github.com/HaoChiBao/youtube-uploader",
      external: true,
    },
  ],
  role: "Solo builder",
  summary:
    "Standalone microservice split from ai-music-assembler for upload-only work. Registers YouTube channels via OAuth, resumable uploads with thumbnails, scheduled publishAt, pending/uploading/uploaded/failed registries, batch stagger, and retries. Cloudflare R2 stores config, tokens, registries, and jobs. Web dashboard covers categories, channel connect/remove, queue, channel browser, and analytics (Today pulse, verified channels).",
  contributions: [
    "CLI (`uploader channel add`, queue, test, storage init) plus multi-channel channels.yaml.",
    "R2-backed durable state and Assembly categories separate from YouTube category_id.",
    "Dashboard: Studio-style video browser, per-video analytics, sticky upload progress, phone-verified checkmarks.",
  ],
  outcomes: [
    "Production-oriented upload path with no FFmpeg in this service (render stays upstream).",
    "Documented microservice design (DESIGN.md, YOUTUBE_UPLOADER*.md).",
  ],
};

export default youtubeUploader;
