import { SetSortItem } from "@project/meta";
import { Select, Slider } from "antd";
import React, { FC } from "react";

import styles from "./ParamsSector.module.scss";

interface Props {
  onSort?: (sort: SetSortItem) => void;
  sort?: SetSortItem;
}

export const ParamsSector: FC<Props> = ({ onSort, sort }) => (
  <div className={styles.container}>
    <Select
      placeholder="Сортировать по цене"
      value={sort}
      options={[
        {
          label: "По возрастанию",
          value: "+price",
        },
        {
          label: "По убыванию",
          value: "-price",
        },
      ]}
      onChange={onSort}
    />
  </div>
);
