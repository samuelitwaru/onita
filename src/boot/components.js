import sideMenu from "components/menus/SideMenu.vue";
import mainMenu from "components/menus/MainMenu.vue";
import userLogout from "components/account/UserLogout.vue";
import loadingComponent from "components/utils/LoadingComponent.vue";
import messageBox from "components/utils/MessageBox.vue";
import alertMsg from "components/utils/AlertMsg.vue";
import errorMessageModal from "components/utils/ErrorMessageModal.vue";

import levelCardList from "components/parts/levelCardList.vue";
import createAccount from "components/account/CreateAccount.vue";

const components = {
  "side-menu": sideMenu,
  "main-menu": mainMenu,
  "user-logout": userLogout,
  "loading-component": loadingComponent,
  "message-box": messageBox,
  "alert-msg": alertMsg,
  "error-message-modal": errorMessageModal,

  "level-card-list": levelCardList,
  "create-account": createAccount,
};

export default async ({ app }) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
};
