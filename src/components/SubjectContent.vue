<template lang="">
  <div class="q-pa-md">
    <div class="text-h6 q-pa-sm">{{ subtopic.name }}</div>
    <q-card class="my-card q-pa-md" flat bordered>
      <vue-mathjax :safe="false" :formula="subtopic.content"></vue-mathjax>
    </q-card>
    <div class="q-my-sm row justify-between">
      <div class="col" align="left">
        <a
          v-if="prevSubtopic"
          :href="`/subjects/7/topics/${this.subtopic.id}/subtopics/${this.prevSubtopic.id}`"
        >
          <q-btn color="primary" icon="arrow_left" label="previous" flat />
        </a>
      </div>
      <div class="col" align="right">
        <a
          v-if="nextSubtopic"
          :href="`/subjects/${$route.params.id}/topics/${this.subtopic.id}/subtopics/${this.nextSubtopic.id}`"
        >
          <q-btn color="primary" label="next" icon-right="arrow_right" flat />
        </a>
      </div>
    </div>
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

  methods: {
    getSubtopic() {
      this.$api
        .get(`subtopics/${this.$route.params.subtopic_id}`)
        .then((res) => {
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
};
</script>
<style></style>
