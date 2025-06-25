import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  // out: "./drizzle",
  dbCredentials:{
    url: 'postgresql://neondb_owner:npg_Kg0fPMiAEL5Z@ep-wild-dream-a1fz5511-pooler.ap-southeast-1.aws.neon.tech/keen-edge-ai?sslmode=require'
  }
});