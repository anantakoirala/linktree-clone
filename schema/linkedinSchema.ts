import { z } from "zod";

export const linkedinSchema = z.object({
  value: z
    .string()
    .url()
    .refine((url) => url.startsWith("https://linkedin.com/in/"), {
      message: "Please enter a valid LinkedIn URL",
    }),
});
