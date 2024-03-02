// src/store/auth.js

import { defineStore } from "pinia";

export const resStore = defineStore({
  id: "res",
  state: () => ({
    subject: JSON.parse(localStorage.getItem("subject")),
  }),
  getters: {
    // errorMessageDialog: (state) => state.errorMessageDialog,
    currentSubject: (state) => state.subject,
  },
  actions: {
    setSubject(subject) {
      this.subject = subject;
      localStorage.setItem("subject", JSON.stringify(subject));
    },
  },
});
