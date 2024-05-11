<template lang>
  <q-page>
    <div v-if='topics.length' class="q-py-xl flex flex-center">
      <div align="center" v-if='nextTopic'>
        <p class="text-center text-h5">
          Your next topic is {{nextTopic.name}}
        </p>
        <q-btn
          color="primary"
          icon="arrow_right"
          outline
          label="Continue"
          @click="goToNextTopic" />
      </div>

      <div align="center" v-else>
        <p class="text-center text-h5">
          Congragulations! You have completed the course
        </p>
        <router-link to="/dashboard/subjects">

          <q-btn
            color="primary"
            icon="arrow_right"
            outline
            label="Go To Subjects" />
        </router-link>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      last_log: null,
      user: this.$authStore.currentUser,
      topics: [],
    };
  },
  created() {
    this.getStudentNotesLogs();
    this.getTopics();
  },
  computed: {
    currentTopic() {
      if (this.topics.length) {
        return this.topics.filter(
          (topic) => topic.id == this.$route.params.topic_id
        )[0];
      }
      return null;
    },
    nextTopic() {
      var index = this.topics.findIndex(
        (topic) => topic.order == this.currentTopic.order + 1
      );
      if (index >= 0) {
        return this.topics[index];
      }
      return null
    },
  },
  methods: {
    getTopics() {
      this.$api
        .get(`topics/?notes=${this.$route.params.notes_id}`)
        .then((res) => {
          this.topics = res.data;
        });
    },
    getStudentNotesLogs() {
      this.$api
        .get(
          `student-notes-logs/?student=${this.user.student.id}&notes=${this.$route.params.notes_id}`
        )
        .then((res) => {
          this.notes_logs = res.data.map((log) => {
            if (log.topic) {
              log.topic_name = log.topic_detail.name;
            }
            return log;
          });
          this.last_log = this.notes_logs.pop();
        });
    },
    goToNextTopic() {
      var index = this.topics.findIndex(
        (topic) => topic.order == this.currentTopic.order + 1
      );
      var topic = this.topics[index];
      var data = {
        notes: this.$route.params.notes_id,
        student: this.user.student.id,
        topic: topic.id,
        note: "ENROLLED",
      };
      this.$api.post(`student-notes-logs/`, data).then((res) => {
        if ((res.status = 201)) {
          this.last_log = res.data;
        }
      });
      document.location = `/notes/${this.$route.params.notes_id}/`;
    },
  },
};
</script>
<style lang></style>
