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

## Hackathons

When `section: "hackathons"`, set `hackathon: { event, year, placement?, track?, notes? }`
so event metadata stays structured (placements can be filled in later via `notes` / `placement`).

```ts
import { listHackathonInfo, listHackathonProjects } from "@/content";

listHackathonProjects({ featured: true });
listHackathonInfo(); // [{ projectId, name, hackathon, links }, ...]
```
