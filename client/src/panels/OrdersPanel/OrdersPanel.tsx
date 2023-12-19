import { OrderTile } from "components";
import { MainLayout, OrdersLayout } from "layouts";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { useGetOrdersQuery } from "services";

export const OrdersPanel = () => {
  const { data } = useGetOrdersQuery(null);

  const navigate = useNavigate();

  return (
    <MainLayout>
      <OrdersLayout>
        {data?.map((order) => (
          <OrderTile
            item={order}
            onClick={() => {
              navigate(Routes.Order.replace(":id", order.id));
            }}
          />
        ))}
      </OrdersLayout>
    </MainLayout>
  );
};
