import React, { FC } from "react";
import { AuthForm } from "forms";
import { MainLayout } from "layouts";

export const AuthPanel: FC = () => {
  return (
    <MainLayout>
      <AuthForm />
    </MainLayout>
  );
};
