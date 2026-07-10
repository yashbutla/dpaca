// src/app/sitemap.ts
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dpaca-ahilyanagar.org";

  const routes = ["", "/about", "/what-we-do", "/gallery", "/get-involved", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.8,
    })
  );

  return routes;
}
