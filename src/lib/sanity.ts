import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  apiVersion: "2023-05-03",
  dataset: "production",
  projectId: "ukd3zcc5",
  useCdn: true,
});

const bulider = ImageUrlBuilder(client);

export function urlFor(source: any) {
  return bulider.image(source);
}
