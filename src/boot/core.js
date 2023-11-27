import { boot } from "quasar/wrappers";
import { authStore } from "stores/auth";
import { utilsStore } from "stores/utils";

export default boot(({ app }) => {
  const useAuthStore = authStore();
  const useUtilsStore = utilsStore();

  const userHasGroups = (groups) => {
    var userGroups = authStore().currentUser.groups;
  };

  app.config.globalProperties.$userHasAnyGroups = (groups) => {
    var userGroups = authStore().currentUser.groups;
    return groups.some((group) => userGroups.includes(group));
  };

  app.config.globalProperties.$authStore = useAuthStore;
  app.config.globalProperties.$utilsStore = useUtilsStore;
});
