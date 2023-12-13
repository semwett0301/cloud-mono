import React from "react";
import { MainLayout, OrdersLayout } from "layouts";
import { useGetOrdersQuery } from "services";
import { OrderTile } from "components";

export const OrdersPanel = () => {
  const { data } = useGetOrdersQuery(null);

  return (
    <MainLayout>
      <OrdersLayout>
        {data?.map((order) => (
          <OrderTile onClick={() => {}} item={order} />
        ))}
      </OrdersLayout>
    </MainLayout>
  );
};
