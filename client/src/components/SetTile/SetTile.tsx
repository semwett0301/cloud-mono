import { SetResponse } from "@project/meta";
import { Button, Carousel, Typography } from "antd";
import React, { FC, useMemo } from "react";
import styles from "./styles.module.scss";
import { pathToStatic } from "utils";

interface Props {
  item: SetResponse;
  inBasket?: number;
  onBasket?: () => void;
}

const { Title, Text } = Typography;

export const SetTile: FC<Props> = ({ item, inBasket, onBasket }) => {
  const photos = useMemo(() => {
    return item.products.reduce((acc, product) => {
      acc.concat(product.photos);
      return acc;
    }, []);
  }, [item.products]);

  return (
    <div className={styles.container}>
      <Carousel>
        {photos.map((photo) => (
          <img
            key={photo}
            src={pathToStatic(photo)}
            alt={pathToStatic(photo)}
          />
        ))}
      </Carousel>
      <Title level={3}>{item.name}</Title>
      <Text>{item.description}</Text>
      <Title level={2}>{item.price} рублей</Title>
      <Button onClick={onBasket}>
        {inBasket ? `В корзине ${inBasket}` : "Добавить в корзину"}
      </Button>
    </div>
  );
};
