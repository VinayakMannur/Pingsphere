import { createSlice } from "@reduxjs/toolkit";
import {showSnackbar} from "./app"
import axios from "../../utils/axios";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  email: "",
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
      state.error = action.payload.error;
    },
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    signOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },
    updateSignupEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

export default slice.reducer;

export function LoginUser(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "auth/login",
        {
          ...formValues,
        },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((responce) => {
        console.log(responce);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: responce.data.authToken,
          })
        );
        window.localStorage.setItem("user_id",responce.data.user_id)
        dispatch(showSnackbar({severity: "success", message: responce.data.msg}))
      })
      .catch((error) => {
        console.log(error);
        dispatch(showSnackbar({severity: "error", message: error.response.data.msg}))
      });
  };
}

export function LogoutUser() {
  return async (dispatch, getState) => {
    window.localStorage.removeItem("user_id")
    dispatch(slice.actions.signOut());
  };
}

export function ResetPassword(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/forgot-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((responce) => {
        console.log(responce);
        dispatch(showSnackbar({severity: "success", message: responce.data.msg}))
      })
      .catch((error) => {
        console.log(error);
        dispatch(showSnackbar({severity: "error", message: error.response.data.msg}))
      });
  };
}

export function UpdatePassword(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/reset-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((responce) => {
        console.log(responce);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: responce.data.authToken,
          })
        );
        dispatch(showSnackbar({severity: "success", message: responce.data.msg}))
      })
      .catch((error) => {
        console.log(error);
        dispatch(showSnackbar({severity: "error", message: error.response.data.msg}))
      });
  };
}

export function SignupUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post(
        "auth/signup",
        {
          ...formValues,
        },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((responce) => {
        console.log(responce);
        dispatch(slice.actions.updateSignupEmail({ email: formValues.email }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
        dispatch(showSnackbar({severity: "success", message: responce.data.msg}))
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
        dispatch(showSnackbar({severity: "error", message: error.response.data.msg}))
      })
      .finally(() => {
        if (!getState().auth.error) {
          window.location.href = "/auth/verify";
        }
      });
  };
}

export function VerifyUser(formValues) {
  console.log(formValues);
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/verify-otp",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((responce) => {
        console.log(responce);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: responce.data.authToken,
          })
        );
        window.localStorage.setItem("user_id",responce.data.user_id)
        dispatch(showSnackbar({severity: "success", message: responce.data.msg}))
      })
      .catch((error) => {
        console.log(error);
        dispatch(showSnackbar({severity: "error", message: error.response.data.msg}))
      });
  };
}
