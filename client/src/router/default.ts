export default [
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/pages/404.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "/",
        name: "landing",
        component: () => import("@/pages/landing.vue"),
      },
    ]
  }
];
