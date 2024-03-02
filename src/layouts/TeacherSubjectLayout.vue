<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-sticky
      v-if="!leftDrawerOpen"
      position="top-left"
      :offset="[11, 11]"
    >
      <q-btn
        round
        color="primary"
        icon="menu"
        aria-label="Menu"
        @click="leftDrawerOpen = !leftDrawerOpen"
      />
    </q-page-sticky>
    <q-drawer v-model="leftDrawerOpen" class="bg-grey-2" show-if-above bordered>
      <q-card flat class="q-py-sm flex justify-between items-center">
        <router-link to="/teacher/subjects">
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

          <!-- <q-chip class="glossy" label="Term 1" /> -->
        </div>

        <div>
          <q-btn
            round
            dense
            outline
            class="q-mx-sm"
            color="primary"
            icon="close"
            aria-label="Menu"
            v-if="leftDrawerOpen"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
        </div>
      </q-card>
      <q-separator />
      <router-link :to="`/teacher/subjects/${subject?.id}`">
        <q-btn
          style="width: 100%"
          color="accent"
          flat
          label="Topics"
          class="q-mr-sm"
        />
      </router-link>
      <div v-for="topic in subject?.topics" :key="topic.id">
        <div class="flex justify-between bg-white text-h5 q-pa-md">
          {{ topic.name }}
        </div>
        <q-list dense bordered separator style="max-width: 318px">
          <q-item
            :active="subtopic.id == $route.params.subtopic_id"
            active-class="bg-accent text-white"
            v-for="subtopic in topic.subtopics"
            :key="subtopic.id"
            clickable
            class="q-pa-sm"
          >
            <router-link
              :to="`/teacher/subjects/${subject?.id}/topics/${topic.id}/subtopics/${subtopic.id}`"
              class="text-dark"
              style="width: 100%"
            >
              <q-item-section style="width: 100%">{{
                subtopic.name
              }}</q-item-section>
            </router-link>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view> </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
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
  },

  methods: {
    getSubject() {
      this.$api.get(`subjects/${this.$route.params.id}/`).then((res) => {
        this.subject = res.data;
        this.$resStore.setSubject(this.subject);
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
