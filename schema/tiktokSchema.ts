import { z } from "zod";

export const tiktokSchema = z.object({
  name: z.string().default("TikTok"),
  displayName: z.string().default("TikTok"),
  value: z
    .string()
    .refine((value) => value.startsWith("@") && value.length > "@".length, {
      message: "Please enter a valid TikTok username",
    }),
});
