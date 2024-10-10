import { z } from "zod";

const envSchema = z.object({
  AUTH_SECRET: z.string().optional(),
  AUTH_GITHUB_ID: z.string().optional(),
  AUTH_GITHUB_SECRET: z.string().optional(),

  NODE_ENV: z.enum(["development", "production", "test"]),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("Invalid environment variables:", env.error.format());
  throw new Error("Environment variable validation failed");
}

export const parsedEnv = env.data; // Export your parsed env for use in the app
