import { z } from "zod";

export const spotifySchema = z.object({
  name: z.string().default("Spotify"),
  value: z
    .string()
    .url()
    .refine(
      (url) =>
        url.startsWith("https://open.spotify.com/") &&
        /https:\/\/open\.spotify\.com\/(user|playlist|artist|album|track)\/.+/.test(
          url
        ),
      {
        message: "Please enter a valid Spotify URL",
      }
    ),
});
