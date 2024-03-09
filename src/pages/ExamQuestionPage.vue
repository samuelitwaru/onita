<template>
  <div class="q-pa-lg" v-if="exam.name">
    <div class="text-h4">{{ exam.name }}</div>
    <q-separator spaced />
    <div class="flex justify-between">
      <div class="text-h6">
        Question
        {{
          exam.questions.findIndex((ques) => ques.id == $route.params.ques_id) +
          1
        }}
        of {{ exam.questions.length }}
      </div>
      <q-chip
        class="glossy"
        :label="`${currentQuestion.question_detail.mark} mark(s)`"
      />
    </div>
    <div style="margin-bottom: 10rem" v-if="currentQuestion">
      <q-card class="" flat bordered>
        <q-card-section horizontal>
          <q-card-section>
            <div v-html="currentQuestion.question_text"></div>
          </q-card-section>
        </q-card-section>
      </q-card>

      <div class="q-my-lg">
        <div class="text-h6">Answer</div>
        <div v-if="currentQuestion.question_detail.is_multiple_choice">
          <q-list bordered separator>
            <q-item
              v-for="choice in currentQuestion.question_detail.choices"
              :key="choice.id"
            >
              <q-item-section avatar>
                <q-icon
                  v-if="currentQuestion.answer.includes(choice.id)"
                  color="green"
                  name="check"
                />
              </q-item-section>
              <q-item-section>
                <div v-html="choice.text"></div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-card v-else class="my-card" bordered flat>
          <q-card-section>
            <div v-html="currentQuestion.answer"></div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-page-sticky position="bottom" :offset="[0, 10]">
      <div class="text-center">
        <div class="text-h6 text-accent">Score</div>
        <q-slider
          v-model="formData.score"
          :min="0"
          :max="currentQuestion.question_detail.mark"
          :step="1"
          color="primary"
          @change="updateAnswer"
        />

        <q-input
          outlined
          v-model="formData.score"
          @input="updateAnswer"
          type="number"
          label="Enter Score"
        />
      </div>
    </q-page-sticky>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      exam: {},
      currentQuestion: {},
      formData: {
        score: 0,
        comment: "",
      },
    };
  },
  computed: {},
  created() {
    this.getExam();
  },
  methods: {
    getExam() {
      this.exam = {};
      this.$api.get(`exams/${this.$route.params.id}`).then((res) => {
        if (res.status == 200) {
          this.exam = res.data;
        }
        this.setCurrentQuestion();
        this.setAnswer();
      });
    },

    updateAnswer(answer) {
      this.$api
        .patch(`exam-answers/${this.$route.params.ques_id}/`, this.formData)
        .then((res) => {
          this.getExam();
        });
    },
    setCurrentQuestion() {
      this.currentQuestion = this.exam.questions.filter(
        (ques) => ques.id == this.$route.params.ques_id
      )[0];
      this.formData.score = this.currentQuestion.score;
      this.formData.comment = this.currentQuestion.comment;
    },

    setAnswer() {
      if (
        this.currentQuestion.question_detail.is_multiple_choice &&
        this.currentQuestion.answer
      ) {
        var ans = this.currentQuestion.answer
          .replace("[", "")
          .replace("]", "")
          .split(",");
        this.currentQuestion.answer = ans.map((val) => parseInt(val));
      }
    },
  },

  watch: {
    current(newVal, oldVal) {
      // console.log(this.currentQuestion.answer);
      this.updateAnswer(this.currentQuestion.answer || "");
    },

    "$route.params.ques_id": function (newVal, oldVal) {
      this.getExam();
    },
  },
};
</script>
