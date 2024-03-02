import { boot } from "quasar/wrappers";
import { authStore } from "stores/auth";
import { utilsStore } from "stores/utils";
import { resStore } from "stores/res";

export default boot(({ app }) => {
  const useAuthStore = authStore();
  const useUtilsStore = utilsStore();
  const useResStore = resStore();

  app.config.globalProperties.$userHasGroup = (group) => {
    var currentUser = authStore().currentUser;
    if (currentUser) return Boolean(currentUser[group]?.user);
    return false;
  };

  app.config.globalProperties.$authStore = useAuthStore;
  app.config.globalProperties.$utilsStore = useUtilsStore;
  app.config.globalProperties.$resStore = useResStore;
});
