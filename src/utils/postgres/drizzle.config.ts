import { Config, defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/utils/postgres/schema.ts",
  out: "./src/utils/postgres/migration",
  dbCredentials: {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST!,
    port: parseInt(process.env.PG_PORT!),
    database: "ltdclone",
    ssl: false,
  },
} satisfies Config);
