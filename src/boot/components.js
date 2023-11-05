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
import levelCardList from "components/parts/levelCardList.vue";
import questionBrowser from "components/parts/QuestionBrowser.vue";
import createAccount from "components/account/CreateAccount.vue";
import mathjaxComponent from "components/utils/MathjaxComponent.vue";
import sectionEditor from "components/SectionEditor.vue";
import questionEditor from "components/QuestionEditor.vue";

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
  "level-card-list": levelCardList,
  "question-browser": questionBrowser,
  "create-account": createAccount,
  "mathjax-component": mathjaxComponent,
  "section-editor": sectionEditor,
  "question-editor": questionEditor,
};

export default async ({ app }) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
};
