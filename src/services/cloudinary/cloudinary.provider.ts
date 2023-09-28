import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return v2.config({
      cloud_name: 'dflfsbl2h',
      api_key: '327838789736163',
      api_secret: 'Dp9A5sOpy8neWgNwhA2JPs0iozA',
    });
  },
};
