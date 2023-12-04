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
              v-model="formData.firstName"
              label="First Name"
              type="text"
              :rules="nameRules"
              required
            ></q-input>
            <q-input
              outlined
              dense
              v-model="formData.lastName"
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

            <q-btn type="submit" color="primary" label="Save Changes"></q-btn>
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
          <div><strong>First Name:</strong> {{ formData.firstName }}</div>
          <div><strong>Last Name:</strong> {{ formData.lastName }}</div>
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
    startEditing() {
      this.isEditing = true;
    },
    saveChanges() {
      // Add logic to save changes to the backend
      this.isEditing = false;
    },
    cancelEditing() {
      this.isEditing = false;
    },
    setFormData() {
      this.formData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        telephone: "123-456-7890",
      };
    },
  },
};
</script>
