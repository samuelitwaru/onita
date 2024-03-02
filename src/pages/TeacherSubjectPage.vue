<template lang="">
  <div class="q-pa-sm my-auto" v-if="subject">
    <div class="row">
      <div class="col-md-2 text-h2 text-right"></div>
      <div class="col text-center">
        <div class="text-h2">{{ subject.name }} Topics</div>
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
      </div>
      <div class="col-md-2 q-mt-auto q-pa-md"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      subject: null,
      user: this.$authStore.currentUser,
      currentTopic: {},
    };
  },
  created() {
    this.getSubject();
  },
  methods: {
    getSubject() {
      this.$api.get(`subjects/${this.$route.params.id}/`).then((res) => {
        this.subject = res.data;
      });
    },
  },
};
</script>
<style lang=""></style>
