<template>
  <div align="center">
    <error-message-modal :errorResponse="errorResponse" />

    <q-card class="q-ma-md" style="max-width: 22rem">
      <q-card-section>
        <q-form @submit="login">
          <h2 class="text-h6">
            <q-avatar>
              <img src="~assets/onita-logo.923195d3.png" />
            </q-avatar>
            Login Form
          </h2>
          <q-input
            outlined
            dense
            v-model="formData.email"
            label="Email"
            type="email"
            :rules="emailRules"
            required
          ></q-input>

          <q-input
            outlined
            dense
            v-model="formData.password"
            label="Password"
            type="password"
            :rules="passwordRules"
            required
          ></q-input>
          <div class="">
            <q-btn type="submit" color="primary" label="Login"></q-btn>
            <div class="q-py-sm">
              <router-link to="/account/reset-password"
                >Forgot Password</router-link
              >
            </div>

            <q-separator spaced />
            <div>
              <div class="flex items-center">
                Dont have an account?
                <create-account />
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      formData: {
        email: "",
        password: "",
      },
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      passwordRules: [(v) => !!v || "Password is required"],
      errorResponse: {},
    };
  },
  created() {
    if (process.env.DEBUG) this.setFormData();
  },
  methods: {
    login() {
      this.$utilsStore.setLoading(true);

      this.formData["username"] = this.formData["email"];
      this.$api
        .post(`/users/login/`, this.formData)
        .then((res) => {
          const token = res.data.token;
          const user = res.data;
          this.$authStore.setUserAndToken(user, token);
          this.$utilsStore.setLoading(false);
          var _next = this.$route.query._next || "/dashboard";
          this.$router.push(_next);
        })
        .catch((err) => {
          this.$utilsStore.setLoading(false);
          this.errorResponse = err.response;
        });
    },
    setFormData() {
      this.formData = { email: "okotsmith96@gmail.com", password: "bratz123" };
    },
  },
};
</script>
