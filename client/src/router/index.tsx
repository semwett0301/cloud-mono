import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { CatalogPanel } from "panels";

export enum Routes {
  Catalog = "/",
  Orders = "/orders",
}

const routerConfiguration: RouteObject[] = [
  {
    element: <CatalogPanel />,
    path: "/",
  },
];

export const router = createBrowserRouter(routerConfiguration);
