import { z } from "zod";

export const facebookSchema = z.object({
  name: z.string().default("Facebook"),
  displayName: z.string().default("Facebook"),
  value: z
    .string()
    .url()
    .refine(
      (url) =>
        url.startsWith("https://facebook.com/") &&
        url.length > "https://facebook.com/".length,
      {
        message: "Please enter a valid facebook url",
      }
    ),
});
