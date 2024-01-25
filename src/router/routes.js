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
      {
        path: "account/reset-password",
        component: () => import("components/account/PasswordReset.vue"),
      },
      {
        path: "index/account/password/set/:token",
        component: () => import("components/account/SetPassword.vue"),
      },
    ],
  },

  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "wallet",
        component: () => import("pages/WalletPage.vue"),
      },
      {
        path: "subjects",
        component: () => import("components/parts/SubjectList.vue"),
      },
      {
        path: "subjects/:id",
        component: () => import("pages/SubjectPage.vue"),
      },

      {
        path: "account/student",
        component: () => import("pages/StudentAccountPage.vue"),
      },
    ],
  },

  {
    path: "/test",
    component: () => import("layouts/IndexLayout.vue"),
    children: [{ path: "", component: () => import("pages/ListTemplate.vue") }],
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
    component: () => import("layouts/SubjectLayout2.vue"),
    children: [
      {
        path: ":id",
        component: () => import("pages/SubjectPage.vue"),
      },

      {
        path: ":id/topics/:topic_id/subtopics/:subtopic_id",
        component: () => import("components/SubjectContent.vue"),
      },

      {
        path: ":id/topics/:topic_id/test",
        component: () => import("components/TopicTest.vue"),
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
