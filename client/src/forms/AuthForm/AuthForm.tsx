import { AuthLogin, AuthRegister } from "@project/meta";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "services";

type AuthFormState = AuthLogin | AuthRegister;

export const AuthForm = () => {
  const [form] = Form.useForm<AuthFormState>();
  const [mode, setMode] = useState<"login" | "register">("login");

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  return (
    <Form
      form={form}
      onFinish={(state) => {
        if (mode === "login") {
          login(state);
        } else {
          register(state as AuthRegister);
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
      <Button htmlType="submit">
        {mode === "login" ? "Войти" : "Зарегистрироваться"}
      </Button>
      <Button
        ghost
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
