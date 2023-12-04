<template lang="">
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div
        class="q-mx-auto q-ma-md q-pa-md q-gutter-md"
        style="max-width: 40rem"
      >
        <q-card class="" bordered>
          <q-card-section class="text-h6">
            <h2 class="text-h6 text-center">
              <q-avatar>
                <img src="~assets/onita-logo.923195d3.png" />
              </q-avatar>
              School Registration
            </h2>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    outlined
                    dense
                    label="School Name"
                    type="email"
                    required
                  ></q-input>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    outlined
                    dense
                    label="Email"
                    type="email"
                    required
                  ></q-input>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    outlined
                    dense
                    label="Telephone"
                    type="email"
                    required
                  ></q-input>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section>
            <q-card-actions>
              <div class="row">
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
      </div>
    </div>
  </q-page>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    return {
      model: ref(null),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      user_details: {},
      password_dict: {},
    };
  },
};
</script>
<style lang=""></style>
