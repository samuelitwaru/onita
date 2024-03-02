<!--
Method 1: Utilize the synchronous method
-->

<template>
  <div>
    <q-btn color="primary" label="Credit your account" @click="show = true" />

    <q-dialog v-model="show">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="wallet" color="primary" text-color="white" />
          <span class="q-ml-sm text-h6">Credit Your Account</span>
        </q-card-section>
        <q-separator spaced />
        <q-card-section class="row items-center">
          <q-input
            v-model="formData.amount"
            type="number"
            outlined
            dense
            label="Amount"
          />
          <span class="q-pa-sm">
            {{ currency }}
          </span>
        </q-card-section>
        <q-separator spaced />
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn color="primary" label="Proceed" @click="payViaService" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      user: this.$authStore.currentUser,
      show: false,
      formData: {
        amount: 1000,
      },
      currency: "UGX",
    };
  },
  methods: {
    payViaService() {
      console.log(this.user.student);
      FlutterwaveCheckout({
        public_key: "FLWPUBK-212ca934ada824a4b26921b7ba998318-X",

        tx_ref: this.generateReference(),
        amount: this.formData.amount,
        currency: this.currency,
        payment_options: "card, banktransfer, ussd",
        redirect_url: "",
        meta: {
          consumer_id: "1",
          consumer_mac: "1",
        },
        customer: {
          email: "samuelitwaru@gmail.com",
          phone_number: "0781902516",
          name: "Samuel Itwaru",
        },
        customizations: {
          title: "ONITA",
          description: "Payment for Quotation",
          logo: "http://localhost:9000/src/assets/onita-logo.923195d3.png",
        },
      });
    },
    makePaymentCallback(response) {
      console.log("Pay", response);
    },
    closedPaymentModal() {
      console.log("payment is closed");
    },
    generateReference() {
      let date = new Date();
      return date.getTime().toString();
    },
  },
};
</script>
