import { SetResponse } from "@project/meta";

export const getPhotosFromSet: (item?: SetResponse) => string[] = (item) =>
  item?.products
    .reduce((acc, product) => {
      product.photos.forEach((photo) => {
        acc.push(photo);
      });

      return acc;
    }, [])
    .reduce((acc: string[], item: string) => {
      if (acc.includes(item)) {
        return acc;
      }

      return [...acc, item];
    }, []);
