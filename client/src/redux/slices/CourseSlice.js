import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk(
  "/course/getAllCourses",
  async () => {
    try {
      const res = axiosInstance.get("/courses");
      toast.promise(res, {
        loading: "Getting all courses...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to get all courses",
      });
      return (await res).data.courses;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const createCourses = createAsyncThunk("/course/create", async (data) => {
  try {
    const res = axiosInstance.post("/courses", data)
    toast.promise(res, {
      loading: "Creating course...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create course",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    
  }
})

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  try {
      const response = axiosInstance.delete(`/courses/${id}`);
      toast.promise(response, {
          loading: "deleting course ...",
          success: "Courses deleted successfully",
          error: "Failed to delete the courses",
      });

      return (await response).data;
  } catch(error) {
      toast.error(error?.response?.data?.message);
  }
});

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.courseData = [...action.payload];
      }
    });
  },
});

export default courseSlice.reducer;
