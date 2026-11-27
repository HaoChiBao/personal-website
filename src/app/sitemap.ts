import type { MetadataRoute } from "next";
import { listProjectIds } from "@/content";

const origin = "https://www.yangjames.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: origin },
    ...listProjectIds().map((id) => ({ url: `${origin}/case/${id}` })),
  ];
}
