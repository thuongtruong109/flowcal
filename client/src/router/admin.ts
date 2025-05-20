const adminRoutes = [
    {
        path: "/admin",
        name: "admin",
        component: () => import("@/layouts/admin.vue"),
        children: [
        {
            path: "login",
            name: "admin-login",
            component: () => import("@/pages/admin/login/page.vue"),
        },
        {
            path: "dashboard",
            name: "admin-dashboard",
            component: () => import("@/pages/admin/dashboard.vue"),
        },
        ],
    },
];

export default adminRoutes;