import { SetResponse } from "@project/meta";
import { Button, Carousel, Typography } from "antd";
import React, { FC, useMemo } from "react";
import { getPhotosFromSet, pathToStatic } from "utils";

import styles from "./styles.module.scss";

interface Props {
  inBasket?: number;
  item: SetResponse;
  onBasket?: () => void;
  onClick?: () => void;
  onOutBasket?: () => void;
  withAdd?: boolean;
}

const { Text, Title } = Typography;

export const SetTile: FC<Props> = ({
  inBasket,
  item,
  onBasket,
  onClick,
  onOutBasket,
  withAdd = true,
}) => {
  const photos = useMemo(() => getPhotosFromSet(item), [item]);

  return (
    <div className={styles.container} onClick={onClick}>
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
      {withAdd && (
        <div className={styles.buttonContainer}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onBasket();
            }}
          >
            {inBasket ? `В корзине ${inBasket}` : "Добавить в корзину"}
          </Button>
          {inBasket && (
            <Button
              danger
              onClick={(e) => {
                e.stopPropagation();
                onOutBasket();
              }}
            >
              Удалить из корзины
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
