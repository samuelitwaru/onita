<template lang>
  <div class="q-pa-sm">
    <div class="flex justify-between items-center">
      <div class="text-h5 text-primary">My Notes</div>
      <create-notes-dialog @notes-created="getNotes()" />
    </div>
    <q-separator spaced />

    <div class="flex q-pa-sm">
      <router-link
        :to="`/teacher/notes/${note.id}`"
        v-for="note in notes"
        :key="note.id"
      >
        <q-card class="my-card q-ma-sm" style="min-width: 200px">
          <q-img src="~assets/onita-logo.923195d3.png">
            <div class="absolute-bottom">
              <div class="text-h6">{{ note.title }}</div>
              <div class="text-subtitle2">
                {{ note.subject_detail.learning_center_name }} Level
              </div>
            </div>
          </q-img>
        </q-card>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      notes: [],
      subjects: [],
      teacher_subjects: {
        1: [],
      },
    };
  },
  created() {
    this.getTeacherSubjects();
    this.getNotes();
  },
  methods: {
    getNotes() {
      this.$api
        .get(
          `notes/?teacher_subject__teacher=${this.$authStore.user.teacher.id}`
        )
        .then((res) => {
          this.notes = res.data;
          // console.log(this.subjects);
        });
    },
    getTeacherSubjects() {
      this.$api
        .get(`teacher-subjects/?teacher=${this.$authStore.user.teacher.id}`)
        .then((res) => {
          this.subjects = res.data;
          console.log(this.subjects);
        });
    },
  },
};
</script>
<style lang></style>
