<template lang>
  <div class="q-pa-sm my-auto" v-if="note">
    <small class="component-label">NotesPage</small>
    <div class="">
      <div class="text-center">
        <br />
        <div class="text-h4">Introduction</div>

        <q-separator spaced />
        <q-card class="q-py-md" flat bordered>
          <div v-html="note.introduction || nothing"></div>
        </q-card>
      </div>
      <div
        align="right"
        class="flex justify-between row reverse q-mt-auto q-py-md"
      >
        <q-btn
          v-if="firstTopic"
          color="primary"
          icon="arrow_right"
          label="next"
          @click="next"
        />
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
      nothing: '<div class="text-h1 text-grey">Nothing Here</div>',
      notes_logs: [],
    };
  },
  created() {
    this.getNote();
  },
  computed: {
    firstTopic() {
      var topics = this.note.topics.find((topic) => topic.order == 1);
      return topics;
    },
  },
  methods: {
    getNote() {
      this.$api.get(`notes/${this.$route.params.notes_id}/`).then((res) => {
        this.note = res.data;
      });
    },

    next() {
      window.location = `/notes/${this.$route.params.notes_id}/topics/${this.firstTopic.id}`;
    },
  },
};
</script>
<style lang></style>
