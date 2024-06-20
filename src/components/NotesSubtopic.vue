<template lang>
  <div class="q-pa-md">
    {{nextTopic}}
    <div class="text-h6 q-pa-sm">{{ subtopic.name }}</div>
    <q-card class="my-card q-pa-md" flat bordered>
      <vue-mathjax :safe="false" :formula="subtopic.content"></vue-mathjax>
    </q-card>
    <div
      align="right"
      class="flex justify-center row reverse q-mt-auto q-py-md">
      <router-link v-if='nextLink' :to="nextLink">
        <q-btn
          color="primary"
          flat
          icon-right="arrow_right"
          label="next" />
      </router-link>
      <q-btn
        color="primary"
        flat
        icon-right="arrow_right"
        label="Next"
        @click="next" />
      <!-- <router-link :to="prevLink">
        <q-btn
          flat
          color="primary"
          icon="arrow_left"
          label="previous"
          @click="next" />
      </router-link> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      subtopic: {},
      topic:null,
      nextTopic: null,
      prevSubtopic: null,
      nextSubtopic: null,
    };
  },

  created() {
    this.getSubtopic();
    this.getTopic();
  },
  computed: {
    nextLink() {
      if (this.topic){
        var subtopics = this.topic.subtopics;
        if (subtopics.length) {
          console.log(subtopics)
          var nextSubtopic = subtopics.find(st=>st.order==this.subtopic.order+1)

          if(nextSubtopic){
            return `/notes/${this.$route.params.notes_id}/topics/${this.topic?.id}/subtopics/${nextSubtopic.id}`;
          }
          if (this.topic.test){
            return `/notes/${this.$route.params.notes_id}/topics/${this.topic?.id}/test`;
          }
        }
      }
      return '';
        },
        prevLink() {
        return ``;
        },
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
        getTopic() {
        this.$api.get(`topics/${this.$route.params.topic_id}`).then((res) => {
        this.topic = res.data;
        this.$api.get(`topics/?order=${this.topic.order+1}`).then((res) => {
        if (res.data.length)
        this.nextTopic = res.data[0];
        });
        });
        },
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
