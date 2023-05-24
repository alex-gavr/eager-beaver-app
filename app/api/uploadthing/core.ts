export const runtime = 'edge';

import { createUploadthing, type FileRouter } from 'uploadthing/next';
const uploadThing = createUploadthing();

const auth = (req: Request) => ({ authorization: process.env.NEXT_PUBLIC_API_ROUTE_SECRET });

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: uploadThing
    // Set permissions and file types for this FileRoute
    .fileTypes(['image'])
    .maxSize('512KB')
    .middleware(async (req) => {
      console.log(req);
      // This code runs on your server before upload
      const { authorization } = await auth(req);

      if (authorization !== process.env.NEXT_PUBLIC_API_ROUTE_SECRET) {
        throw new Error('Unauthorized');
      }

      return { userId: 'Authorized' };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);

      console.log(file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
