<template lang>
  <div v-if="topic">
    <small class="component-label">TeacherNotesTopic</small>
    <div class="text-h6 q-pa-sm">{{ topic.name }}</div>
    <div class="q-pa-sm">
      <content-editor
        :content="topic.introduction"
        @contentChanged="
          topic.introduction = $event;
          updateTopicContent();
        "
      />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          label="save"
          icon="save"
          color="accent"
          @click="updateTopicContent"
        />

        <q-btn
          flat
          dense
          class="q-ma-sm"
          color="primary"
          icon="delete"
          @click="deleteTopic"
        />
      </q-page-sticky>
    </div>
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
      this.$api.get(`topics/${this.$route.params.topic_id}/`).then((res) => {
        this.topic = res.data;
      });
    },
    updateTopicContent() {
      this.$api
        .patch(`topics/${this.$route.params.topic_id}/`, {
          introduction: this.topic.introduction,
        })
        .then((res) => {
          this.subtopic = res.data;
        });
    },

    deleteTopic() {
      if (confirm("Are you sure you want to delete this topic?")) {
        this.$api
          .delete(`topics/${this.$route.params.topic_id}`)
          .then((res) => {
            if (res.status == 204) {
              this.$router.push(
                `/teacher/notes/${this.$route.params.notes_id}`
              );
            }
          });
      }
    },
  },

  watch: {
    "$route.params.topic_id": function (newVal, oldVal) {
      this.getTopic(newVal);
    },
  },
};
</script>
<style lang></style>
