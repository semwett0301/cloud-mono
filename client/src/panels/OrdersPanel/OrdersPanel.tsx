import { OrderTile } from "components";
import { MainLayout, OrdersLayout } from "layouts";
import React from "react";
import { useGetOrdersQuery } from "services";

export const OrdersPanel = () => {
  const { data } = useGetOrdersQuery(null);

  return (
    <MainLayout>
      <OrdersLayout>
        {data?.map((order) => <OrderTile item={order} />)}
      </OrdersLayout>
    </MainLayout>
  );
};
