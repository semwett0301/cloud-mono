import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useChangeOrderMutation, useGetOrderByIdQuery } from "services";
import { CatalogLayout, ItemLayout, MainLayout } from "layouts";
import { SetTile } from "components";
import { CreateOrderForm } from "forms";

export const OrderPanel: FC = () => {
  const { id } = useParams();

  const { data } = useGetOrderByIdQuery(id);
  const [updateOrder] = useChangeOrderMutation();

  return (
    <MainLayout>
      <ItemLayout>
        <CatalogLayout title="Заказанные наборы">
          {data?.sets.map((set) => (
            <SetTile item={set} withAdd={false} />
          ))}
        </CatalogLayout>
        <CreateOrderForm
          defaultItem={{
            address: data?.address,
            arrival_date: data?.arrival_date,
          }}
          onFinish={(state) => {
            updateOrder({
              id: data?.id,
              ...state,
            });
          }}
        />
      </ItemLayout>
    </MainLayout>
  );
};
