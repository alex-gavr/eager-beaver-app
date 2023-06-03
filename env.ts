import { z } from 'zod';

const envVariables = z.object({
  NEXT_PUBLIC_TELEGRAM_BOT_TOKEN: z.string(),
  NEXT_PUBLIC_TELEGRAM_GAVR_ID: z.string(),
  NEXT_PUBLIC_TELEGRAM_LERA_ID: z.string(),
  NEXT_PUBLIC_API_ROUTE_SECRET: z.string(),
  UPLOADTHING_APP_ID: z.string(),
  UPLOADTHING_SECRET: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  NEXT_PUBLIC_ADMIN_PASSWORD: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
