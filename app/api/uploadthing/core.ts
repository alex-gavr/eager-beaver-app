/** app/api/uploadthing/core.ts */
export const runtime = 'nodejs'
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '512KB', maxFileCount: 10 } })
    // Set permissions and file types for this FileRoute

    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
