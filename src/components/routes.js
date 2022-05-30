import AuthRoot from "../auth/AuthRoot";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import BetHistory from "../main/BetHistory";
import Deposit from "../main/Deposit";
import HomeScreen from "../main/HomeScreen";

const unAuthRoutes = [
  {
    pathname: "/",
    exact: true,
    name: "auth",
    id: "auth",
    component: <AuthRoot />,
  },
  {
    pathname: "/login",
    exact: true,
    name: "login",
    id: "login",
    component: <Login />,
  },
  {
    pathname: "/signup",
    exact: true,
    name: "signup",
    id: "auth",
    component: <SignUp />,
  },
];

const authRoutes = [
  {
    pathname: "/",
    exact: true,
    name: "home",
    id: "home",
    component: <HomeScreen />
},
  {
    pathname: "/bet-history",
    exact: true,
    name: "betHistory",
    id: "betHistory",
    component: <BetHistory />
},
  {
    pathname: "/deposit",
    exact: true,
    name: "deposit",
    id: "deposit",
    component: <Deposit />
},
];

export { unAuthRoutes, authRoutes };
