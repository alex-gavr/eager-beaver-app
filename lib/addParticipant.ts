import contentfulManagement from "./contentfulManagement";


export const addParticipant = async (entryId: string, newValue: number) => {
  const space = await contentfulManagement.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!);
  const environment = await space.getEnvironment('master');
  const entry = await environment.getEntry(entryId);
  entry.fields.participants['en-US'] = newValue;

  const result = await entry.update();

  return result;
};
