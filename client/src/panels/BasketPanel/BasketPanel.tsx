import { SetResponse } from "@project/meta";
import { SetTile } from "components";
import { CreateOrderForm } from "forms";
import { useAppDispatch, useAppSelector } from "hooks";
import { CatalogLayout, ItemLayout, MainLayout } from "layouts";
import React, { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { useCreateOrderMutation } from "services";

import { addItem, removeItem } from "../../slices";
import styles from "./BasketPanel.module.scss";

export const BasketPanel: FC = () => {
  const sets: SetResponse[] = useAppSelector((state) => state.basket);

  const navigate = useNavigate();

  const [createOrder] = useCreateOrderMutation();

  const dispatch = useAppDispatch();

  const resultSets = useMemo(
    () =>
      sets.reduce((acc, set) => {
        if (!acc.includes(set)) return [...acc, set];

        return acc;
      }, []),
    [sets],
  );

  return (
    <MainLayout>
      <ItemLayout>
        <CatalogLayout title="Корзина">
          {resultSets.map((set) => (
            <SetTile
              item={set}
              onBasket={() => {
                dispatch(addItem(set));
              }}
              onOutBasket={() => {
                dispatch(removeItem(set.id));
              }}
              onView={() => {
                navigate(Routes.Set.replace(":id", set.id));
              }}
              inBasket={
                sets.filter((basketSet) => set.id === basketSet.id).length
              }
            />
          ))}
        </CatalogLayout>
        <CreateOrderForm
          className={styles.form}
          disable={!sets.length}
          onFinish={async (state) => {
            await createOrder({
              ...state,
              set_ids: sets.map((set) => set.id),
            });
            navigate(Routes.Orders);
          }}
        />
      </ItemLayout>
    </MainLayout>
  );
};
