import { z } from "zod";

export const tiktokSchema = z.object({
  value: z
    .string()
    .refine((value) => value.startsWith("@") && value.length > "@".length, {
      message: "Please enter a valid TikTok username",
    }),
});
