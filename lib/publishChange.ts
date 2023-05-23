import contentfulManagement from "./contentfulManagement";


export const publishChange = async (entryId: string) => {
  const space = await contentfulManagement.getSpace(process.env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment('master');
  const entry = await environment.getEntry(entryId);
  const result = await entry.publish();

  return result;
};
