import { Layout } from "antd";
import React, { FC, PropsWithChildren, ReactNode } from "react";
import styles from "./styles.module.scss";

const { Header, Content } = Layout;

interface Props {
  header: ReactNode;
}

export const MainLayout: FC<PropsWithChildren<Props>> = ({
  header,
  children,
}) => {
  return (
    <Layout className={styles.layout}>
      <Header>{header}</Header>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
};
