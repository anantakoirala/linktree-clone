import { z } from "zod";

export const youtubeSchema = z.object({
  value: z
    .string()
    .url()
    .refine(
      (url) =>
        url.startsWith("https://youtube.com/channel/") &&
        url.length > "https://youtube.com/channel/".length,
      {
        message: "Please enter a valid youtube url",
      }
    ),
});
