import { Typography } from "antd";
import React, { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes } from "router";

import { useMeQuery } from "../../services";
import styles from "./HeaderBlock.module.scss";
import { NavTabs } from "./NavTabs";

const { Title } = Typography;

export const HeaderBlock: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isError, isLoading, isSuccess } = useMeQuery(null);

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
            key: isLoading || isError ? Routes.Auth : Routes.Orders,
            label: isLoading || isError ? "Авторизоваться" : "Ваши заказы",
            onClick: () => {
              if (isError || !isSuccess) {
                navigate(Routes.Auth);
              } else {
                navigate(Routes.Orders);
              }
            },
          },
        ]}
      />
    </div>
  );
};
