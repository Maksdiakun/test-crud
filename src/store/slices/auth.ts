import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AppDispatch } from "../index";
import { db } from "../../utils/firebase";
import { DB_COLLECTION } from "../../constans";
import { ITask, IUser } from "../../common-types";
import { tasksActions } from "./tasks";

interface IAuthState {
  user: IUser | null;
  load: boolean;
}

const initialState: IAuthState = {
  user: null,
  load: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: IAuthState, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    },
    setLoad: (state: IAuthState, { payload }: PayloadAction<boolean>) => {
      state.load = payload;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

export const googleAuth = () => async (dispatch: AppDispatch) => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();

    const { user } = await signInWithPopup(auth, googleProvider);
    const docRef = doc(db, DB_COLLECTION, user.uid);
    const docSnap = await getDoc(docRef);

    let userData = null;
    if (docSnap.exists()) {
      userData = docSnap.data();
    } else {
      await setDoc(docRef, {});
    }

    dispatch(authActions.setUser({ name: user.displayName, id: user.uid }));
    dispatch(tasksActions.setTasks(userData as ITask[]));
  } catch (err) {
    console.error(err);
  }
};

export const checkUser = () => async (dispatch: AppDispatch) => {
  dispatch(authActions.setLoad(true));
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(authActions.setUser({ name: user.displayName, id: user.uid }));
    } else {
      dispatch(authActions.setUser(null));
    }
    dispatch(authActions.setLoad(false));
  });
};

export const logOut = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};
