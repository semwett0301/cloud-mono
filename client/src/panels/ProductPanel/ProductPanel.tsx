import React, { FC, useMemo } from "react";
import { ItemLayout, MainLayout } from "layouts";
import { getPhotosFromSet, pathToStatic } from "utils";
import { Routes } from "router";
import { Carousel, FloatButton, List, Typography } from "antd";
import { useGetProductByIdQuery, useGetSetByIdQuery } from "services";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BackwardOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const ProductPanel: FC = () => {
  const { id } = useParams();

  const { data } = useGetProductByIdQuery(id);

  const navigate = useNavigate();

  return (
    <MainLayout>
      <ItemLayout>
        <Carousel>
          {data?.photos.map((photo) => (
            <img
              key={photo}
              src={pathToStatic(photo)}
              alt={pathToStatic(photo)}
            />
          ))}
        </Carousel>
        <Title level={3}>{data?.name}</Title>
        <Paragraph>{data?.description}</Paragraph>
        <FloatButton
          shape="circle"
          style={{ left: 24, top: 24 }}
          icon={<BackwardOutlined />}
          onClick={() => {
            navigate(-1);
          }}
        />
      </ItemLayout>
    </MainLayout>
  );
};
