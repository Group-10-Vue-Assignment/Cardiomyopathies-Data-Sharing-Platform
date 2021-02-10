import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import DashBaord from "../views/DashBoard.vue";
import AddGraph from "@/views/AddGraph.vue";

// route guard
import { projectAuth } from "../firebase/config";

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
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
    path: "/dashboard",
    name: "DashBoard",
    component: DashBaord,
    beforeEnter: requireAuth
  },
  {
    path: "/add-graph",
    name: "AddGraph",
    component: AddGraph,
    beforeEnter: requireAuth
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
