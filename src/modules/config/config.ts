import z from 'zod';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().regex(/^\d+$/).transform(Number).default('3000'),
  MONGODB_URL: z.string().url(),
  GITHUB_API_URL: z.string().url(),
  GITHUB_PERSONAL_TOKEN: z.string(),
});

const parseResult = envSchema.safeParse(process.env);

if (parseResult.success === false) {
  const errors = parseResult.error.issues.map((issue) => ` ${issue.path}: ${issue.message}`).join('\n');
  throw new Error(`Invalid environment variables: \n${errors}`);
}

const envVars = parseResult.data;
export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoUrl: envVars.MONGODB_URL,
  github: {
    apiUrl: envVars.GITHUB_API_URL,
    token: envVars.GITHUB_PERSONAL_TOKEN,
  },
};
