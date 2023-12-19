import { BackwardOutlined } from "@ant-design/icons";
import { Carousel, FloatButton, Typography } from "antd";
import { ItemLayout, MainLayout } from "layouts";
import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "services";
import { pathToStatic } from "utils";

import styles from "./ProductPanel.module.scss";

const { Paragraph, Title } = Typography;

export const ProductPanel: FC = () => {
  const { id } = useParams();

  const { data } = useGetProductByIdQuery(id);

  const navigate = useNavigate();

  return (
    <MainLayout>
      <ItemLayout>
        <Carousel className={styles.carousel}>
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
          style={{ left: 24, top: 96 }}
          icon={<BackwardOutlined />}
          onClick={() => {
            navigate(-1);
          }}
        />
      </ItemLayout>
    </MainLayout>
  );
};
