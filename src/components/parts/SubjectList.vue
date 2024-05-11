<template>
  <div>
    <div class="text-h5 q-pa-md">My Subjects</div>
    <div class="flex q-pa-sm">
      <q-card
        v-for="note in notes"
        :key="note"
        class="my-card q-ma-sm"
        style="min-width: 200px"
      >
        <q-img src="~assets/onita-logo.923195d3.png">
          <div class="absolute-bottom">
            <div class="text-h6">{{ note.title }}</div>
            <div class="text-subtitle2">
              {{ note.subject_detail.learning_center_name }} Level
            </div>
          </div>
        </q-img>

        <q-card-actions align="right">
          <router-link v-if="note.isLogged" :to="`/notes/${note.id}`">
            <q-btn color="primary" label="Study" />
          </router-link>
          <q-btn
            v-else
            color="accent"
            label="enroll"
            @click="enroll(note.id)"
          />
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
        .get(
          `notes/?learning_center=${this.user.student.level.learning_center}`
        )
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
          console.log(res.data);
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
          console.log(res.data);
          this.notes_logs = res.data;
          this.getStudentNotesLogs();
        });
    },
  },
});
</script>
