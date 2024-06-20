<template lang="">
  <div class="q-pa-md" v-if="topic">
    <div class="text-h6 q-pa-sm">{{ topic?.name }}</div>
    <q-card class="my-card q-pa-md" flat bordered>
      <vue-mathjax
        :safe="false"
        :formula="topic.introduction || nothing"
      ></vue-mathjax>
    </q-card>

    <div
      align="right"
      class="flex justify-center row reverse q-mt-auto q-py-md"
    >
      <router-link :to="nextLink">
        <q-btn
          color="primary"
          flat
          icon-right="arrow_right"
          label="next"
          @click="next"
        />
      </router-link>
      <router-link :to="prevLink">
        <q-btn
          flat
          color="primary"
          icon="arrow_left"
          label="previous"
          @click="next"
        />
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      topic: null,
      nothing: '<div class="text-h1 text-center text-grey">Nothing Here</div>',
    };
  },
  computed: {
    nextLink() {
      var subtopics = this.topic.subtopics;
      if (subtopics.length) {
        console.log(subtopics[0].id);
        return `/notes/${this.$route.params.notes_id}/topics/${this.topic?.id}/subtopics/${subtopics[0].id}`;
      }
      return ``;
    },
    prevLink() {
      return ``;
    },
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
