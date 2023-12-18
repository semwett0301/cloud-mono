import { Layout } from "antd";
import { HeaderBlock } from "components/HeaderBlock";
import React, { FC, PropsWithChildren } from "react";

import styles from "./styles.module.scss";

const { Content, Header } = Layout;

export const MainLayout: FC<PropsWithChildren> = ({ children }) => (
  <Layout className={styles.layout}>
    <Header>
      <HeaderBlock />
    </Header>
    <Content className={styles.content}>{children}</Content>
  </Layout>
);
