export interface ILink {
  id: number;
  name: string;
  to: string;
}

export interface IDeviceType {
  isMobileOnly: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// CONTENTFUL
interface IImage {
  fields: {
    file: {
      url: string;
    };
  };
}
export interface ITeachers {
  id: number;
  name: string;
  description: string;
  image: IImage;
}
export interface IFaqs {
  id: number;
  question: string;
  description: string;
}
export interface IPrices {
  id: number;
  name: string;
  price: string;
  cardColor: string;
  feature1: string;
  feature2: string;
  feature3: string;
}

export interface IReviews {
  image: IImage;
  id: number;
  name: string;
  parent: string;
  relationToChild: string;
  review: string;
}
export interface IFutureEvents {
  entryId: string;
  fields: {
    id: number;
    title: string;
    description: string;
    age: string;
    durationLongerThanDay: boolean;
    dateStart: string;
    dateFinish: string;
    participants: number;
    totalSpots: number;
    price: string;
  };
}
