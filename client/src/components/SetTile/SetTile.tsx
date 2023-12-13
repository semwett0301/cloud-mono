import { SetResponse } from "@project/meta";
import { Button, Carousel, Typography } from "antd";
import React, { FC, useMemo } from "react";
import styles from "./styles.module.scss";
import { getPhotosFromSet, pathToStatic } from "utils";

interface Props {
  item: SetResponse;
  inBasket?: number;
  onBasket?: () => void;
  onOutBasket?: () => void;
  onClick?: () => void;
  withAdd?: boolean;
}

const { Title, Text } = Typography;

export const SetTile: FC<Props> = ({
  item,
  inBasket,
  onBasket,
  onOutBasket,
  onClick,
  withAdd = true,
}) => {
  const photos = useMemo(() => {
    return getPhotosFromSet(item);
  }, [item]);

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
