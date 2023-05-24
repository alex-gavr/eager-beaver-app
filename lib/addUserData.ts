
// import { v4 as uuid } from 'uuid';
// import contentfulManagement from './contentfulManagement';

// export const addUserData = async (name: string, phone: string) => {

//   const space = await contentfulManagement.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!);
//   const environment = await space.getEnvironment('master');

//   const id = uuid();
//   const email = 'we@donno.com';
//   const beaverCoins = 500;
//   const submitTime = new Date();

//   const entry = await environment.createEntry('usersData', {
//     fields: {
//       id: {
//         'en-US': id,
//       },
//       name: {
//         'en-US': `${name}`,
//       },
//       email: {
//         'en-US': email,
//       },
//       phone: {
//         'en-US': `${phone}`,
//       },
//       beaverCoins: {
//         'en-US': beaverCoins,
//       },
//       submitTime: {
//         'en-US': submitTime,
//       },
//     },
//   });

//   return entry;
// };
