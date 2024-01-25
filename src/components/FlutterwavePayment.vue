<!--
Method 1: Utilize the synchronous method
-->

<template>
  <div>
    <q-btn color="primary" label="Credit your account" @click="payViaService" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    payViaService() {
      console.log(FlutterwaveCheckout);
      FlutterwaveCheckout({
        public_key: "FLWPUBK-6ae6f8e1ba86b3d26819c164b5fcfab6-X",
        tx_ref: this.generateReference(),
        amount: 1000,
        currency: "UGX",
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
