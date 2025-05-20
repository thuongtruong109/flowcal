import type VueRouter from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import useAuthStore from "../store/auth";
import defaultRoutes from "./default";
import adminRoutes from "./admin";
import userRoutes from "./user";

const routes = [...defaultRoutes, ...userRoutes, ...adminRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated && to.name !== "signin") {
    return { name: "signin" };
  }

  // if (!authStore.isAdmin && to.name === "admin") {
  //   return { name: "404" };
  // }
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
