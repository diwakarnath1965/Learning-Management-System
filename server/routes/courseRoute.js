import express from 'express';
import { createCourse, createLecture, getAllCourses, getLectureByCourseId, removeCourse, removeLecture, updateCourse } from '../controllers/courseController.js';
import { authorizedRoles, isLoggedIn } from '../middlewares/authMiddleware.js';
import upload from "../middlewares/multerMiddleware.js"
const router = express.Router();

router.route("/").get(getAllCourses).post(isLoggedIn,authorizedRoles("ADMIN"),upload.single("thumbnail"),createCourse).delete(isLoggedIn,authorizedRoles("ADMIN"),removeLecture)

router.route("/:id").get(isLoggedIn,getLectureByCourseId).put(isLoggedIn,authorizedRoles("ADMIN"),updateCourse).delete(isLoggedIn,authorizedRoles("ADMIN"),removeCourse).post(isLoggedIn,authorizedRoles("ADMIN"),upload.single("lecture"),createLecture)


export default router;