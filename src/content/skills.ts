import type { SkillGroup } from "./types";

/**
 * Technical skills from resume.
 */
export const skills: SkillGroup[] = [
  {
    id: "languages",
    category: "Languages",
    items: ["Python", "C++", "TypeScript/JavaScript", "SQL"],
  },
  {
    id: "frameworks",
    category: "Frameworks & Infrastructure",
    items: [
      "React.js",
      "Node.js",
      "FastAPI",
      "Firebase",
      "Docker",
      "Kubernetes/OpenShift",
      "Linux",
      "Git",
      "CI/CD",
    ],
  },
  {
    id: "ai",
    category: "AI/ML & Specialized",
    items: ["MCP", "LLMs (OpenAI/Claude)", "OpenCV", "DeepFace"],
  },
];
