import { z } from 'zod';

const envVariables = z.object({
    TELEGRAM_BOT_TOKEN: z.string(),
    TELEGRAM_GAVR_ID: z.string(),
    TELEGRAM_LERA_ID: z.string(),
    CONTENTFUL_SPACE_ID: z.string(),
    CONTENTFUL_DELIVERY_ID: z.string(),
    CONTENTFUL_PREVIEW_ID: z.string(),
    CONTENTFUL_CONTENT_MANAGEMENT_TOKEN: z.string(),
});

envVariables.parse(process.env);

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVariables> {}
    }
}