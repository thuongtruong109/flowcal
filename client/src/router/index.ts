import VueRouter, { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import CommonRouter from "./common.router";
import AuthRouter from "./auth.router";
import Mainrouter from "./main.router";
import ProjectRouter from "./project.router";

const routes = [
  ...CommonRouter,
  ...AuthRouter,
  ...Mainrouter,
  ...ProjectRouter,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeResolve(
  (
    to: VueRouter.RouteLocationNormalized,
    from: VueRouter.RouteLocationNormalized,
    next: VueRouter.NavigationGuardNext
  ) => {
    if (to.name) {
      NProgress.start();
    }
    next();
  }
);

router.afterEach(() => {
  NProgress.done();
});

export default router;
