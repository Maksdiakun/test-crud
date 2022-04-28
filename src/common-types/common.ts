import moment from "moment";

export interface IUser {
  name: string;
  id: string;
}

export interface ITask {
  date: string;
  priority: number;
  description: string;
  done: boolean;
  id?: string;
}

export interface IInternalTask extends Omit<ITask, "date"> {
  date: moment.Moment;
}

export enum SortEnum {
  priority = "priority",
  date = "date",
}
