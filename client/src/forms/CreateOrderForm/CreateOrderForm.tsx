import { OrderCreateRequest } from "@project/meta";
import { Button, Calendar, Form, Input } from "antd";
import React, { FC, useEffect } from "react";
import styles from "./CreateChatForm.module.scss";

type CreateOrderFormState = Omit<OrderCreateRequest, "set_ids">;

const layout = {
  labelCol: { span: 6 },
};

interface Props {
  defaultItem?: Omit<OrderCreateRequest, "set_ids">;
  onFinish: (state: CreateOrderFormState) => void;
}

export const CreateOrderForm: FC<Props> = ({ defaultItem }) => {
  const [form] = Form.useForm<CreateOrderFormState>();

  useEffect(() => {
    if (defaultItem) {
      form.setFieldsValue(defaultItem);
    }
  }, [defaultItem]);

  return (
    <Form style={{ width: "50%" }} form={form} {...layout}>
      <Form.Item
        name="address"
        label="Адрес доставки"
        rules={[{ required: true }]}
      >
        <Input placeholder="Введите адрес доставки" />
      </Form.Item>
      <Form.Item
        name="arrival_date"
        label="Дата доставки"
        rules={[{ required: true }]}
      >
        <Calendar fullscreen={false} />
      </Form.Item>
      <Button className={styles.button} htmlType="submit">
        {defaultItem ? "Отредактировать заказ" : "Создать заказ"}
      </Button>
    </Form>
  );
};
