<template lang="">
  <q-page class="q-pa-sm">
    <div class="q-mx-auto q-ma-md q-pa-md q-gutter-md" style="max-width: 32rem">
      <q-form @submit="completeSignup">
        <q-card class="" bordered>
          <q-card-section class="text-h6">
            <h2 class="text-h6 text-center">
              <q-avatar>
                <img src="~assets/onita-logo.923195d3.png" />
              </q-avatar>
              School Registration
            </h2>
          </q-card-section>

          <q-separator spaced />

          <q-card-section class="q-pa-sm">
            <div class="row q-col-gutter-xs">
              <div class="col">
                <q-input
                  outlined
                  dense
                  v-model="formData.name"
                  label="First Name"
                  :rules="nameRules"
                  required
                ></q-input>
                <small class="text-red">{{ formError.first_name }}</small>
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
                ></q-input>
                <small class="text-red">{{ formError.email }}</small>
              </div>
              <div class="col">
                <small class="text-red">{{ formError.telephone }}</small>
                <q-input
                  outlined
                  dense
                  v-model="formData.telephone"
                  label="Telephone"
                  type="tel"
                  :rules="phoneRules"
                ></q-input>
              </div>
            </div>

            <div class="row q-col-gutter-xs">
              <div class="col">
                <q-input
                  outlined
                  dense
                  v-model="formData.password"
                  label="Password"
                  type="password"
                  :rules="passwordRules"
                  required
                ></q-input>
                <small class="text-red">{{ formError.password }}</small>
              </div>
              <div class="col">
                <q-input
                  outlined
                  dense
                  v-model="formData.confirm_password"
                  label="Confirm Password"
                  type="password"
                  :rules="confirmPasswordRules"
                ></q-input>
                <small class="text-red">{{ formError.confirm_password }}</small>
              </div>
            </div>
          </q-card-section>

          <q-separator spaced />

          <q-card-section>
            <q-card-actions align="center">
              <div class="flex">
                <q-btn
                  type="submit"
                  class="justify-center"
                  color="primary"
                  label="Sign up"
                ></q-btn>
                &nbsp;&nbsp;&nbsp;
                <hr />
                <div>
                  Already have an account?
                  <router-link to="/account/login">
                    <q-btn flat color="primary" label="Sign in"></q-btn>
                  </router-link>
                </div>
              </div>
            </q-card-actions>
          </q-card-section>
        </q-card>
      </q-form>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      levels: [],
      formError: {},
      formData: {
        name: "",
        email: "",
        telephone: "",
        password: "",
        confirm_password: "",
      },
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      nameRules: [(v) => !!v || "Field is required"],
      phoneRules: [
        (v) => !!v || "Telephone number is required",
        (v) => /^[0-9]{10}$/.test(v) || "Telephone number must be 10 digits",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must be at least 8 characters long",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Confirm Password is required",
        (v) => v === this.formData.password || "Passwords do not match",
      ],
      errorResponse: {},
    };
  },

  created() {
    this.getLevels();
    if (process.env.DEBUG) this.setFormData();
  },
  methods: {
    getLevels() {
      this.$api.get("levels/").then((res) => {
        this.levels = res.data;
      });
    },
    completeSignup(event) {
      event.preventDefault();
      this.$utilsStore.setLoading(true);
      this.$api
        .post("users/school/create/", this.formData)
        .then(() => {
          // const user = res.data;
          this.$router.push("/account/login");
          this.$utilsStore.setLoading(false);
        })
        .catch((err) => {
          console.log("error", err.response.data);
          this.formError = err.response.data;
          this.$utilsStore.setLoading(false);
        });
    },
    setFormData() {
      this.formData = {
        email: "example@school.com",
        name: "Example School",
        telephone: "0781902516",
        password: "bratz123",
        confirm_password: "bratz123",
      };
    },
  },
};
</script>
