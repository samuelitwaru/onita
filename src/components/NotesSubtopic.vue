<template lang="">
  <div class="q-pa-md">
    <div class="text-h6 q-pa-sm">{{ subtopic.name }}</div>
    <q-card class="my-card q-pa-md" flat bordered>
      <vue-mathjax :safe="false" :formula="subtopic.content"></vue-mathjax>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      subtopic: {},
      prevSubtopic: null,
      nextSubtopic: null,
    };
  },

  created() {
    this.getSubtopic();
  },
  computed: {
    allQuestionsAnswered() {
      if (this.questions) {
        return !this.exam.questions
          .map((ques) => Boolean(ques.answer))
          .includes(false);
      }
      return false;
    },
  },
  methods: {
    getSubtopic() {
      this.$api
        .get(`subtopics/${this.$route.params.subtopic_id}`)
        .then((res) => {
          this.subtopic = res.data;
        });
    },
  },
};
</script>
<style></style>
