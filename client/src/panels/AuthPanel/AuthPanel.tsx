import { AuthForm } from "forms";
import { MainLayout } from "layouts";
import React, { FC } from "react";

export const AuthPanel: FC = () => (
  <MainLayout>
    <AuthForm />
  </MainLayout>
);
