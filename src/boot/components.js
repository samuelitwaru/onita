import sideMenu from "components/menus/SideMenu.vue";
import mainMenu from "components/menus/MainMenu.vue";
import studentMenu from "components/menus/StudentMenu.vue";
import teacherMenu from "components/menus/TeacherMenu.vue";
import schoolMenu from "components/menus/SchoolMenu.vue";
import userLogout from "components/account/UserLogout.vue";
import loadingComponent from "components/utils/LoadingComponent.vue";
import messageBox from "components/utils/MessageBox.vue";
import alertMsg from "components/utils/AlertMsg.vue";
import errorMessageModal from "components/utils/ErrorMessageModal.vue";
// import levelCardList from "components/parts/levelCardList.vue";
import questionBrowser from "components/parts/QuestionBrowser.vue";
import createAccount from "components/account/CreateAccount.vue";
import mathjaxComponent from "components/utils/MathjaxComponent.vue";
import sectionEditor from "components/SectionEditor.vue";
import questionEditor from "components/QuestionEditor.vue";
import testReport from "components/TestReport.vue";
import myChart from "components/charts/MyChart.vue";
import flutterwavePayment from "components/FlutterwavePayment.vue";
import contentEditor from "components/ContentEditor.vue";
import createExamDialog from "components/CreateExamDialog.vue";
import createChoiceDialog from "components/CreateChoiceDialog.vue";
import createQuestionDialog from "components/CreateQuestionDialog.vue";
import createTopicQuestionDialog from "components/CreateTopicQuestionDialog.vue";
import createTacherSubject from "components/CreateTeacherSubject.vue";
import answerChoiceEditor from "components/AnswerChoiceEditor.vue";
import { createApp } from "vue";
import App from "../App.vue";
import VueMathjax from "vue-mathjax-next";
import createNotesDialog from "src/components/CreateNotesDialog.vue";
createApp(App).use(VueMathjax).mount("#app");

const components = {
  "side-menu": sideMenu,
  "main-menu": mainMenu,
  "student-menu": studentMenu,
  "teacher-menu": teacherMenu,
  "school-menu": schoolMenu,
  "user-logout": userLogout,
  "loading-component": loadingComponent,
  "message-box": messageBox,
  "alert-msg": alertMsg,
  "error-message-modal": errorMessageModal,
  // "level-card-list": levelCardList,
  "question-browser": questionBrowser,
  "create-account": createAccount,
  "mathjax-component": mathjaxComponent,
  "section-editor": sectionEditor,
  "question-editor": questionEditor,
  "test-report": testReport,
  "my-chart": myChart,
  "flutterwave-payment": flutterwavePayment,
  "content-editor": contentEditor,
  "create-exam-dialog": createExamDialog,
  "create-choice-dialog": createChoiceDialog,
  "create-question-dialog": createQuestionDialog,
  "create-topic-question-dialog": createTopicQuestionDialog,
  "create-teacher-subject": createTacherSubject,
  "create-notes-dialog": createNotesDialog,
  "answer-choice-editor": answerChoiceEditor,
  "vue-mathjax": VueMathjax,
};

export default async ({ app }) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
};
