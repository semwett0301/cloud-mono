import { Menu, MenuProps } from "antd";
import React, { FC } from "react";

import styles from "./NavTabs.module.scss";

interface Props {
  items: MenuProps["items"];
  selectedKey?: string;
}

export const NavTabs: FC<Props> = ({ items, selectedKey }) => {
  return (
    <Menu
      className={styles.menu}
      mode="horizontal"
      selectedKeys={[selectedKey]}
      items={items}
    />
  );
};
