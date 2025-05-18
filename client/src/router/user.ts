const userRoutes = [
    {
        path: "/auth",
        name: "auth",
        component: () => import("@/layouts/auth.vue"),
        children: [
            {
                path: "signup",
                name: "signup",
                component: () => import("@/pages/auth/signup.vue"),
            },
            {
                path: "signin",
                name: "signin",
                component: () => import("@/pages/auth/signin.vue"),
            },
        ],
    },
    {
        path: "/",
        name: "home",
        component: () => import("@/layouts/user/main.vue"),
        children: [
            {
                path: "projects",
                name: "projects",
                component: () => import("@/pages/project/page.vue"),
            },
            {
                path: "projects/:projectId",
                name: "projectId",
                component: () => import("@/pages/project/overview.vue"),
                children: [
                    {
                        path: "board/:boardId",
                        name: "board",
                        component: () => import("@/pages/project/board.vue"),
                    },
                ],
            },
            {
                path: "events",
                name: "events",
                component: () => import("@/pages/event/index.vue"),
            }
        ],
    },
];

export default userRoutes;