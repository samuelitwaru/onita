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
    this.getSubtopic(this.$route.params.subtopic_id);
  },

  methods: {
    getSubtopic(subtopicId) {
      this.$api.get(`subtopics/${subtopicId}`).then((res) => {
        this.subtopic = res.data;
        this.getNextSubtopic(this.subtopic.topic, this.subtopic.order + 1);
        this.getPrevSubtopic(this.subtopic.topic, this.subtopic.order - 1);
      });
    },

    getNextSubtopic(topic_id, order) {
      this.$api
        .get(`subtopics/?topic=${topic_id}&order=${order}`)
        .then((res) => {
          if (res.data.length == 1) this.nextSubtopic = res.data[0];
        });
    },

    getPrevSubtopic(topic_id, order) {
      this.$api
        .get(`subtopics/?topic=${topic_id}&order=${order}`)
        .then((res) => {
          if (res.data.length == 1) this.prevSubtopic = res.data[0];
        });
    },
  },

  watch: {
    "$route.params.subtopic_id": function (newVal, oldVal) {
      this.getSubtopic(newVal);
    },
  },
};
</script>
<style></style>
