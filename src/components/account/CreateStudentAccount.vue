<template lang="">
  <q-page class="q-pa-sm">
    <div class="q-mx-auto q-ma-md q-pa-md q-gutter-md" style="max-width: 40rem">
      <q-form @submit="completeSignup">
        <q-card class="" bordered>
          <q-card-section class="text-h6">
            <h2 class="text-h6 text-center">
              <q-avatar>
                <img src="~assets/onita-logo.923195d3.png" />
              </q-avatar>
              Student Registration
            </h2>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    outlined
                    dense
                    v-model="formData.first_name"
                    label="First Name"
                    :rules="nameRules"
                    required
                  ></q-input>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    outlined
                    dense
                    v-model="formData.last_name"
                    label="Last Name"
                    :rules="nameRules"
                  ></q-input>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    outlined
                    dense
                    v-model="formData.email"
                    label="Email"
                    type="email"
                    :rules="emailRules"
                  ></q-input>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    outlined
                    dense
                    v-model="formData.telephone"
                    label="Telephone"
                    type="tel"
                    :rules="phoneRules"
                  ></q-input>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-select
                    dense
                    outlined
                    v-model="formData.level"
                    :options="levels"
                    label="Level"
                    option-value="id"
                    option-label="name"
                    map-options
                    emit-value
                    required
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    outlined
                    dense
                    v-model="formData.password"
                    label="Password"
                    type="password"
                    :rules="passwordRules"
                    required
                  ></q-input>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    outlined
                    dense
                    v-model="formData.confirm_password"
                    label="Confirm Password"
                    type="password"
                    :rules="confirmPasswordRules"
                  ></q-input>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section>
            <q-card-actions>
              <div class="row flex flex-center">
                <q-btn
                  type="submit"
                  class="justify-center"
                  color="primary"
                  label="Sign up"
                ></q-btn>
                &nbsp;&nbsp;&nbsp;
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

      formData: {
        first_name: "",
        last_name: "",
        email: "",
        telephone: "",
        level: "",
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
      //console.log("Payload:", this.formData);
      this.$api
        .post("users/student/create/", this.formData)
        .then(() => {
          // const user = res.data;
          this.$router.push("/account/login");
        })
        .catch((err) => {
          console.log("error", err.response.data);
        });
    },
    setFormData() {
      this.formData = {
        email: "sd@gmail.com",
        first_name: "Samuel",
        last_name: "Itwaru",
        telephone: "0781902516",
        password: "bratz123",
        confirm_password: "bratz123",
      };
    },
  },
};
</script>
