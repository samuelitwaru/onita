<template lang="">
  <div class="q-pa-sm" v-if="test">
    <div class="text-h6">{{ test.name }}</div>
    <q-card
      v-for="question in test.questions"
      :key="question.id"
      flat
      bordered
      class="q-my-sm"
    >
      <q-card-section>
        <q-chip
          class="glossy"
          size="sm"
          dense
          :label="question.is_multiple_choice ? 'Multiple' : 'Single'"
        />
        <div v-html="question.text"></div>

        <table v-if="question.is_multiple_choice">
          <tbody>
            <tr v-for="choice in question.choices" :key="choice.id">
              <td>
                <input
                  type="checkbox"
                  :id="choice.id"
                  :name="choice.id"
                  :value="choice.id"
                  @click="submitMultipleChoiceAnswer(choice.id, question.id)"
                />
              </td>
              <td>
                <div
                  v-html="choice.text"
                  :for="choice.id"
                  class="q-pa-sm"
                ></div>
              </td>
            </tr>
          </tbody>
        </table>

        <table v-else>
          <tbody>
            <tr v-for="choice in question.choices" :key="choice.id">
              <td>
                <input
                  type="radio"
                  :id="choice.id"
                  :name="question.id"
                  :value="choice.id"
                  @click="submitSingleChoiceAnswer(choice.id, question.id)"
                />
              </td>
              <td>
                <div
                  v-html="choice.text"
                  :for="choice.id"
                  class="q-pa-sm"
                ></div>
              </td>
            </tr>
          </tbody>
        </table>
      </q-card-section>
    </q-card>

    <q-card class="my-card q-my-sm q-pa-sm" flat bordered>
      <div align="right">
        <q-btn color="accent" label="submit" @click="submitAnswers" />
        <test-report :report="report" :test="test" />
        <test-report />
      </div>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      test: null,
      report: null,
      student: this.$authStore.currentUser.student,
    };
  },

  created() {
    this.getTopic();
    // alert(this.report);
  },

  methods: {
    getTopic() {
      this.$api.get(`/topics/${this.$route.params.topic_id}/`).then((res) => {
        this.topic = res.data;
        this.test = this.topic.test;
        this.deleteStudentAnswers();
      });
    },

    deleteStudentAnswers() {
      this.$api
        .delete(
          `student-answers/delete_answers/?student=${this.student.id}&question__test=${this.test.id}`
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    submitSingleChoiceAnswer(choice_id, question_id) {
      var input = document.getElementById(choice_id);
      if (input.checked) {
        this.$api
          .post("student-answers/submit_single_choice_answer/", {
            student: this.student.id,
            choice: choice_id,
            question: question_id,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    submitMultipleChoiceAnswer(choice_id, question_id) {
      var input = document.getElementById(choice_id);
      if (input.checked) {
        this.$api
          .post("student-answers/", {
            student: this.student.id,
            choice: choice_id,
            question: question_id,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$api
          .delete(
            `student-answers/delete_answers/?student=${this.student.id}&choice=${choice_id}&question=${question_id}`
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    submitAnswers() {
      this.$api
        .get(`student-answers/submit_answers/?question__test=${this.test.id}`)
        .then((res) => {
          if (Object.keys(res.data).length) {
            this.report = res.data;
            console.log(this.report);
          }
        });
    },
  },
};
</script>
<style lang=""></style>
