import { Carousel, List, Typography } from "antd";
import { ItemLayout, MainLayout } from "layouts";
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "router";
import { useGetSetByIdQuery } from "services";
import { getPhotosFromSet, pathToStatic } from "utils";

const { Paragraph, Title } = Typography;

export const SetPanel = () => {
  const { id } = useParams();

  const { data } = useGetSetByIdQuery(id);

  const photos = useMemo(() => getPhotosFromSet(data), [data]);

  const navigate = useNavigate();

  return (
    <MainLayout>
      <ItemLayout>
        <Carousel>
          {photos?.map((photo) => (
            <img
              key={photo}
              src={pathToStatic(photo)}
              alt={pathToStatic(photo)}
            />
          ))}
        </Carousel>
        <Title level={2}>{data?.price}</Title>
        <Title level={3}>{data?.name}</Title>
        <Paragraph>{data?.description}</Paragraph>
        <List
          size="small"
          header="Продукты в наборе"
          dataSource={data?.products}
          renderItem={(item) => (
            <List.Item
              onClick={() => {
                navigate(Routes.Product.replace(":id", item.id));
              }}
            >
              {item.name}
            </List.Item>
          )}
        />
      </ItemLayout>
    </MainLayout>
  );
};
