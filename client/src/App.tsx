import React from "react";
import { Provider } from "react-redux";
import { store } from "store";
import { RouterProvider } from "react-router-dom";
import { router } from "router";

import "./styles/global.scss";
import { ConfigProvider, theme } from "antd";

export function App() {
  return (
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
}
