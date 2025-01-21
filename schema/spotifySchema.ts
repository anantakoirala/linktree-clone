import { z } from "zod";

export const spotifySchema = z.object({
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
