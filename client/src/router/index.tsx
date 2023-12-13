import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import {
  BasketPanel,
  CatalogPanel,
  OrderPanel,
  OrdersPanel,
  ProductPanel,
  SetPanel,
} from "panels";
import { AuthPanel } from "../panels/AuthPanel/AuthPanel";

export enum Routes {
  Catalog = "/",
  Orders = "/orders",
  Order = "/orders/:id",
  Basket = "/basket",
  Set = "/sets/:id",
  Product = "/products/:id",
  Auth = "/auth",
}

const routerConfiguration: RouteObject[] = [
  {
    element: <CatalogPanel />,
    path: Routes.Catalog,
  },
  {
    element: <SetPanel />,
    path: Routes.Set,
  },
  {
    element: <ProductPanel />,
    path: Routes.Product,
  },
  {
    element: <BasketPanel />,
    path: Routes.Basket,
  },
  {
    element: <OrdersPanel />,
    path: Routes.Orders,
  },
  {
    element: <OrderPanel />,
    path: Routes.Order,
  },
  {
    element: <AuthPanel />,
    path: Routes.Auth,
  },
];

export const router = createBrowserRouter(routerConfiguration);
