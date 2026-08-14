import type { ProjectEntry } from "../types";

const volleyballAi: ProjectEntry = {
  id: "volleyball-ai",
  name: "Volleyball AI",
  title: "Offline volleyball video analysis pipeline",
  blurb:
    "Court keypoints, SAM player tracks, VballNet ball tracks, score, and 3D court. GPU on Modal only.",
  dates: "2026",
  section: "projects",
  labels: ["indie", "vision", "featured"],
  stack: [
    "Next.js",
    "TypeScript",
    "Python",
    "Modal",
    "Cloud Run Jobs",
    "SAM 3.1",
    "YOLOv11",
    "VballNet",
    "React Three Fiber",
    "ffmpeg",
  ],
  links: [
    {
      label: "github",
      href: "https://github.com/HaoChiBao/volleyballai",
      external: true,
    },
  ],
  role: "Solo builder",
  summary:
    "Offline / batch volleyball analysis: upload a court video, detect keypoints, calibrate the camera, track players (SAM 3.1) and ball (VballNet), detect actions, count score, and view a 3D court. Hard rule: no model inference on the laptop. Cloud Run Jobs orchestrate ffmpeg + stages; all neural nets run on Modal. Local v0 scaffolds Next.js web + worker polling with parallel court/player/ball stages after normalize.",
  contributions: [
    "Locked hybrid architecture: web control plane, Cloud Run job worker, Modal AI stages, optional Supabase later.",
    "Pipeline stages: ingest, normalize, detect_court (YOLOv11n-pose), track_players, track_ball, calibrate, actions, score, project_3d (+ optional splat scene).",
    "Docs for AI policy, jobs, architecture, data model, and decision log.",
  ],
  outcomes: [
    "Local v0 path: upload mp4 → Modal tracks → calibration → overlays + 3D positions.",
    "Quality-over-realtime batch design with cacheable stage artifacts.",
  ],
};

export default volleyballAi;
