import type { ProjectEntry } from "../types";

const brief: ProjectEntry = {
  id: "brief",
  name: "Brief",
  title: "Production-grade URL shortener at the PE Hackathon",
  blurb:
    "Load-balanced Flask replicas, Kafka events, Grafana, Discord alerts, and a real-time ops dashboard.",
  dates: "2026",
  section: "hackathons",
  hackathon: { event: "PE Hackathon", year: 2026, notes: "Placement / awards TBD" },
  labels: [
      "hackathon",
      "tooling",
    ],
  stack: [
      "Flask",
      "FastAPI",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "Nginx",
      "Grafana",
      "Next.js",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/brief-9zwyam",
      external: true,
    },
    {
      label: "app",
      href: "https://user-frontend-production-6445.up.railway.app/",
      external: true,
    },
    {
      label: "ops",
      href: "https://dashboard-production-7762.up.railway.app/",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "Brief is a URL shortener built for the Production Engineering Hackathon with the infrastructure of a real service: load-balanced Flask replicas, Kafka event streaming, Prometheus/Grafana, Discord alerts, and a live ops dashboard.",
  contributions: [
    "Stood up load-balanced Flask replicas behind Nginx with Redis and Postgres.",
    "Streamed events through Kafka and wired Prometheus, Grafana, Alertmanager, and Discord alerts.",
    "Shipped a Next.js ops dashboard and k6 load tests on Railway.",
  ],
  outcomes: [
    "End-to-end production stack (app + observability + alerts) running on Railway.",
  ],
};

export default brief;
