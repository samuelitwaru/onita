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

        <q-card-actions class="flex justify-between">
          <q-circular-progress
            show-value
            class="text-light-blue q-ma-md"
            :value="notesProgresses[note.id] || 0"
            size="50px"
            color="light-blue"
          >
            {{ notesProgresses[note.id] || 0 }}%
          </q-circular-progress>
          <router-link :to="`/notes/${note.id}/content`">
            <q-btn color="primary" label="Study" />
          </router-link>
          <!-- <router-link :to="`/notes/${note.id}/enroll`">
            <q-btn color="accent" label="enroll" />
          </router-link> -->
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
      notesProgresses: {},
    };
  },

  created() {
    this.getNotes();
    this.getStudentProgresses();
  },

  methods: {
    getNotes() {
      this.$api
        .get(`notes/?level=${this.user.student.level.id}`)
        .then((res) => {
          this.notes = res.data;
        });
    },

    getStudentProgresses() {
      this.$api
        .get(`students/${this.user.student.id}/notes-progresses`)
        .then((res) => {
          this.notesProgresses = res.data;
        });
    },

    getNotesProgress(note) {
      var checkpoints = 2;
      for (let index = 0; index < note.topics.length; index++) {
        const topic = note.topics[index];
        checkpoints += 1;
        checkpoints += topic.subtopics.length;
      }
      return Math.round((note.logs.length / checkpoints) * 100);
    },
  },
});
</script>
