<template lang>
  <div class="q-pa-sm" v-if="question">
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
      <!-- {{ question }} -->
      <div v-if="isMultipleChoice">
        <q-card
          class="my-card q-my-xs"
          flat
          bordered
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
        <div>
          <q-card-section class>
            <content-editor
              :content="formData.text"
              @contentChanged="formData.text = $event"
            />
            <div class="q-my-sm flex justify-end">
              <q-checkbox v-model="formData.is_correct" label="Is Correct" />
              <q-btn
                class="q-ml-sm"
                color="primary"
                label="Add"
                @click="createChoice"
              />
            </div>
          </q-card-section>
          <q-separator spaced />
        </div>
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
      this.$api
        .get(`topic-questions/${this.$route.params.topic_question_id}/`)
        .then((res) => {
          this.question = res.data;
          this.isMultipleChoice = this.question.is_multiple_choice;
        });
    },

    createChoice() {
      this.formData["topic_question"] = this.$route.params.topic_question_id;
      this.$api.post(`topic-question-choices/`, this.formData).then((res) => {
        this.getQuestion();
      });
    },

    updateQuestionText(data) {
      this.$api
        .patch(`test-questions/${this.$route.params.topic_question_id}/`, {
          text: data,
        })
        .then((res) => {
          this.question = res.data;
        });
    },

    updateQuestionIsMultipleChoice() {
      this.$api
        .patch(`topic-questions/${this.$route.params.topic_question_id}/`, {
          is_multiple_choice: this.isMultipleChoice,
        })
        .then((res) => {
          this.question = res.data;
        });
    },

    deleteChoice(choiceId) {
      if (confirm("Are you sure you want to delete this Choice?")) {
        this.$api.delete(`topic-question-choices/${choiceId}/`).then((res) => {
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
<style lang></style>
