import React, { useState } from "react";
import { CatalogLayout, MainLayout } from "layouts";
import { HeaderBlock } from "components";
import { FloatButton } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { SetSortItem } from "@project/meta";
import { useGetSetsQuery } from "services";
import { SetTile } from "../../components/SetTile";

export const CatalogPanel = () => {
  const [sort, setSort] = useState<SetSortItem>();
  const [lessPrice, setLessPrice] = useState<number>();
  const [highPrice, setHighPrice] = useState<number>();

  const { data } = useGetSetsQuery({
    lePrice: lessPrice,
    gePrice: highPrice,
    sort,
  });

  return (
    <MainLayout header={<HeaderBlock />}>
      <CatalogLayout title="Предложенные наборы">
        {data?.map((set) => (
          <SetTile item={set} key={set.id} />
        ))}
      </CatalogLayout>
      <FloatButton
        shape="circle"
        style={{ right: 24 }}
        icon={<DollarOutlined />}
      />
    </MainLayout>
  );
};
