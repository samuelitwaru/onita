<template>
  <div>
    <div class="text-h5 q-pa-md">Subjects</div>
    <div class="flex q-pa-sm">
      <q-card
        v-for="note in notes"
        :key="note"
        class="my-card q-ma-sm"
        style="min-width: 300px"
      >
        <q-img
          :src="
            note.subject_detail.image ||
            `${this.$baseURL}/media/subjects/onita-logo.923195d3.png`
          "
        >
          <div class="absolute-bottom">
            <div class="text-h6">{{ note.title }}</div>
            <div class="text-subtitle2">
              {{ note.subject_detail.learning_center_name }} Level
            </div>
            <q-separator spaced />
            <div class="text-subtitle2">
              By {{ note.teacher_detail.full_name }}
            </div>
          </div>
        </q-img>

        <q-card-actions align="right">
          <router-link v-if="note.isLogged" :to="`/notes/${note.id}`">
            <q-btn color="primary" label="Study" />
          </router-link>
          <router-link v-else :to="`/notes/${note.id}`">
            <q-btn color="accent" label="enroll (10,000 UGX)" />
          </router-link>
        </q-card-actions>
      </q-card>
    </div>
    <q-separator spaced />
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  data() {
    return {
      user: this.$authStore.currentUser,
      notes: [],
      subjects: [],
      notes_logs: [],
    };
  },

  created() {
    this.getStudentNotesLogs();
  },

  methods: {
    getNotes() {
      this.$api
        .get(`notes/?level=${this.user.student.level.id}&is_published=false`)
        .then((res) => {
          this.notes = res.data.map((note) => {
            var logs = this.notes_logs.filter((log) => log.notes == note.id);
            if (logs.length) {
              note.isLogged = true;
            }
            return note;
          });
        });
    },

    getStudentNotesLogs() {
      this.$api
        .get(`student-notes-logs/?student=${this.user.student.id}`)
        .then((res) => {
          this.notes_logs = res.data;
          this.getNotes();
        });
    },

    enroll(notes_id) {
      this.$api
        .post(`student-notes-logs/`, {
          note: "ENROLLED",
          student: this.user.student.id,
          notes: notes_id,
          topic: null,
        })
        .then((res) => {
          this.notes_logs = res.data;
          this.getStudentNotesLogs();
        });
    },
  },
});
</script>
