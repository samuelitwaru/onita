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
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "subjects",
        component: () => import("components/parts/SubjectList.vue"),
      },

      {
        path: "subjects/:id",
        component: () => import("pages/SubjectPage.vue"),
      },
    ],
  },

  {
    path: "/browse",
    component: () => import("pages/BrowsePage.vue"),
    children: [
      {
        path: ":learning_center",
        component: () => import("components/BrowseLearningCenter.vue"),
      },
    ],
  },

  {
    path: "/docs",
    component: () => import("layouts/DocsLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/DocsPage.vue"),
      },
    ],
  },

  {
    path: "/subjects",
    component: () => import("layouts/SubjectLayout.vue"),
    children: [
      {
        path: ":id",
        component: () => import("pages/SubjectPage.vue"),
      },

      {
        path: ":id/activities",
        component: () => import("pages/ActivitiesPage.vue"),
      },

      {
        path: ":id/content",
        component: () => import("pages/ContentPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
