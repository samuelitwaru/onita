<template lang="">
  <div>
    <div class="q-pa-lg">
      <q-option-group
        v-if="question.has_multiple_choices"
        v-model="formData.choices"
        type="checkbox"
        :options="options"
        val
      >
        <template v-slot:label="opt">
          <div class="row items-center">
            <div v-html="opt.label"></div>
          </div>
        </template>
      </q-option-group>
      <q-list v-else>
        <q-item clickable v-ripple v-for="choice in choices" :key="choice.id">
          <q-item-section>
            <q-radio v-model="formData.choice" :val="choice.id">
              <div v-html="choice.text"></div>
            </q-radio>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script>
export default {
  props: ["choices", "question", "answer"],
  data() {
    return {
      formData: {
        choice: null,
        choices: [],
      },
    };
  },

  created() {
    this.setAnswer();
  },

  methods: {
    setAnswer() {
      if (this.answer) {
        var ans = this.answer.replace("[", "").replace("]", "").split(",");
        if (this.question.has_multiple_choices) {
          this.formData.choices = ans.map((val) => parseInt(val));
        } else {
          this.formData.choice = ans.map((val) => parseInt(val))[0];
        }
      }
    },
  },

  computed: {
    options() {
      return this.choices.map((choice) => {
        return { id: choice.id, label: choice.text, value: choice.id };
      });
    },
  },

  watch: {
    "formData.choice": function (newVal, oldVal) {
      this.$emit("choiceChanged", `[${newVal}]`);
    },
    "formData.choices": function (newVal, oldVal) {
      this.$emit("choiceChanged", `${newVal}`);
    },
  },
};
</script>
<style lang=""></style>
