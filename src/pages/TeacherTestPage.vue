<template lang>
  <div class="q-pa-lg">
    <div class="flex justify-between">
      <div class="text-h4">Progress Test</div>
      <div class="flex">
        <div>
          <q-chip class="glossy" :label="score" />/
          <q-chip class="glossy" :label="totalScore" />
        </div>
        <q-btn
          :disabled="!answerIndex == answers.length - 1"
          color="primary"
          icon-right="check"
          label="Submit"
          @click="submitTest"
          outline
        />
      </div>
    </div>
    <q-separator spaced />

    <div v-if="currentAnswer?.question_detail">
      <div v-if="currentAnswer.question_detail">
        <div class="flex justify-between">
          <div class="text-h6">
            Question {{ answerIndex + 1 }} of {{ answers?.length }}
          </div>
          <q-chip
            class="glossy"
            :label="`${currentAnswer.question_detail?.mark} mark(s)`"
          />
        </div>
        <div>
          <q-card class flat bordered>
            <q-card-section horizontal>
              <q-card-section>
                <div v-html="currentAnswer.question_detail.text"></div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
        <br />
        <div class="row flex justify-center">
          <div class="col-md-7 flex items-center">
            <div>
              <div class="text-h6">Answer</div>
              <q-card
                v-if="currentAnswer.question_detail.is_multiple_choice"
                class
                flat
                bordered
              >
                <q-card-section horizontal>
                  <q-card-section>
                    <q-list>
                      <q-item
                        v-for="choice in currentAnswer.question_detail.choices"
                        :key="choice.id"
                      >
                        <q-item-section avatar>
                          <q-icon
                            v-if="selectedChoices.includes(choice.id)"
                            color="primary"
                            :name="
                              choice.is_correct
                                ? 'radio_button_checked'
                                : 'cancel'
                            "
                          />
                        </q-item-section>
                        <q-item-section>
                          <div
                            v-if="choice.is_correct"
                            v-html="`<strong>${choice.text}</strong>`"
                          ></div>
                          <div v-else v-html="choice.text"></div>
                        </q-item-section>
                        <q-item-section avatar>
                          <q-icon
                            v-if="choice.is_correct"
                            color="green"
                            name="check_circle"
                          />
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                </q-card-section>
              </q-card>

              <q-card v-else flat bordered>
                <q-card-section horizontal>
                  <q-card-section>
                    <div v-html="currentAnswer.answer"></div>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <div class="flex col-md-5 items-center">
            <!-- <q-page-sticky position="bottom" :offset="[0, 10]"> -->
            <div class="text-center">
              <div class="text-h6 text-accent">Score</div>
              <q-slider
                v-model="currentAnswer.score"
                :min="0"
                :max="currentAnswer.question_detail.mark"
                :step="1"
                color="primary"
                @change="updateAnswer(currentAnswer.id, currentAnswer.score)"
              />

              <q-input
                outlined
                v-model="currentAnswer.score"
                @input="updateAnswer(currentAnswer.id, currentAnswer.score)"
                type="number"
                label="Enter Score"
              />
            </div>
            <!-- </q-page-sticky> -->
          </div>
        </div>
      </div>

      <q-page-sticky position="bottom" :offset="[0, 18]">
        <div class="flex justify-between">
          <div>
            <q-btn
              :disabled="answerIndex == 0"
              color="primary"
              dense
              flat
              icon="arrow_left"
              label="Prev"
              @click="setCurrentAnswer(-1)"
            />
            <q-btn
              :disabled="answerIndex == answers.length - 1"
              color="primary"
              dense
              flat
              icon-right="arrow_right"
              label="Next"
              @click="setCurrentAnswer(1)"
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
      answers: [],
      currentAnswer: null,
      answerIndex: 0,
      test: null,
      topics: [],
      report: null,
      student: this.$authStore.currentUser.student,
      logs: [],
      log: null,
      formData: {
        score: 0,
      },
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
    score() {
      var score = 0;
      for (let index = 0; index < this.answers.length; index++) {
        const ans = this.answers[index];
        score += ans.score || 0;
      }
      return score;
    },
    totalScore() {
      var totalScore = 0;
      for (let index = 0; index < this.answers.length; index++) {
        const ans = this.answers[index];
        totalScore += ans.question_detail.mark;
      }
      return totalScore;
    },
    selectedChoices() {
      if (this.currentAnswer?.question_detail.is_multiple_choice) {
        var ans = this.currentAnswer.answer.replace("[", "").replace("]", "");
        return ans.split(",").map((val) => parseInt(val));
      }
      return [];
    },
  },

  created() {
    this.getTopicQuestionStudentAnswers();
    this.getLogs();
  },

  methods: {
    getLogs() {
      this.$api
        .get(
          `student-notes-logs/?note=TESTED&topic=${this.$route.params.topic_id}`
        )
        .then((res) => {
          this.logs = res.data;
          if (this.logs.length) {
            this.log = this.logs[0];
          }
        });
    },
    getTopicQuestionStudentAnswers() {
      this.$api
        .get(
          `/topic-question-student-answers/?student=${this.$route.params.student_id}&topic_question__topic=${this.$route.params.topic_id}`
        )
        .then((res) => {
          this.answers = res.data;
          if (this.answers.length) {
            this.currentAnswer = this.answers[0];
          }
        });
    },

    updateAnswer(answer_id, score) {
      this.$api
        .patch(`topic-question-student-answers/${answer_id}/`, { score: score })
        .then((res) => {
          console.log(res.status);
        });
    },

    submitTest() {
      if (confirm("Submit Test?")) {
        this.$api
          .patch(`student-notes-logs/${this.log.id}/`, { note: "SCORED" })
          .then((res) => {
            this.$router.push("/teacher/tests");
          });
      }
    },

    setCurrentAnswer(indexToAdd) {
      var index = this.answerIndex + indexToAdd;
      if (index < 0 || index >= this.answers.length) {
        return;
      }
      this.currentAnswer = this.answers[index];
      this.answerIndex = index;
      // // this.getCurrentQuestionAnswer();
    },
  },
};
</script>
<style lang></style>
