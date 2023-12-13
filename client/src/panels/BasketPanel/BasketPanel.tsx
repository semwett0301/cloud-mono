import React, { FC } from "react";
import { CatalogLayout, ItemLayout, MainLayout } from "layouts";
import { useAppSelector } from "hooks";
import { useCreateOrderMutation } from "services";
import { CreateOrderForm } from "forms";
import { SetResponse } from "@project/meta";
import { SetTile } from "components";

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
