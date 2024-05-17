<template lang="">
  <div class="q-pa-md">
    <small class="component-label">TeacherNotesSubtopic</small>
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
        <q-btn
          flat
          dense
          class="q-ma-sm"
          color="primary"
          icon="delete"
          @click="deleteSubtopic"
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
      console.log(this.subtopic.content);
      this.$api
        .patch(`subtopics/${this.$route.params.subtopic_id}/`, {
          content: this.subtopic.content,
        })
        .then((res) => {
          this.subtopic = res.data;
        });
    },

    deleteSubtopic() {
      if (confirm("Are you sure you want to delete this subtopic?")) {
        this.$api
          .delete(`subtopics/${this.$route.params.subtopic_id}`)
          .then((res) => {
            if (res.status == 204) {
              this.$router.push(
                `/teacher/notes/${this.$route.params.notes_id}/topics/${this.$route.params.topic_id}`
              );
            }
          });
      }
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
