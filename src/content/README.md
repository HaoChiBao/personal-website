# Content

Typed source of truth for profile, education, work, projects, skills, and awards.
Facts are aligned with `public/resume.pdf`.

## Layout

```
content/
  labels.ts          # canonical label ids + metadata
  types.ts           # shared types
  profile.ts
  education.ts
  work.ts
  skills.ts
  awards.ts
  projects/          # one file per project
    openworker.ts
    supermemory.ts
    stagehand.ts
    cloudflare-docs.ts
    nodes.ts
    rbc.ts
    boardy.ts
    furme.ts         # plus 23 other Devpost hackathon entries
    index.ts         # list/get helpers
  index.ts           # public API
```

## Labels

Use `LabelId` values from `labels.ts` (e.g. `contract`, `internship`, `hackathon`, `shipped`, `featured`).  
Kinds: `engagement` | `status` | `topic`.

## Access

```ts
import {
  profile,
  education,
  skills,
  listWork,
  listProjects,
  getProject,
  listProjectsByLabel,
  listAwards,
} from "@/content";

listProjects({ featured: true });
listProjects({ anyLabels: ["hackathon", "indie"] });
getProject("nodes");
listWork({ labels: ["internship"] });
```

## Adding a project

1. Create `projects/<id>.ts` exporting a `ProjectEntry`.
2. Register it in `projects/index.ts`.
3. Optionally link it from `work.ts` via `projectIds`.
4. Optional `caseStudy` with structured blocks; without it, `/case/[id]` falls back to `summary`, `story`, `contributions`, `outcomes`, and `media`.

## Case study media

Put assets under `public/media/<project-id>/...` and reference them as `/media/<project-id>/...` (or a flat path like `/media/nodes.mp4`). Missing files are skipped so the layout does not break.

Restored from the previous site (`origin/master`):

- `/media/boardy.mp4` → Boardy
- `/media/nodes.mp4` → Nodes
- `/media/uofthacks.mp4` → FurMe
- `/media/rbc-logo.jpg` → RBC Amplify
- `/media/tag-boardy.png`, `/media/tag-nodes.png`, `/media/tag-rbc.png` → case-study title marks (`media.mark`)

```ts
import { caseHref, getProject } from "@/content";

caseHref("nodes"); // "/case/nodes"
```

## Hackathons

When `section: "hackathons"`, set `hackathon: { event, year, placement?, track?, notes? }`
so event metadata stays structured (placements can be filled in later via `notes` / `placement`).

```ts
import { listHackathonInfo, listHackathonProjects } from "@/content";

listHackathonProjects({ featured: true });
listHackathonInfo(); // [{ projectId, name, hackathon, links }, ...]
```
