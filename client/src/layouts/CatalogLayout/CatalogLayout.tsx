import { Typography } from "antd";
import React, { FC, PropsWithChildren, ReactNode } from "react";

import styles from "./styles.module.scss";

interface Props {
  title: string;
  topComponent?: ReactNode;
}

const { Title } = Typography;

export const CatalogLayout: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  topComponent,
}) => (
  <div className={styles.container}>
    <Title className={styles.title} level={2}>
      {title}
    </Title>
    {topComponent && topComponent}
    <div className={styles.subContainer}>{children}</div>
  </div>
);
