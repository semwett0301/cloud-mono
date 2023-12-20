import { BackwardOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { SetTile } from "components";
import { CreateOrderForm } from "forms";
import { CatalogLayout, ItemLayout, MainLayout } from "layouts";
import React, { FC, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useChangeOrderMutation,
  useDeleteOrderMutation,
  useGetOrderByIdQuery,
  useReturnOrderMutation,
} from "services";

import styles from "./OrderPanel.module.scss";

export const OrderPanel: FC = () => {
  const { id } = useParams();

  const { data } = useGetOrderByIdQuery(id);
  const [updateOrder] = useChangeOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [returnOrder] = useReturnOrderMutation();

  const navigate = useNavigate();

  const disable = useMemo(
    () => new Date().valueOf() > new Date(data?.arrival_date).valueOf(),
    [data?.arrival_date],
  );

  const fitDisable = useMemo(() => {
    const timeDiff = Math.abs(
      new Date().getTime() - new Date(data?.arrival_date).getTime(),
    );
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays > 7;
  }, [data?.arrival_date]);

  return (
    <MainLayout>
      <ItemLayout>
        <CatalogLayout title="Заказанные наборы">
          {data?.sets.map((set) => <SetTile item={set} withAdd={false} />)}
        </CatalogLayout>
        <CreateOrderForm
          className={styles.form}
          disable={disable}
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
          onDelete={
            !disable
              ? async () => {
                  await deleteOrder(id);
                  navigate(-1);
                }
              : undefined
          }
          onDefect={
            disable
              ? async () => {
                  await returnOrder({ id, type: "defect" });
                  navigate(-1);
                }
              : undefined
          }
          onNotFit={
            !fitDisable
              ? async () => {
                  await returnOrder({ id, type: "non-fit" });
                  navigate(-1);
                }
              : undefined
          }
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
