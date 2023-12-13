import React, { useState } from "react";
import { CatalogLayout, MainLayout } from "layouts";
import { FloatButton } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { SetSortItem } from "@project/meta";
import { useGetSetsQuery } from "services";
import { SetTile } from "../../components/SetTile";
import { useAppDispatch } from "hooks";
import { addItem, removeItem } from "slices";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

export const CatalogPanel = () => {
  const [sort, setSort] = useState<SetSortItem>();
  const [lessPrice, setLessPrice] = useState<number>();
  const [highPrice, setHighPrice] = useState<number>();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { data } = useGetSetsQuery({
    lePrice: lessPrice,
    gePrice: highPrice,
    sort,
  });

  return (
    <MainLayout>
      <CatalogLayout title="Предложенные наборы">
        {data?.map((set) => (
          <SetTile
            item={set}
            key={set.id}
            onBasket={() => {
              dispatch(addItem(set));
            }}
            onOutBasket={() => {
              dispatch(removeItem(set.id));
            }}
            onClick={() => {
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
          navigate(Routes.Basket);
        }}
      />
    </MainLayout>
  );
};
