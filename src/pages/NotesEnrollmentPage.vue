<template lang>
  <div class="q-pa-sm my-auto" v-if="note">
    <small class="component-label">NotesPage</small>
    <div>
      <h2 class="text-h3 flex items-center">
        <img style="width: 100px" src="~assets/enroll.png" />
        Enroll
      </h2>
      <div>
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
          </tbody>
        </q-markup-table>
        <br />

        <q-btn size="xl" color="accent" label="ENROLL" @click="enroll" />
      </div>
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
      progresses: [],
    };
  },
  created() {
    this.getNote();
    this.getStudentTopicProgresses();
  },
  methods: {
    getStudentTopicProgresses() {
      this.$api
        .get(`student-notes-progresses/?notes=${this.$route.params.notes_id}`)
        .then((res) => {
          this.progresses = res.data;
          if (this.progresses.length) {
            window.location = `/notes/${this.$route.params.notes_id}/content`;
          }
        });
    },
    getNote() {
      this.$api.get(`notes/${this.$route.params.notes_id}/`).then((res) => {
        this.note = res.data;
      });
    },
    enroll() {
      this.$api
        .post(`notes/${this.$route.params.notes_id}/enroll-student/`, {
          student: this.$authStore.currentUser.student.id,
        })
        .then((res) => {
          if (res.status == 200) {
            window.location = "";
          }
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
