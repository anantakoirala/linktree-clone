import { z } from "zod";

export const githubSchema = z.object({
  value: z
    .string()
    .url()
    .refine((url) => url.startsWith("https://www.github.com/"), {
      message: "Please enter a valid Github URL",
    }),
});
