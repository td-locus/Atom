import Auth from "../components/Auth/index";
import MySpace from "../components/MySpace";
import WPS from "../components/WPS";
import Molecules from "../components/Molecules";
import Electrons from "../components/Electrons";
import Protons from "../components/Protons";
import Nucleus from "../components/Nucleus";
import Planets from "../components/Planets";
import MyDetails from "../components/MyDetails";
import Project from "../components/Project";
import Event from "../components/Event";
import GoodiesForm from "../components/Temp";
import Task from "../components/TaskAssignor";
import Tasks from "../components/TasksAssignee";
import User from "../components/User";

const publicRoutes = [
  { path: "/auth", component: Auth },
];
const authenticatedRoutes = [
  { path: "/my-space", component: MySpace },
  { path: "/my-details", component: MyDetails },
  { path: "/wps", component: WPS },
  { path: "/molecules", component: Molecules },
  { path: "/electrons", component: Electrons },
  { path: "/protons", component: Protons },
  { path: "/nucleus", component: Nucleus },
  { path: "/planets", component: Planets },
  { path: "/project", component: Project },
  { path: "/events/edit", component: Event },
  { path: "/claim/goodies", component: GoodiesForm },
  { path: "/task/edit", component: Task },
  { path: "/tasks/me", component: Tasks },
  { path: "/users/:username", component: User },
];

export { publicRoutes, authenticatedRoutes };
