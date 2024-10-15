import { createBrowserRouter } from "react-router-dom";
import HomePage from "../modules/Home/view/HomePage";
import CourseView from "../modules/Course/view/CourseView";
import { Course } from "../services/Course/InterfaceCourse";
import ReportView from "../modules/Reports/view/ReportView";
const Routes = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/course/:id", element: <CourseView course={{} as Course} /> },
  { path: "/report", element: <ReportView /> },
]);
export default Routes;
