import contentful from 'contentful-management';

const contentfulManagement = contentful.createClient({
  accessToken: process.env.CONTENTFUL_CONTENT_MANAGEMENT_TOKEN,
});

export default contentfulManagement;
