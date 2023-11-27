<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="leftDrawerOpen" class="bg-grey-2" show-if-above bordered>
      <q-card flat class="q-py-sm flex items-center">
        <router-link to="/dashboard/subjects">
          <q-btn
            class="q-mx-sm"
            block
            color="primary"
            flat
            dense
            icon="arrow_back"
          />
        </router-link>
        <div class="text-h6 q-px-md q-py-xs">
          {{ subject?.name }}
          <q-chip class="glossy" label="Term 1" />
        </div>
      </q-card>
      <q-separator />

      <q-list>
        <div v-if="topic">
          <q-btn color="black" class="full-width" align="left" flat>
            <span class="q-px-md">{{ topic.name }}</span>
          </q-btn>

          <q-card class="my-card q-mx-md" flat bordered>
            <q-card-section class="q-pa-sm">
              <ul>
                <li v-for="subtopic in topic.subtopics" :key="subtopic.id">
                  <a
                    :href="`/subjects/${subject?.id}/topics/${topic.id}/subtopics/${subtopic.id}`"
                    block
                  >
                    {{ subtopic.name }}
                  </a>
                </li>
                <div v-if="topic.test" class="q-py-sm">
                  <router-link
                    :to="`/subjects/${subject.id}/topics/${topic.id}/test`"
                  >
                    <q-btn
                      icon="note"
                      color="accent"
                      dense
                      flat
                      label="Progress Test"
                    />
                  </router-link>
                </div>
              </ul>
            </q-card-section>
          </q-card>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-card
        style="background: #00000000"
        flat
        bordered
        class="my-card q-pa-sm q-ma-xs"
      >
        <div>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
          {{ topic?.name }}
        </div>
      </q-card>

      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SubjectLayout",

  data() {
    return {
      user: this.$authStore.currentUser,
      subject: null,
      topic: null,
      leftDrawerOpen: false,
    };
  },

  created() {
    this.getSubject();
    // this.getTopic();
  },

  methods: {
    getStudentTopicProgress() {
      this.$api
        .get(
          `student-topic-progresses/?student=${this.user.student.id}&subject=${this.$route.params.id}`
        )
        .then((res) => {
          if (res.data.length == 1) {
            this.topic = res.data[0].topic_detail;
            console.log(this.topic);
          }
        });
    },

    getSubject() {
      this.$api.get(`subjects/${this.$route.params.id}/`).then((res) => {
        this.subject = res.data;
        this.getStudentTopicProgress();
      });
    },

    getTopic() {
      this.$api.get(`topics/${this.$route.params.topic_id}`).then((res) => {
        this.topic = res.data;
      });
    },
  },
});
</script>

<style>
a {
  text-decoration: none;
}
</style>
