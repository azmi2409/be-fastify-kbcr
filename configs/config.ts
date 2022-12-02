import dotenv from "dotenv";
import zod from "zod";
import { join } from "path";

dotenv.config({ path: join(__dirname, "../.env") });

const envSchema = zod.object({
  PORT: zod
    .string()
    .default("4000")
    .transform((port) => Number(port)),
  NODE_ENV: zod.string().default("development"),
  HOST: zod.string().default("127.0.0.1"),
  JWT_SECRET: zod.string().default("secret"),
  DATABASE_URL: zod.string(),
});

const env = envSchema.parse(process.env);

export default env;
