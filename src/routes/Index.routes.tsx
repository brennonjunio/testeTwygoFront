import { createBrowserRouter } from "react-router-dom";
import HomePage from "../modules/Home/view/HomePage";

const Routes = createBrowserRouter([{ path: "/", element: <HomePage /> }]);
export default Routes;
