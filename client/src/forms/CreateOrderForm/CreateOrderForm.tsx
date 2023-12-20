import { OrderCreateRequest } from "@project/meta";
import { Button, Calendar, Form, Input } from "antd";
import dayjs from "dayjs";
import React, { FC, useEffect } from "react";

import { classNames } from "../../utils";
import styles from "./CreateChatForm.module.scss";

type CreateOrderFormState = Omit<OrderCreateRequest, "set_ids">;

const layout = {
  labelCol: { span: 6 },
};

interface Props {
  className?: string;
  defaultItem?: Omit<OrderCreateRequest, "set_ids">;
  disable?: boolean;
  onDefect?: () => void;
  onDelete?: () => Promise<void> | void;
  onFinish: (state: CreateOrderFormState) => void;
  onNotFit?: () => void;
}

export const CreateOrderForm: FC<Props> = ({
  className,
  defaultItem,
  disable = false,
  onDefect,
  onDelete,
  onFinish,
  onNotFit,
}) => {
  const [form] = Form.useForm<CreateOrderFormState>();

  useEffect(() => {
    if (defaultItem) {
      form.setFieldsValue({
        address: defaultItem?.address,
        arrival_date: dayjs(defaultItem?.arrival_date),
      });
    } else {
      form.setFieldsValue({
        arrival_date: dayjs().add(1, "days"),
      });
    }
  }, [defaultItem?.arrival_date, defaultItem?.address]);

  return (
    <Form
      className={className}
      style={{ width: "50%" }}
      form={form}
      onFinish={onFinish}
      {...layout}
    >
      <Form.Item
        name="address"
        label="Адрес доставки"
        rules={[{ required: true }]}
      >
        <Input disabled={disable} placeholder="Введите адрес доставки" />
      </Form.Item>
      <Form.Item
        name="arrival_date"
        label="Дата доставки"
        rules={[{ required: true }]}
      >
        {!disable ? (
          <Calendar
            disabledDate={(date) =>
              date.toDate().valueOf() < new Date().valueOf()
            }
            defaultValue={dayjs().add(2, "days")}
            className={styles.calendar}
            fullscreen={false}
          />
        ) : (
          dayjs(defaultItem?.arrival_date).format("DD.MM.YYYY")
        )}
      </Form.Item>
      <Button disabled={disable} className={styles.button} htmlType="submit">
        {defaultItem ? "Отредактировать заказ" : "Создать заказ"}
      </Button>
      {onDelete && (
        <Button
          danger
          onClick={onDelete}
          className={classNames(styles.button, styles.deleteButton)}
          htmlType="button"
        >
          Отменить заказ
        </Button>
      )}
      {onNotFit && (
        <Button
          danger
          onClick={onNotFit}
          className={classNames(styles.button, styles.deleteButton)}
          htmlType="button"
        >
          Вернуть из-за неподходящего размера
        </Button>
      )}
      {onDefect && (
        <Button
          danger
          onClick={onDefect}
          className={classNames(styles.button, styles.deleteButton)}
          htmlType="button"
        >
          Вернуть из-за брака
        </Button>
      )}
    </Form>
  );
};
