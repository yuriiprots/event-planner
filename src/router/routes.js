import Calendar from "../pages/Calendar";
import Events from "../pages/Events";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

export const privateRoutes = [
  { path: "/calendar", component: Calendar },
  { path: "/events", component: Events },
];

export const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/signup", component: SignUp },
];
