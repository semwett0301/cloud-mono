import { SetResponse } from "@project/meta";

export const getPhotosFromSet = (item: SetResponse) =>
  item.products.reduce((acc, product) => {
    acc.concat(product.photos);

    return acc;
  }, []);
