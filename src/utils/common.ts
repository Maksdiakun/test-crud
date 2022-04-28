import moment from "moment";
import { ITask, SortEnum } from "../common-types";

const sortByDate = (a: string, b: string) => {
  const dateA: any = moment(a, "DD/MM/YYYY").toDate();
  const dateB: any = moment(b, "DD/MM/YYYY").toDate();
  return dateA - dateB;
};

export const sortTasks = (arr: ITask[], sortBy?: string) => {
  if (sortBy === SortEnum.priority) {
    return [...arr].sort((a, b) => {
      const priorityCond = a.priority - b.priority;
      if (priorityCond === 0) {
        return sortByDate(a.date, b.date);
      } else {
        return priorityCond;
      }
    });
  } else {
    return [...arr].sort((a, b) => sortByDate(a.date, b.date));
  }
};
