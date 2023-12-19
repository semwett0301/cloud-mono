import { Button, Layout, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

import styles from "./NotFoundPage.module.scss";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Layout className={styles.layout}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            onClick={() => {
              navigate(Routes.Catalog);
            }}
          >
            Back Home
          </Button>
        }
      />
    </Layout>
  );
};
