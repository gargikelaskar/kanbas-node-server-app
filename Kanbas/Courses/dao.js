import model from "./model.js";

export const createCourse = (course) => {
    return model.create(course);
};
export const findAllCourses = () => model.find();
export const findCourseByID = (courseID) => model.find({ _id: courseID });
export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });
export const updateCourse = (courseId, updatedCourse) => model.updateOne({ _id: courseId }, { $set: updatedCourse });