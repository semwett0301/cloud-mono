import { Typography } from "antd";
import React, { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes } from "router";

import styles from "./HeaderBlock.module.scss";
import { NavTabs } from "./NavTabs";

const { Title } = Typography;

export const HeaderBlock: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <Title
        className={styles.name}
        onClick={() => {
          navigate(Routes.Catalog);
        }}
      >
        Best.Sale
      </Title>
      <NavTabs
        selectedKey={location.pathname}
        items={[
          {
            key: Routes.Catalog,
            label: "Каталог",
            onClick: () => {
              navigate(Routes.Catalog);
            },
          },
          {
            key: Routes.Orders,
            label: "Ваши заказы",
            onClick: () => {
              navigate(Routes.Orders);
            },
          },
        ]}
      />
    </div>
  );
};
