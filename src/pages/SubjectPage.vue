<template lang="">
  <div class="q-pa-sm my-auto">
    <div class="row">
      <div class="col-md-2 text-h2 text-right"></div>
      <div class="col text-center">
        <div class="text-h2">Proceed Learning {{ subject.name }}</div>
        <q-separator spaced />
        <div align="center">
          <q-list bordered separator style="max-width: 318px">
            <q-item
              :active="topic.id == currentTopic.id"
              active-class="bg-accent text-white"
              v-for="topic in subject.topics"
              :key="topic.id"
            >
              <q-item-section>{{ topic.name }}</q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="q-pa-sm">
          <q-btn color="primary" label="Proceed" />
        </div>
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
      currentTopic: {},
    };
  },
  created() {
    this.getStudentTopicProgress();
  },
  methods: {
    getStudentTopicProgress() {
      this.$api
        .get(
          `student-topic-progresses/?student=${this.user.student.id}&subject=${this.$route.params.id}`
        )
        .then((res) => {
          if (res.data.length == 1) {
            this.currentTopic = res.data[0].topic_detail;
          }
        });
    },
  },
};
</script>
<style lang=""></style>
