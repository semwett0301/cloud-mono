import React, { FC, PropsWithChildren } from "react";
import styles from "./styles.module.scss";

export const ItemLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
