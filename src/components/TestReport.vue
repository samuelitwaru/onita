<template lang="">
  <div>
    <q-dialog v-model="show">
      <q-card>
        <q-card-section class="flex justify-center">
          <div class="text-h6">{{ test.name }}</div>
        </q-card-section>
        <q-separator spaced />

        <q-card-section align="center">
          <div class="text-h1 score q-my-auto" align="center">{{ score }}%</div>
          <div class="q-my-sm" v-if="score >= 50">
            <div class="text-h6">Congratulations!</div>
            <div class="text-h6">You have passed the test.</div>
          </div>
          <div class="q-my-sm" v-else>
            <div class="text-h6">Sorry!</div>
            <div class="text-h6">You have falied the test.</div>
          </div>
        </q-card-section>
        <q-separator spaced />
        <q-card-actions align="right">
          <!-- <q-btn flat label="see my test" color="accent" /> -->
          <a href="" class="q-px-sm"
            ><q-btn label="Attempt Again" color="accent"
          /></a>
          <a
            v-if="report.next_topic.id"
            :href="`/subjects/7/topics/${report.next_topic.id}/subtopics/${subtopic}`"
          >
          </a>

          <q-btn
            v-if="score >= 50"
            color="primary"
            label="save progress and continue"
            @click="updateStudentProgress"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  props: {
    report: null,
    test: null,
  },
  data() {
    return {};
  },

  computed: {
    show() {
      return Boolean(this.report);
    },
    score() {
      if (this.report) {
        var answers = Object.values(this.report.answers).map((item) =>
          item.answers.map((val) => (val ? 1 : 0))
        );
        var marksPerQuestion = 100 / answers.length;
        var totalMarks = 0;
        for (let index = 0; index < answers.length; index++) {
          const ans = answers[index];
          totalMarks += (this.sumArray(ans) / ans.length) * marksPerQuestion;
        }
        return totalMarks;
      }
      return null;
    },

    subtopic() {
      if (
        this.report.next_topic.id &&
        this.report.next_topic.subtopics.length
      ) {
        return this.report.next_topic.subtopics[0].id;
      }
      return null;
    },
  },

  methods: {
    sumArray(array) {
      var sum = 0;
      for (var i = 0; i < array.length; i++) {
        sum += array[i];
      }
      return sum;
    },

    updateStudentProgress() {
      if (this.report.student_progress.id) {
        this.$api
          .patch(
            `student-topic-progresses/${this.report.student_progress.id}/`,
            { topic: this.report.next_topic.id }
          )
          .then((res) => {
            window.location.href = `/subjects/${this.$route.params.id}`;
          });
      }
    },
  },
};
</script>
<style>
.score {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 8px solid #3498db; /* You can change the color as needed */
  box-sizing: border-box;
  margin-top: auto;
  margin-bottom: auto;
  /* padding-left: 0.8rem; */
  padding-top: 4rem;
  /* padding: 2rem; */
}
</style>
