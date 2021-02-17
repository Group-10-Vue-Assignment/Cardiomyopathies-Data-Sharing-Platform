import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import GlobalDashboard from "../views/GlobalDashboard.vue";
import UserDashboard from "../views/UserDashboard.vue";
import AddGraph from "@/views/AddGraph.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import VerifyEmail from "../views/VerifyEmail.vue";
import SearchPage from "../views/SearchPage.vue";
import GraphDetails from "@/views/GraphDetails";
// route guard
import { projectAuth } from "../firebase/config";

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    if (user.emailVerified) {
      next();
    } else {
      next({ name: "VerifyEmail" });
    }
  }

  console.log(user.emailVerified);
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/user-dashboard",
    name: "UserDashboard",
    component: UserDashboard,
    beforeEnter: requireAuth
  },
  {
    path: "/global-dashboard",
    name: "GlobalDashboard",
    component: GlobalDashboard,
    beforeEnter: requireAuth
  },
  {
    path: "/add-graph",
    name: "AddGraph",
    component: AddGraph,
    beforeEnter: requireAuth
  },
  {
    path: "/graph-details/:id",
    name: "GraphDetails",
    component: GraphDetails,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: ForgotPassword
  },
  {
    path: "/verifyemail",
    name: "VerifyEmail",
    component: VerifyEmail
  },
  {
    path: "/searchpage",
    name: "SearchPage",
    component: SearchPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
