<template lang="">
  <div class="q-pa-md">
    <div class="text-h6 q-pa-sm">{{ subtopic.name }}</div>
    <div v-if="viewMode == 'editor'">
      <content-editor
        :content="subtopic.content"
        @contentChanged="subtopic.content = $event"
      />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          label="save"
          icon="save"
          color="accent"
          @click="updateSubtopicContent"
        />
      </q-page-sticky>
    </div>
    <q-card
      v-if="viewMode == 'preview'"
      class="my-card q-pa-md q-mt-sm"
      flat
      bordered
    >
      <vue-mathjax :safe="false" :formula="subtopic.content"></vue-mathjax>
    </q-card>
    <q-page-sticky class="bg-white" position="top-right" :offset="[18, 18]">
      <q-btn-toggle
        v-model="viewMode"
        toggle-color="primary"
        :options="[
          { label: 'Editor', value: 'editor' },
          { label: 'Preview', value: 'preview' },
        ]"
      />
    </q-page-sticky>
  </div>
</template>
<script>
export default {
  data() {
    return {
      subtopic: {},
      prevSubtopic: null,
      nextSubtopic: null,
      viewMode: "editor",
      formData: {},
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

    updateSubtopicContent() {
      this.$api
        .patch(`subtopics/${this.$route.params.subtopic_id}/`, {
          content: this.subtopic.content,
        })
        .then((res) => {
          this.subtopic = res.data;
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
