import { BackwardOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { SetTile } from "components";
import { CreateOrderForm } from "forms";
import { CatalogLayout, ItemLayout, MainLayout } from "layouts";
import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useChangeOrderMutation,
  useDeleteOrderMutation,
  useGetOrderByIdQuery,
} from "services";

import styles from "./OrderPanel.module.scss";

export const OrderPanel: FC = () => {
  const { id } = useParams();

  const { data } = useGetOrderByIdQuery(id);
  const [updateOrder] = useChangeOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const navigate = useNavigate();

  return (
    <MainLayout>
      <ItemLayout>
        <CatalogLayout title="Заказанные наборы">
          {data?.sets.map((set) => <SetTile item={set} withAdd={false} />)}
        </CatalogLayout>
        <CreateOrderForm
          className={styles.form}
          defaultItem={{
            address: data?.address,
            arrival_date: data?.arrival_date,
          }}
          onFinish={async (state) => {
            navigate(-1);
            await updateOrder({
              id: data?.id,
              ...state,
            });
          }}
          onDelete={async () => {
            await deleteOrder(id);
            navigate(-1);
          }}
        />
      </ItemLayout>
      <FloatButton
        shape="circle"
        style={{ left: 24, top: 96 }}
        icon={<BackwardOutlined />}
        onClick={() => {
          navigate(-1);
        }}
      />
    </MainLayout>
  );
};
