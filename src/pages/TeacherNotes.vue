<template lang>
  <div v-if="note">
    <small class="component-label">TeacherNotes</small>
    <div class="text-h6 q-pa-sm">General Introduction</div>
    <div class="q-pa-sm">
      <content-editor
        :content="note.introduction"
        @contentChanged="updateNotes({ introduction: $event })"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      note: null,
    };
  },
  created() {
    this.getNotes();
    console.log(this.$router.options.routes[0].component);
  },
  methods: {
    getNotes() {
      this.$api.get(`notes/${this.$route.params.notes_id}/`).then((res) => {
        this.note = res.data;
      });
    },

    updateNotes(data) {
      this.$api
        .patch(`notes/${this.$route.params.notes_id}/`, data)
        .then((res) => {
          if (res.status == 200) return;
        });
    },
  },
};
</script>
<style lang></style>
