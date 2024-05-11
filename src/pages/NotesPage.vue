<template lang>
  <div class="q-pa-sm my-auto" v-if="note">
    <small class="component-label">NotesPage</small>
    <div class="row">
      <div class="col-md-2 text-h2 text-right"></div>
      <div class="col text-center">
        <!-- <div class="text-h2">{{ note.title }}</div> -->
        <br />
        <q-markup-table flat bordered>
          <tbody>
            <tr>
              <td class="text-left"><strong>Subject</strong></td>
              <td class="text-left">{{ note.subject_detail.name }}</td>
            </tr>
            <tr>
              <td class="text-left"><strong>Level</strong></td>
              <td class="text-left">
                {{ note.subject_detail.learning_center_name }}
              </td>
            </tr>
            <tr>
              <td class="text-left"><strong>Teacher</strong></td>
              <td class="text-left">
                {{ note.teacher_detail.full_name }}
              </td>
            </tr>
            <tr>
              <td class="text-left"><strong>Your Progress</strong></td>
              <td class="text-left">{{ calculateProgress() }}%</td>
            </tr>
          </tbody>
        </q-markup-table>
        <br />
        <div class="text-h4">Introduction</div>
        <q-separator spaced />
        <q-card class="q-pt-md" flat bordered>
          <div v-html="note.introduction"></div>
        </q-card>
      </div>
      <div class="col-md-2 q-mt-auto q-pa-md"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      subject: this.$resStore.currentSubject,
      user: this.$authStore.currentUser,
      topic: {},
      note: null,
      notes_logs: [],
    };
  },
  created() {
    this.getNote();
  },
  methods: {
    getNote() {
      this.$api.get(`notes/${this.$route.params.notes_id}/`).then((res) => {
        this.note = res.data;
        this.getStudentNotesLogs();
      });
    },
    getStudentNotesLogs() {
      this.$api
        .get(`student-notes-logs/?student=${this.user.student.id}`)
        .then((res) => {
          this.notes_logs = res.data;
          this.last_log = this.notes_logs.pop();
          this.getTopic(this.last_log.topic);
        });
    },
    getTopic(topic_id) {
      if (!topic_id) {
        topic_id = this.note.topics[0].id;
      }
      this.$api.get(`topics/${topic_id}`).then((res) => {
        this.topic = res.data;
      });
    },

    calculateProgress() {
      var topics_covered = this.notes_logs.filter(
        (log) => log.note != "TESTED"
      ).length;
      var total_topics = this.note.topics.length;
      var progress = (topics_covered / total_topics) * 100;
      return progress;
    },
  },
};
</script>
<style lang></style>
