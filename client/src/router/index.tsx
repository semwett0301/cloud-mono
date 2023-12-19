import {
  AuthPanel,
  BasketPanel,
  CatalogPanel,
  NotFoundPage,
  OrderPanel,
  OrdersPanel,
  ProductPanel,
  SetPanel,
} from "panels";
import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export enum Routes {
  Auth = "/auth",
  Basket = "/basket",
  Catalog = "/",
  Order = "/orders/:id",
  Orders = "/orders",
  Product = "/products/:id",
  Set = "/sets/:id",
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
  {
    element: <NotFoundPage />,
    path: "*",
  },
];

export const router = createBrowserRouter(routerConfiguration);
