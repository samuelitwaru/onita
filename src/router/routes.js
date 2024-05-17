const routes = [
  {
    path: "/",
    component: () => import("layouts/indexLayout.vue"),
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
        path: "examination",
        component: () => import("pages/ExamHistoryPage.vue"),
      },
      {
        path: "examination/:id",
        component: () => import("pages/ExamPage.vue"),
      },
      {
        path: "examination/:id/answers",
        component: () => import("pages/ExamAnswerPage.vue"),
      },
      {
        path: "subjects/:id",
        component: () => import("pages/SubjectPage.vue"),
      },

      {
        path: "account/student",
        component: () => import("pages/StudentAccountPage.vue"),
      },
      {
        path: "rte",
        component: () => import("pages/RTEPage.vue"),
      },
    ],
  },

  {
    path: "/teacher",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "subjects",
        component: () => import("pages/TeacherSubjectsPage.vue"),
      },
      {
        path: "questions",
        component: () => import("pages/TeacherQuestionsPage.vue"),
      },
      {
        path: "examinations",
        component: () => import("pages/TeacherExamsPage.vue"),
      },
      {
        path: "tests",
        component: () => import("pages/TeacherPendingTests.vue"),
      },
      {
        path: "schools",
        component: () => import("pages/TeacherSchoolsPage.vue"),
      },
      {
        path: "notes",
        component: () => import("pages/TeacherNotesPage.vue"),
      },
    ],
  },

  {
    path: "/teacher/notes",
    component: () => import("layouts/TeacherNotesLayout.vue"),
    children: [
      {
        path: ":notes_id",
        component: () => import("pages/TeacherNotes.vue"),
      },
      {
        path: ":notes_id/topics/:topic_id",
        component: () => import("pages/TeacherNotesTopic.vue"),
      },
      {
        path: ":notes_id/topics/:topic_id/test",
        component: () => import("pages/TeacherNotesTest.vue"),
      },
      {
        path: ":notes_id/topics/:topic_id/test/questions/:topic_question_id",
        component: () => import("pages/TopicQuestionPage.vue"),
      },
      {
        path: ":notes_id/topics/:topic_id/subtopics/:subtopic_id",
        component: () => import("pages/TeacherNotesSubtopic.vue"),
      },
    ],
  },

  {
    path: "/teacher/questions",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: ":id", component: () => import("pages/QuestionPage.vue") },
    ],
  },

  {
    path: "/teacher/examinations",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: ":id/answers/:ques_id",
        component: () => import("pages/TeacherSubmittedExamPage.vue"),
      },
    ],
  },



  {
    path: "/teacher/subjects",
    component: () => import("layouts/TeacherSubjectLayout.vue"),
    children: [
      {
        path: ":id",
        component: () => import("pages/TeacherSubjectPage.vue"),
      },

      {
        path: ":id/topics/:topic_id/subtopics/:subtopic_id",
        component: () => import("pages/TeacherSubjectContentPage.vue"),
      },
    ],
  },

  {
    path: "/teacher/tests",
    component: () => import("layouts/TeacherTestLayout.vue"),
    children: [
      {
        path: ":student_id/:topic_id",
        component: () => import("pages/TeacherTestPage.vue"),
      },
    ],
  },

  {
    path: "/examination",
    component: () => import("layouts/ExamLayout.vue"),
    children: [
      {
        path: ":id/answers/:ques_id",
        component: () => import("pages/ExamAnswerPage.vue"),
      },
    ],
  },

  {
    path: "/examination",
    component: () => import("layouts/SubmittedExamLayout.vue"),
    children: [
      {
        path: ":id/questions/:ques_id",
        component: () => import("pages/ExamQuestionPage.vue"),
      },
    ],
  },

  {
    path: "/test",
    component: () => import("layouts/indexLayout.vue"),
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
    path: "/notes",
    component: () => import("layouts/NotesLayout.vue"),
    children: [
      {
        path: ":notes_id",
        component: () => import("pages/NotesPage.vue"),
      },
      {
        path: ":notes_id/enroll",
        component: () => import("pages/NotesEnrollmentPage.vue"),
      },
      {
        path: ":notes_id/topics/:topic_id",
        component: () => import("pages/NotesTopic.vue"),
      },
      {
        path: ":notes_id/topics/:topic_id/next",
        component: () => import("pages/NotesNextTopic.vue"),
      },
      {
        path: ":notes_id/topics/:topic_id/subtopics/:subtopic_id",
        component: () => import("components/NotesSubtopic.vue"),
      },

      {
        path: ":notes_id/topics/:topic_id/test",
        component: () => import("components/NotesTest.vue"),
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

  {
    path: "/school",
    component: () => import("layouts/SchoolLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/school/SchoolHomePage.vue"),
      },

      {
        path: "students",
        component: () => import("pages/school/SchoolStudentsPage.vue"),
      },

      {
        path: "teachers",
        component: () => import("pages/school/SchoolTeachersPage.vue"),
      },

      {
        path: "wallet",
        component: () => import("pages/WalletPage.vue"),
      },

      {
        path: "profile",
        component: () => import("pages/school/SchoolProfilePage.vue"),
      },
    ],
  },

  {
    path: "/school/performance",
    component: () => import("layouts/SchoolPerformanceLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/school/SchoolPerformancePage.vue"),
      },
      {
        path: ":id",
        component: () => import("pages/school/SchoolLevelPerformancePage.vue"),
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
