import { SetResponse } from "@project/meta";
import { Button, Carousel, Typography } from "antd";
import React, { FC, useMemo } from "react";
import { getPhotosFromSet, pathToStatic } from "utils";

import styles from "./styles.module.scss";

interface Props {
  inBasket?: number;
  item: SetResponse;
  onBasket?: () => void;
  onOutBasket?: () => void;
  onView?: () => void;
  withAdd?: boolean;
}

const { Text, Title } = Typography;

export const SetTile: FC<Props> = ({
  inBasket,
  item,
  onBasket,
  onOutBasket,
  onView,
  withAdd = true,
}) => {
  const photos = useMemo(() => getPhotosFromSet(item), [item]);

  return (
    <div className={styles.container}>
      <Title level={2}>{item.name}</Title>
      <Text className={styles.description}>{item.description}</Text>
      <Carousel className={styles.carousel}>
        {photos.map((photo) => (
          <img src={pathToStatic(photo)} alt={pathToStatic(photo)} />
        ))}
      </Carousel>
      <Title level={3} className={styles.price}>
        {item.price} рублей
      </Title>
      {withAdd && (
        <div className={styles.buttonContainer}>
          <Button
            className={styles.basketButton}
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              onBasket();
            }}
          >
            {inBasket ? `В корзине ${inBasket}` : "Добавить в корзину"}
          </Button>
          {!!inBasket && (
            <Button
              danger
              onClick={(e) => {
                e.stopPropagation();
                onOutBasket();
              }}
            >
              Удалить
            </Button>
          )}
        </div>
      )}
      <Button
        className={styles.viewButton}
        onClick={(e) => {
          e.stopPropagation();
          if (onView) onView();
        }}
      >
        Просмотреть
      </Button>
    </div>
  );
};
