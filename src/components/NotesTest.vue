<template lang>
  <div class="q-pa-lg">
    <div class="flex justify-between">
      <div class="text-h4">Progress Test</div>
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
  data() {
    return {
      questions: [],
      currentQuestion: null,
      questionIndex: 0,
      test: null,
      topics: [],
      report: null,
      student: this.$authStore.currentUser.student,
      notes_logs: [],
      last_log: null,
    };
  },

  computed: {
    currentTopic() {
      if (this.topics.length) {
        return this.topics.filter(
          (topic) => topic.id == this.$route.params.topic_id
        )[0];
      }
      return null;
    },
  },

  created() {
    this.getQuestions();
    this.getTopics();
    this.getStudentNotesLogs();
  },

  methods: {
    getTopics() {
      this.$api
        .get(`topics/?notes=${this.$route.params.notes_id}`)
        .then((res) => {
          this.topics = res.data;
        });
    },
    getStudentNotesLogs() {
      this.$api
        .get(
          `student-notes-logs/?student=${this.student.id}&notes=${this.$route.params.notes_id}&topic=${this.$route.params.topic_id}`
        )
        .then((res) => {
          this.notes_logs = res.data;
          this.last_log = this.notes_logs.pop();
        });
    },
    getQuestions(args = {}) {
      var queryString = this.$buildURLQuery(args);
      this.$api
        .get(`topic-questions/?topic=${this.$route.params.topic_id}`)
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
        var data = {
          notes: this.$route.params.notes_id,
          student: this.student.id,
          topic: this.$route.params.topic_id,
          note: "TESTED",
        };
        this.$api.post(`student-notes-logs/`, data).then((res) => {
          if ((res.status = 201)) {
            this.last_log = res.data;
          }
        });
      }
    },

    nextTopic() {
      var index = this.topics.findIndex(
        (topic) => topic.order == this.currentTopic.order + 1
      );
      var topic = this.topics[index];
      var data = {
        notes: this.$route.params.notes_id,
        student: this.student.id,
        topic: topic.id,
        note: "ENROLLED",
      };
      this.$api.post(`student-notes-logs/`, data).then((res) => {
        if ((res.status = 201)) {
          this.last_log = res.data;
        }
      });
      document.location = `/notes/${this.$route.params.notes_id}/`;
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
