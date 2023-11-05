<template lang="">
  <div>
    <q-btn
      color="accent"
      dense
      size="sm"
      icon="add"
      label="question"
      @click="confirm = true"
    />
    <q-dialog v-model="confirm" full-width>
      <q-card>
        <q-card-section class="items-center">
          <div class="text-h5">Question Editor</div>
        </q-card-section>
        <q-separator spaced />
        <q-card-section class="items-center">
          <label>QUESTION</label>
          <q-editor
            v-model="formData.question"
            label="Title of your proposal"
            outlined
            required
            min-height="10vh"
          />
        </q-card-section>
        <q-card-section class="items-center">
          <label>OPTIONS</label>
          <div class="row">
            <div class="col-8">
              <q-input
                v-model="optionFormData.option"
                type="text"
                outlined
                dense
                label="Answer"
              />
            </div>
            <div class="col">
              <q-checkbox
                v-model="optionFormData.correct"
                label="Correct Answer?"
              />
            </div>
            <div class="col q-my-auto">
              <q-btn color="accent" label="add" @click="addOption" dense />
            </div>
          </div>

          <q-separator spaced />
          <q-markup-table flat bordered v-if="formData.options.length">
            <tbody>
              <tr v-for="option in formData.options" :key="option">
                <td class="text-left">{{ option.option }}</td>
                <td class="text-right">
                  <q-icon v-if="option.correct" name="check" />
                </td>
                <td class="text-right">
                  <q-btn
                    color="primary"
                    dense
                    icon="close"
                    flat
                    @click="onClick"
                  />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
        <q-separator spaced />
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
        question: "",
        options: [],
      },
      optionFormData: {
        option: "",
        correct: false,
      },
    };
  },

  methods: {
    addOption() {
      var option = {};
      option.option = this.optionFormData.option;
      option.correct = this.optionFormData.correct;
      this.formData.options.push(option);
    },
  },
};
</script>
<style lang=""></style>
