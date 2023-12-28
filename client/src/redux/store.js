import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/AuthSlice";
import courseSliceReducer from "./slices/CourseSlice";
import lectureSliceReducer from "./slices/LectureSlice";
import razorpaySliceReducer from "./slices/RazorpaySlice";
import statSliceReducer from "./slices/StatSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    lecture: lectureSliceReducer,
    razorpay: razorpaySliceReducer,
    stat: statSliceReducer,
  },
  devTools: true,
});

export default store;
