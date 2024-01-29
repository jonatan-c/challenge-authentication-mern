import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clientAxios from "../../api";
import { AppThunk, RootState } from "../store";
import tokenAuth from "../../api/tokenAuth";
import { IRespLogin, IRespVerify, IResRegister } from "../../interfaces/auth";

interface User {
  id: string;
  username: string;
  email: string;
}

export interface IUser {
  data: User;
  token: string;
}

interface IAuthentication {
  loading: boolean;
  error: Error | null;
  user: IUser;
  isAuth: boolean;
}

const initialState: IAuthentication = {
  loading: false,
  error: null,
  user: {} as IUser,
  isAuth: false,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        loading: false,
        error: null,
      };
    },
    errorRegister: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    loginUser: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
        isAuth: true,
      };
    },
    errorLogin: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    isLoginCheck: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
        isAuth: true,
      };
    },
    logoutUser: (state) => {
      return {
        ...state,
        loading: false,
        error: null,
        user: {} as IUser,
        isAuth: false,
      };
    },
  },
});

export const register = (body: any): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await clientAxios.post<IResRegister>(
        "/auth/register",
        body
      );

      if (response.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User created successfully",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error creating user",
          showConfirmButton: false,
          timer: 3000,
        });
      }
      dispatch(registerUser(body));
    } catch (error: any) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.response,
        showConfirmButton: false,
        timer: 3000,
      });
      dispatch(errorRegister(error as Error));
    }
  };
};

export const login = (body: any): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await clientAxios.post<IRespLogin>("/auth/login", body);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "User logged in successfully",
        showConfirmButton: false,
        timer: 3000,
      });
      dispatch(loginUser(response.data));
      localStorage.setItem("token", response.data.token);
      dispatch(isLoginCheck(response.data));
    } catch (error: any) {
      console.log(error);

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error logging in",
        showConfirmButton: false,
        timer: 3000,
      });
      dispatch(errorLogin(error.response.data.message as Error));
    }
  };
};

export const checkAuth = (): AppThunk => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    } else {
      return;
    }

    try {
      const response = await clientAxios.get<IRespVerify>("/auth/verify");
      dispatch(isLoginCheck(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = (): AppThunk => {
  return async (dispatch) => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
  };
};

export const {
  registerUser,
  isLoginCheck,
  loginUser,
  errorRegister,
  errorLogin,
  logoutUser,
} = authenticationSlice.actions;

export const selectCount = (state: RootState): any => state.authentication;

export default authenticationSlice.reducer;
