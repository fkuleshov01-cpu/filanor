import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/test-globe", "/justine-light", "/justine-full", "/demo/carnet-de-vie-madelaine-x7k29"],
      },
    ],
    sitemap: "https://filanor.ch/sitemap.xml",
    host: "https://filanor.ch",
  };
}
