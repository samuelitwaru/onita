<template lang="">
  <div class="q-pa-sm" v-if="question">
    <div></div>

    <div class="q-px-sm flex justify-between">
      <div class="text-h6">Question</div>
      <q-chip class="glossy" :label="`${question.mark} mark(s)`" />
    </div>

    <content-editor
      :content="question.text"
      @blur="updateQuestionText($event)"
    />
    <br />
    <br />
    <div class="q-px-sm">
      <div class="q-py-sm flex justify-between">
        <div class="text-h6">
          <q-checkbox
            left-label
            v-model="isMultipleChoice"
            label="Multiple Choice?"
            @click="updateQuestionIsMultipleChoice"
          />
        </div>
      </div>
      <div v-if="isMultipleChoice">
        <div class="flex">
          <create-choice-dialog
            @choice-created="question.choices.push($event)"
          />
        </div>

        <q-card
          class="my-card q-my-xs"
          v-for="choice in question.choices"
          :key="choice.id"
        >
          <q-card-section class="flex justify-between items-center">
            <div v-html="choice.text"></div>

            <div>
              <q-chip
                class="text-white glossy"
                color="green"
                icon="check"
                v-if="choice.is_correct"
                label="correct"
              />
              <q-btn
                color="primary"
                dense
                icon="delete"
                flat
                @click="deleteChoice(choice.id)"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      question: null,
      formData: {
        text: "",
        is_correct: false,
      },
      isMultipleChoice: false,
    };
  },
  created() {
    this.getQuestion();
  },
  methods: {
    getQuestion() {
      this.$api.get(`test-questions/${this.$route.params.id}/`).then((res) => {
        this.question = res.data;
        this.isMultipleChoice = this.question.is_multiple_choice;
      });
    },

    updateQuestionText(data) {
      this.$api
        .patch(`test-questions/${this.$route.params.id}/`, { text: data })
        .then((res) => {
          this.question = res.data;
        });
    },

    updateQuestionIsMultipleChoice() {
      this.$api
        .patch(`test-questions/${this.$route.params.id}/`, {
          is_multiple_choice: this.isMultipleChoice,
        })
        .then((res) => {
          this.question = res.data;
        });
    },

    deleteChoice(choiceId) {
      if (confirm("Are you sure you want to delete this Choice?")) {
        this.$api.delete(`choices/${choiceId}/`).then((res) => {
          if (res.status == 204) {
            this.question.choices = this.question.choices.filter(
              (choice) => choice.id != choiceId
            );
          }
        });
      }
    },
  },
};
</script>
<style lang=""></style>
