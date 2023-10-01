import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  credentials: {
    apiKey: "AIzaSyAffDP6saxswESpzp9uYo2j-fqVyMVCq9M",
    authDomain: "onitaes.firebaseapp.com",
    databaseURL: "https://onitaes.firebaseio.com",
    projectId: "onitaes",
    storageBucket: "onitaes.appspot.com",
    messagingSenderId: "42080057964",
    appId: "1:42080057964:web:e6f724609d1974ed917649",
    measurementId: "G-SPT77VTYLM",
  },
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default boot(({ app }) => {
  app.config.globalProperties.$firebase = firebaseApp;
});
