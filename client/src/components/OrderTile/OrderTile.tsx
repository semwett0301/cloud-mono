import { OrderResponse } from "@project/meta";
import { Button } from "antd";
import { format } from "date-fns";
import React, { FC } from "react";

import styles from "./styles.module.scss";

interface Props {
  item: OrderResponse;
  onClick?: () => void;
}

export const OrderTile: FC<Props> = ({ item, onClick }) => (
  <div className={styles.container}>
    <div className={styles.info}>
      <span>Адрес: {item.address}</span>
      <span>
        Дата доставки: {format(new Date(item.arrival_date), "dd.MM.yyyy")}
      </span>
      <span>Количество наборов: {item.set_count}</span>
    </div>
    <Button onClick={onClick}>Редактировать</Button>
  </div>
);
