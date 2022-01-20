import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Example from "../views/pages/ExamplePage";
import Testing from "../views/pages/Testing";
import Period from "../views/pages/PeriodPage/Periodlist.vue";
import UserMgt from "../views/pages/UserMgt";
import UserProfile from "../views/pages/UserProfile";
import UserProjectList from "../views/pages/userprojectlist";
import Project from "../views/pages/CreateProject";

import MainLayout from "@/layouts/Main/index.vue";
import FunctionsPeriod from "../views/pages/Period";
import AuthenticationLayout from "@/layouts/Authentication/index.vue";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({
  showSpinner: false,
  easing: "ease",
  speed: 1000,
}); // NProgress Configuration

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "example",
        component: Example,
      },
      {
        path: "test",
        component: Testing,
      },
      {
        path: "period",
        component: Period,
      },
      {
        path: "userMgt",
        component: UserMgt,
      },
      {
        path: "user-profile",
        component: UserProfile,
      },
      // {
      //   component: UserProjectList,
      // }
      {
        path: "UserProjectList",
        component: UserProjectList,
      },

      {
        path: "project",
        component: Project,
      },
      {
        path: "functions-period",
        component: FunctionsPeriod,
      },
    ],
  },
  {
    path: "/auth/",
    component: AuthenticationLayout,
    children: [
      {
        path: "login",
        name: "login",

        component: () =>
          import(
            /* webpackChunkName: "" */ "../views/authentication/Login.vue"
          ),
      },
    ],
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: import("@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((/* to, from */) => {
  // start progress bar
  NProgress.start();
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

export default router;
