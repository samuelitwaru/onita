const routes = [
  {
    path: "/",
    component: () => import("layouts/IndexLayout.vue"),
    children: [{ path: "", component: () => import("pages/WelcomePage.vue") }],
  },

  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
