<template lang>
  <div class="q-pa-lg">
    <div class="flex justify-between">
      <div class="text-h4">Progress Test</div>
      {{ progress }}
      <q-btn
        v-if="last_log?.note != 'TESTED'"
        color="primary"
        icon="check"
        outline
        label="submit Test"
        @click="submitTest"
      />
      <router-link
        v-else
        :to="`/notes/${this.$route.params.notes_id}/topics/${this.$route.params.topic_id}/next`"
      >
        <q-btn color="primary" icon="arrow_right" outline label="Next Topic" />
      </router-link>
    </div>
    <q-separator spaced />
    <div v-if="currentQuestion">
      <div class="flex justify-between">
        <div class="text-h6">
          Question {{ questionIndex + 1 }} of {{ questions?.length }}
        </div>
        <q-chip class="glossy" :label="`${currentQuestion?.mark} mark(s)`" />
      </div>

      <div>
        <q-card class flat bordered>
          <q-card-section horizontal>
            <q-card-section>
              <div v-html="currentQuestion.text"></div>
            </q-card-section>
          </q-card-section>
        </q-card>

        <div class="q-my-lg">
          <div class="text-h6">Answer</div>
          <answer-choice-editor
            v-if="currentQuestion.is_multiple_choice"
            :choices="currentQuestion.choices"
            :question="currentQuestion"
            :answer="currentQuestion.answer?.answer"
            @choiceChanged="
              currentQuestion.answer.answer = $event;
              updateAnswer($event);
            "
          />

          <content-editor
            v-else
            :content="currentQuestion.answer?.answer || ''"
            @blur="updateAnswer($event)"
            @contentChanged="
              currentQuestion.answer.answer = $event;
              updateAnswer($event);
            "
          />
        </div>
      </div>

      <q-page-sticky position="bottom" :offset="[0, 18]">
        <div class="flex justify-between">
          <div>
            <q-btn
              :disabled="questionIndex == 0"
              color="primary"
              dense
              flat
              icon="arrow_left"
              label="Prev"
              @click="setCurrentQuestion(-1)"
            />
            <q-btn
              :disabled="questionIndex == questions.length - 1"
              color="primary"
              dense
              flat
              icon-right="arrow_right"
              label="Next"
              @click="setCurrentQuestion(1)"
            />
          </div>
        </div>
      </q-page-sticky>
    </div>
  </div>
</template>
<script>
export default {
  props: ['progress'],
  data() {
    return {
      questions: [],
      currentQuestion: null,
      questionIndex: 0,
      student: this.$authStore.currentUser.student,
    };
  },

  created() {
    this.getQuestions();
  },

  methods: {
    getQuestions() {
      this.$api
        .get(`topic-questions/?topic=${this.progress.topic}`)
        .then((res) => {
          this.questions = res.data;
          for (let index = 0; index < this.questions.length; index++) {
            const ques = this.questions[index];
            this.$api
              .get(
                `topic-question-student-answers/?topic_question=${ques.id}&student=${this.student.id}`
              )
              .then((res) => {
                if (res.data.length) {
                  ques.answer = res.data[0];
                } else {
                  ques.answer = {};
                }
              });
          }
          if (this.questions.length) {
            this.currentQuestion = this.questions[this.questionIndex];
            this.currentQuestion.answer = null;
            //this.getCurrentQuestionAnswer();
          }
        });
    },

    submitTest() {
      if (confirm("Confirm submission?")) {
        this.$emit('submit-test')
      }
    },



    getCurrentQuestionAnswer() {
      this.$api
        .get(
          `topic-question-student-answers/?topic_question=${this.currentQuestion.id}&student=${this.student.id}`
        )
        .then((res) => {
          if (res.data.length) {
            this.answer = res.data[0];
            this.currentQuestion.answer = this.answer;
          }
        });
    },

    setCurrentQuestion(indexToAdd) {
      var index = this.questionIndex + indexToAdd;
      if (index < 0 || index >= this.questions.length) {
        return;
      }
      this.currentQuestion = this.questions[index];
      this.questionIndex = index;
      // // this.getCurrentQuestionAnswer();
    },

    updateAnswer(answer) {
      // return;
      if (this.currentQuestion.answer.id) {
        this.$api
          .patch(
            `topic-question-student-answers/${this.currentQuestion.answer.id}/`,
            {
              answer: answer,
            }
          )
          .then((res) => {
            console.log(res.data);
          });
      } else {
        this.$api
          .post(`topic-question-student-answers/`, {
            answer: answer,
            student: this.student.id,
            topic_question: this.currentQuestion.id,
          })
          .then((res) => {
            this.getQuestions();
          });
      }
    },
  },
};
</script>
<style lang></style>
