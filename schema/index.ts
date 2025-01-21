import { emailSchema } from "./emailSchema";
import { facebookSchema } from "./facebookSchema";
import { githubSchema } from "./githubSchema";
import { instagramSchema } from "./instagramSchema";
import { linkedinSchema } from "./linkedinSchema";
import { personalWebsiteSchema } from "./personalWebsiteSchema";
import { phoneSchema } from "./phoneSchema";
import { spotifySchema } from "./spotifySchema";
import { threadSchema } from "./threadSchema";
import { tiktokSchema } from "./tiktokSchema";
import { xSchema } from "./xSchema";
import { youtubeSchema } from "./youtubeSchema";

// Mapping social media names to validation schemas
export const socialMediaSchemas = {
  Facebook: facebookSchema,
  X: xSchema,
  Instagram: instagramSchema,
  YouTube: youtubeSchema,
  TikTok: tiktokSchema,
  Github: githubSchema,
  Phone: phoneSchema,
  Threads: threadSchema,
  Email: emailSchema,
  Linkedin: linkedinSchema,
  Spotify: spotifySchema,
  PersonalWebsite: personalWebsiteSchema,
};

export type SocialMediaName = keyof typeof socialMediaSchemas;
