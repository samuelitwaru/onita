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

    <div v-if="currentQuestion">
      <q-card class="" flat bordered>
        <q-card-section horizontal>
          <q-card-section>
            <div v-html="currentQuestion.question_text"></div>
          </q-card-section>
        </q-card-section>
      </q-card>

      <div class="q-my-lg">
        <div class="text-h6">Answer</div>

        <answer-choice-editor
          v-if="currentQuestion.question_detail.is_multiple_choice"
          :choices="currentQuestion.question_detail.choices"
          :question="currentQuestion.question_detail"
          @choiceChanged="
            currentQuestion.answer = $event;
            updateAnswer($event);
          "
        />

        <content-editor
          v-else
          :content="currentQuestion.answer || ''"
          @blur="updateAnswer($event)"
          @contentChanged="
            currentQuestion.answer = $event;
            updateAnswer($event);
          "
        />
      </div>
    </div>

    <q-page-sticky position="bottom" :offset="[0, 18]">
      <div class="text-center">
        <q-btn
          color="primary"
          icon="check"
          outline
          label="submit examination"
          @click="submitExam"
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
      });
    },

    updateAnswer(answer) {
      this.$api
        .patch(`exam-answers/${this.$route.params.ques_id}/`, {
          answer: answer,
        })
        .then((res) => {
          this.setCurrentQuestion();
        });
    },
    setCurrentQuestion() {
      this.currentQuestion = this.exam.questions.filter(
        (ques) => ques.id == this.$route.params.ques_id
      )[0];
    },

    submitExam() {
      if (confirm("Are you sure you would like to submit this exam?")) {
        this.$api
          .patch(`exams/${this.$route.params.id}/`, { submitted: true })
          .then((res) => {
            alert(res.status);
            if (res.status == 200) {
              this.$router.push("/dashboard/examination");
            }
          });
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
