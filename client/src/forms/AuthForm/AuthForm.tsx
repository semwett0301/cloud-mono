import { AuthLogin, AuthRegister } from "@project/meta";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "services";

import { Routes } from "../../router";
import { setUser } from "../../slices/authSlice";
import styles from "./styles.module.scss";

type AuthFormState = AuthLogin | AuthRegister;

export const AuthForm = () => {
  const [form] = Form.useForm<AuthFormState>();
  const [mode, setMode] = useState<"login" | "register">("login");

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <Form
      form={form}
      onFinish={async (state) => {
        if (mode === "login") {
          const token = (await login(state)) as any;

          if (!token.error) {
            dispatch(setUser(token.data));
            navigate(Routes.Orders);
          }
        } else {
          const token = (await register(state as AuthRegister)) as any;

          if (!token.error) {
            dispatch(setUser(token.data));
            navigate(Routes.Orders);
          }
        }
      }}
    >
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input placeholder="Введите юзернейм" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input placeholder="Введите пароль" />
      </Form.Item>
      {mode === "register" && (
        <>
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input placeholder="Введите имя" />
          </Form.Item>
          <Form.Item name="surname" rules={[{ required: true }]}>
            <Input placeholder="Введите фамилию" />
          </Form.Item>
        </>
      )}
      <Button className={styles.mainButton} type="primary" htmlType="submit">
        {mode === "login" ? "Войти" : "Зарегистрироваться"}
      </Button>
      <Button
        style={{
          marginLeft: 16,
        }}
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
        }}
      >
        {mode === "login" ? "Зарегистрироваться" : "Войти"}
      </Button>
    </Form>
  );
};
