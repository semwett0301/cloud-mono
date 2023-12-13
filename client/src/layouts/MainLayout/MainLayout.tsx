import { Layout } from "antd";
import React, { FC, PropsWithChildren, ReactNode } from "react";
import styles from "./styles.module.scss";
import { HeaderBlock } from "components";

const { Header, Content } = Layout;

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Header>
        <HeaderBlock />
      </Header>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
};
