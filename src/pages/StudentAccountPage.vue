<template>
  <div>
    <message-box :message="message" @close="message = ''" />
    <error-message-modal :errorResponse="errorResponse" />
    <q-card class="q-ma-md" style="max-width: 500px">
      <q-card-section>
        <h2 class="text-h6">User Profile</h2>
        <q-btn
          v-if="!isEditing"
          @click="startEditing"
          icon="edit"
          flat
          class="q-mr-md"
        />
      </q-card-section>

      <q-card-section>
        <div v-if="isEditing">
          <q-form @submit="saveChanges">
            <q-input
              outlined
              dense
              v-model="formData.first_name"
              label="First Name"
              type="text"
              :rules="nameRules"
              required
            ></q-input>
            <q-input
              outlined
              dense
              v-model="formData.last_name"
              label="Last Name"
              type="text"
              :rules="nameRules"
              required
            ></q-input>
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
              v-model="formData.telephone"
              label="Telephone"
              type="tel"
              :rules="telephoneRules"
              required
            ></q-input>

            <q-btn
              type="submit"
              color="primary"
              label="Save Changes"
              @click="updateStudent"
            ></q-btn>
            <q-btn @click="cancelEditing" label="Cancel"></q-btn>
          </q-form>
        </div>
        <div
          v-else
          style="
            padding: 16px;
            background-color: #f0f0f0;
            border-radius: 8px;
            margin: 8px;
          "
        >
          <div><strong>First Name:</strong> {{ formData.first_name }}</div>
          <div><strong>Last Name:</strong> {{ formData.last_name }}</div>
          <div><strong>Email:</strong> {{ formData.email }}</div>
          <div><strong>Telephone:</strong> {{ formData.telephone }}</div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentUser: this.$authStore.currentUser.student,
      isEditing: false,
      message: "",
      errorResponse: {},
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
      },
      nameRules: [(v) => !!v || "Name is required"],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      telephoneRules: [(v) => !!v || "Telephone is required"],
    };
  },
  created() {
    this.setFormData();
  },
  methods: {
    updateStudent() {
      this.$utilsStore.setLoading(true);
      this.$api
        .put(`students/${this.currentUser.id}/update/`, this.formData)
        .then((res) => {
          const token = res.data.token;
          const user = res.data;
          this.$authStore.setUserAndToken(user, token);
          this.$utilsStore.setLoading(false);
          this.isEditing = false;
        });
    },
    startEditing() {
      this.isEditing = true;
    },
    saveChanges() {
      // Add logic to save changes to the backend
      this.isEditing = false;
    },
    cancelEditing() {
      this.isEditing = false;
      this.setFormData();
    },
    setFormData() {
      this.formData = {
        first_name: this.currentUser.user.first_name || "",
        last_name: this.currentUser.user.last_name || "",
        email: this.currentUser.user.email || "",
        telephone: this.currentUser.telephone || "",
      };
    },
  },
};
</script>
