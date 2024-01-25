import Flutterwave from "flutterwave-vue-v3";
import { boot } from "quasar/wrappers";

export default boot(({ app }) => {
  app.use(Flutterwave, {
    publicKey: "FLWPUBK-6ae6f8e1ba86b3d26819c164b5fcfab6-X",
  });
});
