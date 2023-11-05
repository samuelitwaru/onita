<template lang="">
  <div>
    <q-btn
      color="primary"
      dense
      size="sm"
      icon="add"
      label="section"
      @click="confirm = true"
    />
    <q-dialog v-model="confirm" full-width full-height>
      <q-card>
        <q-card-section class="items-center">
          <q-editor
            v-model="formData.content"
            label="Title of your proposal"
            outlined
            required
            min-height="70vh"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn label="save" dense color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      confirm: false,
      formData: {
        content: "",
      },
    };
  },
};
</script>
<style lang=""></style>
