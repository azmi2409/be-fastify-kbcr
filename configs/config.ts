import dotenv from "dotenv";
import zod from "zod";
import { join } from "path";

dotenv.config({ path: join(__dirname, "../.env") });

const envSchema = zod.object({
  PORT: zod.string(),
  JWT_SECRET: zod.string(),
  DATABASE_URL: zod.string(),
  NODE_ENV: zod.string(),
});

const env = envSchema.parse(process.env);

export default env;
