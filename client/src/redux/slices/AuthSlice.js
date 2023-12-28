import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data:
    localStorage.getItem("data") !== undefined
      ? JSON.parse(localStorage.getItem("data"))
      : {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Creating account...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("user/login", data);
    toast.promise(res, {
      loading: "Logging in...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to login",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.post("user/logout");

    toast.promise(res, {
      loading: "Logging out...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to logout",
    });
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = axiosInstance.get("user/me");
    return (await res).data;
  } catch (error) {
    toast.error(error.message);
  }
});

export const changePassword = createAsyncThunk(
  "/auth/changePassword",
  async (userPassword) => {
    try {
      let res = axiosInstance.post("/user/change-password", userPassword);

      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to change password",
      });

      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email) => {
    try {
      let res = axiosInstance.post("/user/reset", { email });

      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to send verification email",
      });

      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const resetPassword = createAsyncThunk("/user/reset", async (data) => {
  try {
    let res = axiosInstance.post(`/user/reset/${data.resetToken}`, {
      password: data.password,
    });

    toast.promise(res, {
      loading: "Resetting...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to reset password",
    });
    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const updateProfile = createAsyncThunk("/user/update", async (data) => {
  try {
    const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
    toast.promise(res, {
      loading: "Editing profile...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to edit profile",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })

      .addCase(logout.fulfilled, (state, action) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
        state.role = "";
      })

      .addCase(getUserData.fulfilled, (state, action) => {
        if (!action?.payload?.user) return;
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      });
  },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
