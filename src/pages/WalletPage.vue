<template lang="">
  <div class="q-pa-sm">
    <!-- <div class="flex justify-between">
      <div class="text-h5 q-py-sm">My Wallet</div>
    </div> -->
    <div class="flex justify-between">
      <div class="text-h5 q-py-sm">Balance: {{ balance }}</div>
      <div class="q-py-sm">
        <flutterwave-payment />
      </div>
    </div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Date</th>
          <th class="text-left">Type</th>
          <th class="text-left">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trans in transactions" :key="trans.id">
          <td>{{ trans.id }}</td>
          <td>{{ trans.date }}</td>
          <td>{{ trans.type }}</td>
          <td>{{ trans.amount }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transactions: [
        {
          id: 1,
          date: "2024-1-1",
          type: "credit",
          amount: 10000,
          decription: "",
        },
        {
          id: 1,
          date: "2024-1-1",
          type: "debit",
          amount: 10000,
          description: "",
        },
      ],
    };
  },
  computed: {
    balance() {
      var bal = 0;
      for (let index = 0; index < this.transactions.length; index++) {
        const trans = this.transactions[index];
        if (trans.type == "debit") {
          bal -= trans.amount;
        } else if (trans.type == "credit") {
          bal += trans.amount;
        }
      }
      return bal;
    },
  },
};
</script>
<style lang=""></style>
