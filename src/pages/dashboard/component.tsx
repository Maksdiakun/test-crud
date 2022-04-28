import React, { FC, useEffect } from "react";
import { Button, Select } from "antd";
import { TaskItem } from "../../components/task-item";
import {
  createTask,
  logOut as logOutAction,
  tasksActions,
} from "../../store/slices";
import { ITask, IUser, SortEnum } from "../../common-types";
import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  deleteTask as deleteTaskAction,
  getTasks,
} from "../../store/slices/tasks";

const { Option } = Select;

interface IProps {
  user: IUser;
}

export const Dashboard: FC<IProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const { tasks, sortBy } = useAppSelector((state) => state.tasksStore);

  useEffect(() => {
    dispatch(getTasks(user.id));
  }, []);

  const submitTask = (itemId?: string) => (task: ITask) => {
    dispatch(createTask(user.id, task, itemId));
  };

  const deleteTask = (itemId: string) => () => {
    dispatch(deleteTaskAction(user.id, itemId));
  };

  const handleSort = (value: string) => {
    dispatch(tasksActions.sortTasks(value));
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h5>{user.name}</h5>
        <Button type="ghost" onClick={logOutAction}>
          Log out
        </Button>
      </div>
      <h3>Create new task</h3>
      <TaskItem isNew={true} onSubmit={submitTask()} />
      <div className="dashboard__title">
        <>
          <h3>List of tasks</h3>
          <Select placeholder="Sort by " value={sortBy} onChange={handleSort}>
            <Option value={SortEnum.priority}> Highest priority</Option>
            <Option value={SortEnum.date}>Nearest date</Option>
          </Select>
        </>
      </div>
      {tasks &&
        tasks.length > 0 &&
        tasks.map((el) => (
          <TaskItem
            task={el}
            key={el.id}
            onSubmit={submitTask(el.id)}
            onDelete={deleteTask(el.id)}
          />
        ))}
    </div>
  );
};
