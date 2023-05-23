import contentful from '@/lib/contentful';

const getFutureEvents = async () => {
  const response = await contentful
    .getEntries({
      content_type: 'futureEvents',
      // @ts-ignore
      order: `fields.id`,
    })
    .then((response) => response.items);

  const data = response.map((data) => {
    const entryId = data.sys.id;
    const fields = data.fields;
    return {
      entryId,
      fields,
    };
  });

  return data;
};
export default getFutureEvents;
