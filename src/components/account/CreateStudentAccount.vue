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
            Create Student Account
          </h2>

          <div class="row q-col-gutter-xs q-my-sm">
            <div class="col">
              <q-input
                outlined
                dense
                v-model="formData.first_name"
                label="First Name"
                :rules="nameRules"
                required
              ></q-input>
            </div>
            <div class="col">
              <q-input
                outlined
                dense
                v-model="formData.last_name"
                label="Last Name"
                :rules="nameRules"
                required
              ></q-input>
            </div>
          </div>

          <div class="row q-col-gutter-xs">
            <div class="col">
              <q-input
                outlined
                dense
                v-model="formData.email"
                label="Email"
                type="email"
                :rules="emailRules"
                required
              ></q-input>
            </div>
            <div class="col">
              <q-input
                outlined
                dense
                v-model="formData.phone"
                label="Telephone Number"
                type="tel"
                :rules="phoneRules"
                required
              ></q-input>
            </div>
          </div>

          <div class="col">
            <q-select
              dense
              outlined
              v-model="formData.levels"
              :options="levels"
              label="Level"
              option-value="id"
              option-label="name"
              map-options
              emit-value
            />
          </div>

          <div class="q-my-sm">
            <q-input
              outlined
              dense
              v-model="formData.password"
              label="Password"
              type="password"
              :rules="passwordRules"
              required
            ></q-input>

            <q-input
              outlined
              dense
              v-model="formData.confirm_password"
              label="Confirm Password"
              type="password"
              :rules="confirmPasswordRules"
              required
            ></q-input>
          </div>
          <div class="">
            <q-btn type="submit" color="primary" label="Sign up"></q-btn>
            <div align="center" class="flex justify-between">
              <div class="col"><q-separator spaced /></div>
              <span class="col">or</span>
              <div class="col"><q-separator spaced /></div>
            </div>
            <div>
              Already have an account?

              <router-link to="/account/login">
                <q-btn type="submit" flat color="primary" label="Login"></q-btn>
              </router-link>
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
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        level: "",
        password: "",
        confirm_password: "",
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
        .post(`/accounts/login/`, this.formData)
        .then((res) => {
          const token = res.data.token;
          const user = res.data.user;
          this.$authStore.setUserAndToken(user, token);
          this.$utilsStore.setLoading(false);
          var _next = this.$route.query._next || "/";
          this.$router.push(_next);
        })
        .catch((err) => {
          this.$utilsStore.setLoading(false);
          this.errorResponse = err.response;
        });
    },
    setFormData() {
      this.formData = { email: "samuelitwaru@gmail.com", password: "bratz123" };
    },
  },
};
</script>
