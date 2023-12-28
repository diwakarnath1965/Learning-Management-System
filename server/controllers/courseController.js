import Course from "../models/Course.js";
import AppError from "../utils/error.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select("-lectures");

    res.status(200).json({
      status: "success",
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const getLectureByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("No course found with that id", 404));
    }

    res.status(200).json({
      success: true,
      message: "Lecture fetched successfully",
      lectures: course.lectures,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return next(new AppError("Please provide all the fields", 400));
    }

    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id: "learning management system",
        secure_url: "learning management system",
      },
    });

    if (!course) {
      return next(new AppError("Course not created", 400));
    }

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "learning management system",
        });

        if (result) {
          course.thumbnail.public_id = result.public_id;
          course.thumbnail.secure_url = result.secure_url;

          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        return next(new AppError("File not uploaded", 500));
      }
    }

    await course.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(
      id,
      { $set: req.body },
      { runValidators: true }
    );

    if (!course) {
      return next(new AppError("Course not found with that id", 404));
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return next(new AppError("Course not found with that id", 404));
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const createLecture = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    let lectureData = {};

    if (!title || !description) {
      return next(new AppError("Title and Description are required", 400));
    }

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Invalid course id or course not found.", 400));
    }

    // Run only if user sends a file
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms", // Save files in a folder named lms
          chunk_size: 50000000, // 50 mb size
          resource_type: "video",
        });

        // If success
        if (result) {
          // Set the public_id and secure_url in array
          lectureData.public_id = result.public_id;
          lectureData.secure_url = result.secure_url;
        }

        // After successful upload remove the file from local storage
        fs.rm(`uploads/${req.file.filename}`);
      } catch (error) {
        return next(new AppError("File not uploaded", 500));
      }
    }

    course.lectures.push({
      title,
      description,
      lecture: lectureData,
    });

    course.numberOfLectures = course.lectures.length;

    // Save the course object
    await course.save();

    res.status(200).json({
      success: true,
      message: "Course lecture added successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const removeLecture = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.query;

    if (!courseId) {
      return next(new AppError("Course id is required", 400));
    }

    if (!lectureId) {
      return next(new AppError("Lecture id is required", 400));
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new AppError("Invalid course id or course not found.", 400));
    }

    // Find the index of the lecture using the lectureId
    const lectureIndex = course.lectures.findIndex(
      (lecture) => lecture._id.toString() === lectureId.toString()
    );

    // If returned index is -1 then send error as mentioned below
    if (lectureIndex === -1) {
      return next(new AppError("Lecture does not exist.", 404));
    }

    // Delete the lecture from cloudinary
    await cloudinary.v2.uploader.destroy(
      course.lectures[lectureIndex].lecture.public_id,
      {
        resource_type: "video",
      }
    );

    // Remove the lecture from the array
    course.lectures.splice(lectureIndex, 1);

    // update the number of lectures based on lectres array length
    course.numberOfLectures = course.lectures.length;

    // Save the course object
    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
