<template lang="">
  <div class="q-pa-sm" v-if="exam">
    <div class="text-center">
      <div class="text-h5">Self Examination</div>
      <div class="text-h4">{{ exam.subject_learning_center_name }} Level</div>

      <div class="text-h6">{{ formatDate(exam.created_at) }}</div>
      <div class="text-h5">{{ exam.subject_name }}</div>
      <q-separator spaced inset dark />
      <div class="">
        <strong>{{ secondsToHoursMinutes(examTime) }} </strong>
      </div>
    </div>
    <q-separator spaced />
    <div>
      <div class="text-h6">Read the following instructions carefully:</div>

      <ol type="1">
        <li>Attempt all the questions in all sections.</li>
        <li>No calculators are allowed in the examination.</li>
      </ol>
      <br /><br />
      <div class="text-h6">Benefits of Self Assessing</div>
      The students can,
      <ol type="1">
        <li>identify their own skill gaps, where their knowledge is weak.</li>
        <li>see where to focus their attention in learning.</li>
        <li>set realistic goals for their learning.</li>
        <li>revise their work to master the content.</li>
        <li>track their own progress.</li>
      </ol>
    </div>
    <q-separator spaced />
    <div class="text-center q-my-lg">
      <router-link
        :to="`/examination/${$route.params.id}/answers/${exam.questions[0].id}`"
      >
        <q-btn color="primary" label="Start" />
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      exam: null,
    };
  },
  created() {
    this.getExam();
  },
  computed: {
    examTime() {
      var timeList = this.exam?.questions.map((ques) => ques.question_time);
      // return timeList;
      return timeList.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
    },
  },
  methods: {
    getExam() {
      this.$api.get(`exams/${this.$route.params.id}`).then((res) => {
        if (res.status == 200) {
          this.exam = res.data;
          console.log(this.exam);
        }
      });
    },
    formatDate(date) {
      var dateObject = new Date(date);
      console.log(dateObject.getFullYear());
      return `${dateObject.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })}`;
    },

    secondsToHoursMinutes(seconds, returnformatted = true) {
      function addLeadingZero(number) {
        return number < 10 ? "0" + number : String(number);
      }
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      if (returnformatted) {
        return `${hours} Hours, ${addLeadingZero(minutes)} Minutes`;
      }
      return { hours, minutes };
    },
  },
};
</script>
<style lang=""></style>
