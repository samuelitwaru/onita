<template>
  <q-page>
    <div class="row">
      <div class="col-md-5 q-my-auto">
        <q-img
          src="~assets/student.png"
          spinner-color="primary"
          spinner-size="82px"
        />
      </div>

      <div class="col-md-7 q-my-auto">
        <h2 class="text-h4 q-ma-sm">Take Examination</h2>
        <p class="q-pa-sm text-body1">
          Sign in or create an account to take your next exam and improve your
          mastery of your subject content at your own pace.
        </p>

        <div class="flex">
          <router-link to="account/login">
            <q-btn class="q-ma-sm" color="accent" label="signin" />
          </router-link>
          <create-account />
        </div>
        <q-separator class="q-mx-sm" spaced />
        <div class="q-pa-sm">
          <level-card-list />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "WelcomePage",

  data() {
    return {
      levels: [
        {
          name: "Primary",
          description: "Past Exam Questions",
          themeColor: "primary",
        },
        {
          name: "Ordianry",
          description: "Past Exam Questions",
          themeColor: "secondary",
        },
        {
          name: "Advanced",
          description: "Past Exam Questions",
          themeColor: "accent",
        },
      ],
    };
  },
  created() {},
});
</script>
