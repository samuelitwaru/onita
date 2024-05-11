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
      <q-card flat class="q-py-sm row justify-between items-center">
        <router-link class="col-1" to="/teacher/notes">
          <q-btn
            class="q-mx-sm"
            block
            color="primary"
            flat
            dense
            icon="arrow_back"
          />
        </router-link>
        <div class="text-h6 q-px-md q-py-xs col-9">
          {{ notes?.title }}
        </div>

        <div class="col-2">
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
      <router-link :to="`/teacher/notes/${notes?.id}`">
        <q-btn
          style="width: 100%"
          color="accent"
          flat
          label="General Introduction"
          class="q-mr-sm"
        />
      </router-link>
      <div v-for="topic in notes?.topics" :key="topic.id">
        <div class="flex justify-between bg-white text-h6 q-pa-sm">
          <router-link :to="`/teacher/notes/${notes?.id}/topics/${topic.id}`">
            {{ topic.name }}
          </router-link>
        </div>
        <q-list class="q-ma-sm" bordered separator style="max-width: 300px">
          <q-item
            :active="subtopic.id == $route.params.subtopic_id"
            active-class="bg-accent text-white"
            v-for="subtopic in topic.subtopics"
            :key="subtopic.id"
            clickable
          >
            <router-link
              :to="`/teacher/notes/${notes?.id}/topics/${topic.id}/subtopics/${subtopic.id}`"
              class="text-dark q-py-sm"
              style="width: 100%"
            >
              <q-item-section style="width: 100%">{{
                subtopic.name
              }}</q-item-section>
            </router-link>
          </q-item>
          <q-item>
            <q-item-section class="q-py-sm">
              <q-input
                type="text"
                outlined
                dense
                label="New Subtopic"
                @keydown.enter="createSubtopic($event, topic.id)"
              />
            </q-item-section>
          </q-item>
        </q-list>

        <div class="">
          <router-link
            :to="`/teacher/notes/${notes?.id}/topics/${topic.id}/test`"
          >
            <q-btn
              style="width: 100%"
              color="primary"
              class="block"
              icon="note"
              flat
              label="Progress Test"
            />
          </router-link>
        </div>
      </div>

      <q-card flat class="q-pa-sm">
        <!-- <div class="q-pa-sm"> -->
        <q-input
          outlined
          type="text"
          label="New Topic"
          v-model="formData.name"
          @keydown.enter="createTopic"
        />
        <!-- </div> -->
      </q-card>
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
      notes: null,
      leftDrawerOpen: false,
      formData: {
        name: "",
      },
    };
  },

  created() {
    this.getNotes();
  },

  methods: {
    getNotes() {
      this.$api.get(`notes/${this.$route.params.notes_id}/`).then((res) => {
        this.notes = res.data;
      });
    },
    createTopic() {
      this.formData.notes = this.$route.params.notes_id;
      console.log(this.formData);
      this.$api.post(`topics/`, this.formData).then((res) => {
        if (res.status == 201) {
          this.getNotes();
        }
      });
    },
    createSubtopic(e, topic_id) {
      var data = {
        name: e.target.value,
        topic: topic_id,
      };
      this.$api.post(`subtopics/`, data).then((res) => {
        if (res.status == 201) {
          this.getNotes();
        }
      });
    },
  },
  watch: {
    $route(to, from) {
      this.getNotes();
    },
  },
});
</script>

<style>
a {
  text-decoration: none;
}
</style>
