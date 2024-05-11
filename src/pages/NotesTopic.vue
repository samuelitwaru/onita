<template lang="">
  <div class="q-pa-md" v-if="topic">
    <div class="text-h6 q-pa-sm">{{ topic?.name }}</div>
    <q-card class="my-card q-pa-md" flat bordered>
      <vue-mathjax :safe="false" :formula="topic.introduction"></vue-mathjax>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      topic: null,
    };
  },

  created() {
    this.getTopic();
  },

  methods: {
    getTopic() {
      this.$api.get(`topics/${this.$route.params.topic_id}`).then((res) => {
        this.topic = res.data;
      });
    },
  },

  watch: {
    "$route.params.topic_id": function (newVal, oldVal) {
      this.getTopic();
    },
  },
};
</script>
<style></style>
