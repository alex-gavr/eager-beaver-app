import { createClient } from 'contentful';

// Contentful connection
const contentful = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_ID,
});

export default contentful;
