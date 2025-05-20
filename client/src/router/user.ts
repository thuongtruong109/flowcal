const userRoutes = [
    {
        path: "/auth",
        name: "auth",
        component: () => import("@/layouts/default.vue"),
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
        name: "main",
        component: () => import("@/layouts/user.vue"),
        children: [
            {
                path: "projects",
                name: "projects",
                component: () => import("@/pages/user/project/page.vue"),
            },
            {
                path: "projects/:projectId",
                name: "projectId",
                component: () => import("@/pages/user/project/detail/page.vue"),
                children: [
                    {
                        path: "boards/:boardId",
                        name: "boards",
                        component: () => import("@/pages/user/project/board/page.vue"),
                    },
                ],
            },
            {
                path: "events",
                name: "events",
                component: () => import("@/pages/user/event/index.vue"),
            }
        ],
    },
];

export default userRoutes;