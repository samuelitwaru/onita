<template>
  <div>
    <q-btn
      class="q-ma-sm"
      color="accent"
      outline
      label="create account"
      @click="dialogVisible = true"
    />
    <q-dialog v-model="dialogVisible">
      <q-card style="width: 300px">
        <q-card-section class="q-pt-md q-pb-md">
          <q-card-title class="text-h6">Create Account</q-card-title>
          <q-select
            v-model="formData.accountType"
            :options="accountTypes"
            label="Select Account Type"
            emit-value
            map-options
          ></q-select>
          <q-card-actions align="right">
            <q-btn
              label="Cancel"
              color="secondary"
              @click="dialogVisible = true"
            />
            <q-btn
              label="Create"
              color="primary"
              @click="$router.push(`/account/${formData.accountType}/create`)"
            />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      selectedAccountType: null,
      accountTypes: [
        { label: "Student", value: "student" },
        { label: "Teacher", value: "teacher" },
        { label: "School", value: "school" },
      ],
      formData: {
        accountType: "student",
      },
    };
  },
  methods: {
    // openDialog() {
    //   this.dialogVisible = true;
    // },
    // closeDialog() {
    //   this.dialogVisible = false;
    // },
    // createAccount() {
    //   // Handle account creation based on this.selectedAccountType
    //   console.log("Creating account type:", this.selectedAccountType);
    //   // Add your logic here
    //   this.closeDialog();
    // },
  },
};
</script>
