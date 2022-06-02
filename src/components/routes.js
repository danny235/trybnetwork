import AuthRoot from "../auth/AuthRoot";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import BetHistory from "../main/BetHistory";
import Dashboard from "../main/Dashboard";
import Deposit from "../main/Deposit";
import DepositHistory from "../main/DepositHistory";
import WithdrawalHistory from "../main/WithdrawalHistory";
import HomeScreen from "../main/HomeScreen";
import Withdrawal from "../main/Withdrawal";

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
  {
    pathname: "/deposit-history",
    exact: true,
    name: "depositHistory",
    id: "depositHistory",
    component: <DepositHistory />
},
  {
    pathname: "/dashboard",
    exact: true,
    name: "dashboard",
    id: "dashboard",
    component: <Dashboard />
},
  {
    pathname: "/withdrawal-history",
    exact: true,
    name: "dashboard",
    id: "dashboard",
    component: <WithdrawalHistory />
},
  {
    pathname: "/withdraw",
    exact: true,
    name: "dashboard",
    id: "dashboard",
    component: <Withdrawal />
},

];

export { unAuthRoutes, authRoutes };
