<template lang>
  <div>
    <q-btn color="primary" label="Add Choice" @click="show = true" />
    <q-dialog v-model="show">
      <q-card style="min-width: 400px">
        <div class="text-h5 q-px-md q-my-md">Add Choice</div>
        <q-separator spaced />
        <q-card-section class>
          <content-editor
            :content="formData.text"
            @contentChanged="formData.text = $event" />

          <q-checkbox v-model="formData.is_correct" label="Is Correct" />
        </q-card-section>
        <q-separator spaced />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn color="primary" label="Submit" @click="createChoice" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  props: ["text", "is_correct"],
  data() {
    return {
      show: false,
      formData: {
        text: this.text,
        is_correct: this.is_correct,
      },
    };
  },

  methods: {
    createChoice() {
      this.formData["question"] = this.$route.params.id;
      console.log(this.formData);

      this.$api.post(`choices/`, this.formData).then((res) => {
        this.$emit("choice-created", res.data);
        this.show = false;
      });
    },
  },
};
</script>
<style lang></style>
