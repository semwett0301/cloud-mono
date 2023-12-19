import { SetResponse } from "@project/meta";
import { SetTile } from "components";
import { CreateOrderForm } from "forms";
import { useAppSelector } from "hooks";
import { CatalogLayout, ItemLayout, MainLayout } from "layouts";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { useCreateOrderMutation } from "services";

import styles from "./BasketPanel.module.scss";

export const BasketPanel: FC = () => {
  const sets: SetResponse[] = useAppSelector((state) => state.basket);

  const navigate = useNavigate();

  const [createOrder] = useCreateOrderMutation();

  return (
    <MainLayout>
      <ItemLayout>
        <CatalogLayout title="Корзина">
          {sets.map((set) => (
            <SetTile
              item={set}
              onView={() => {
                navigate(Routes.Set.replace(":id", set.id));
              }}
              withAdd={false}
            />
          ))}
        </CatalogLayout>
        <CreateOrderForm
          className={styles.form}
          disable={!sets.length}
          onFinish={(state) => {
            createOrder({
              ...state,
              set_ids: sets.map((set) => set.id),
            });
          }}
        />
      </ItemLayout>
    </MainLayout>
  );
};
