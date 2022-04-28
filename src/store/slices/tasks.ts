import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch, RootState } from "../index";
import { ITask, SortEnum } from "../../common-types";
import { db, sortTasks } from "../../utils";
import { DB_COLLECTION } from "../../constans";

interface IAuthState {
  sortBy: string;
  tasks: ITask[] | null;
}

const initialState: IAuthState = {
  sortBy: SortEnum.priority,
  tasks: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state: IAuthState, { payload }: PayloadAction<ITask[]>) => {
      state.tasks = payload;
    },
    sortTasks: (state: IAuthState, { payload }: PayloadAction<string>) => {
      state.sortBy = payload;
      state.tasks = sortTasks(state.tasks, payload);
    },
  },
});

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;

export const getTasks =
  (userId: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch: AppDispatch, getState) => {
    try {
      const {
        tasksStore: { sortBy },
      } = getState();

      const docRef = doc(db, DB_COLLECTION, userId);
      const docSnap = await getDoc(docRef);

      const userData = docSnap.data();

      const arrTask = Object.keys(userData).map((el) => ({
        ...userData[el],
        id: el,
      }));

      dispatch(tasksActions.setTasks(sortTasks(arrTask, sortBy)));
    } catch (err) {
      console.error(err);
    }
  };

export const createTask =
  (userId: string, task: ITask, itemId?: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const reqDate = {
        [itemId ? itemId : uuidv4()]: { ...task },
      };

      const docRef = doc(db, DB_COLLECTION, userId);

      await updateDoc(docRef, reqDate);
    } catch (err) {
      console.error(err);
    }
    dispatch(getTasks(userId));
  };

export const deleteTask =
  (userId: string, taskId: string) => async (dispatch: AppDispatch) => {
    const docRef = doc(db, DB_COLLECTION, userId);

    await updateDoc(docRef, {
      [taskId]: deleteField(),
    });
    dispatch(getTasks(userId));
  };
