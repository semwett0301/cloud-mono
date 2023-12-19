import { DollarOutlined } from "@ant-design/icons";
import { SetSortItem } from "@project/meta";
import { FloatButton } from "antd";
import { ParamsSector, SetTile } from "components";
import { useAppDispatch, useAppSelector } from "hooks";
import { CatalogLayout, MainLayout } from "layouts";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { useGetSetsQuery, useMeQuery } from "services";
import { addItem, removeItem } from "slices";

export const CatalogPanel = () => {
  const [sort, setSort] = useState<SetSortItem>();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const basket = useAppSelector((state) => state.basket);

  const { data } = useGetSetsQuery({
    sort,
  });

  const { isError } = useMeQuery(null);

  return (
    <MainLayout>
      <ParamsSector sort={sort} onSort={setSort} />
      <CatalogLayout title="Предложенные наборы">
        {data?.map((set) => (
          <SetTile
            item={set}
            key={set.id}
            inBasket={
              basket.filter((basketSet) => set.id === basketSet.id).length
            }
            onBasket={() => {
              dispatch(addItem(set));
            }}
            onOutBasket={() => {
              dispatch(removeItem(set.id));
            }}
            onView={() => {
              navigate(Routes.Set.replace(":id", set.id));
            }}
          />
        ))}
      </CatalogLayout>
      <FloatButton
        shape="circle"
        style={{ right: 24 }}
        icon={<DollarOutlined />}
        onClick={() => {
          if (isError) navigate(Routes.Auth);
          else navigate(Routes.Basket);
        }}
      />
    </MainLayout>
  );
};
