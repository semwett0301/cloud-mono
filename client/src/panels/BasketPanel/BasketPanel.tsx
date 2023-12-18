import { SetResponse } from "@project/meta";
import { SetTile } from "components";
import { CreateOrderForm } from "forms";
import { useAppSelector } from "hooks";
import { CatalogLayout, ItemLayout, MainLayout } from "layouts";
import React, { FC } from "react";
import { useCreateOrderMutation } from "services";

export const BasketPanel: FC = () => {
  const sets: SetResponse[] = useAppSelector((state) => state.basket);

  const [createOrder] = useCreateOrderMutation();

  return (
    <MainLayout>
      <ItemLayout>
        <CatalogLayout title="Корзина">
          {sets.map((set) => (
            <SetTile item={set} withAdd={false} />
          ))}
        </CatalogLayout>
        <CreateOrderForm
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
