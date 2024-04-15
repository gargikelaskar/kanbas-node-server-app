import model from "./model.js";
export const createCourse = (course) => {
    course._id = new Date().getTime().toString();
    return model.create(course);
};
export const findAllCourses = () => model.find();
export const findCourseById = (courseId) => model.findById(courseId);
export const updateCourse = (courseId, course) =>
    model.updateOne({ id: courseId }, { $set: course });
export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });