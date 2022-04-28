import React, { FC, useEffect, useState } from "react";
import { Button, Card, Checkbox, DatePicker, Form, Input, Select } from "antd";
import moment from "moment";
import { ITask } from "../../common-types";
import "./style.scss";

const { Option } = Select;
const { Item } = Form;

interface IProps {
  task?: ITask;
  isNew?: boolean;
  onSubmit: (values: ITask) => void;
  onDelete?: () => void;
}

const initValues: ITask = {
  done: false,
  priority: 1,
  date: "",
  description: null,
};

export const TaskItem: FC<IProps> = ({ isNew, onSubmit, task, onDelete }) => {
  const [form] = Form.useForm();
  const [date, setDate] = useState<moment.Moment>(moment());

  const handleSubmit = (values: ITask) => {
    onSubmit({ ...values, date: moment(date).format("DD/MM/YYYY") });

    if (isNew) {
      form.resetFields();
      setDate(moment());
    }
  };

  const handleDate = (date: moment.Moment) => {
    setDate(date);
  };

  const handleDelete = () => {
    onDelete();
  };

  useEffect(() => {
    if (task) {
      setDate(moment(task.date, "DD/MM/YYYY"));
      form.setFieldsValue(task);
    }
  }, [task]);

  return (
    <Card className="task-item">
      <Form
        name="basic"
        autoComplete="off"
        className="form-input"
        initialValues={initValues}
        onFinish={handleSubmit}
        form={form}
      >
        <div className="task-item__header">
          {!isNew && (
            <Item
              name="done"
              className="task-item__done"
              valuePropName="checked"
            >
              <Checkbox />
            </Item>
          )}
          <Item
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
            name="priority"
          >
            <Select placeholder="Choose priority">
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
          </Item>
          <DatePicker
            format={"DD/MM/YYYY"}
            disabledDate={(current) => current && current < moment()}
            onChange={handleDate}
            value={date}
          />
        </div>

        <Item
          name="description"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <Input placeholder="Task description" />
        </Item>

        <div className="task-item__footer">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          {!isNew && (
            <Button type="ghost" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>
      </Form>
    </Card>
  );
};
