import "./styles/global.scss";

import { ConfigProvider, theme } from "antd";
import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "router";
import { store } from "store";

export const App = () => (
  <Provider store={store}>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Form: {
            marginLG: 32,
          },
        },
        token: {
          colorBgContainer: "#181825",
          colorPrimary: "#FFFFFF",
          colorPrimaryBg: "#000000",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>
);
