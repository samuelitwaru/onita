const routes = [
  {
    path: "/",
    component: () => import("layouts/IndexLayout.vue"),
    children: [
      { path: "", component: () => import("pages/WelcomePage.vue") },
      {
        path: "account/student/create",
        component: () => import("components/account/CreateStudentAccount.vue"),
      },
      {
        path: "account/teacher/create",
        component: () => import("components/account/CreateTeacherAccount.vue"),
      },
      {
        path: "account/school/create",
        component: () => import("components/account/CreateSchoolAccount.vue"),
      },
      {
        path: "account/login",
        component: () => import("components/account/UserSignin.vue"),
      },
    ],
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
