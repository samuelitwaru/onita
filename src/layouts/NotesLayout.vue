<template>
  <q-layout view="lHh Lpr lFf" v-if="note">
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
          {{ note.subject_detail.name }}
        </div>
      </q-card>
      <q-separator />

      <div>
        <q-select
          outlined
          flat
          v-model="prevTopic"
          :options="
            notes_logs.filter((log) => log.note == 'TESTED' && log.topic)
          "
          label="Past Topics"
          option-value="topic"
          option-label="topic_name"
          map-options
          dense
          emit-value
          class="q-pa-xs"
          @update:model-value="changeTopic"
        />
      </div>

      <div v-if="topic">
        <div class="flex justify-between bg-white text-h6 q-pa-md">
          <router-link
            :to="`/notes/${this.$route.params.notes_id}/topics/${topic.id}`"
          >
            {{ topic.name }}
          </router-link>
        </div>
        <q-list
          class="q-ma-sm"
          dense
          bordered
          separator
          style="max-width: 318px"
        >
          <q-item
            :active="subtopic.id == $route.params.subtopic_id"
            active-class="bg-accent text-white"
            v-for="subtopic in topic.subtopics"
            :key="subtopic.id"
            clickable
            class="q-pa-sm"
          >
            <router-link
              :to="`/notes/${note.id}/topics/${topic.id}/subtopics/${subtopic.id}`"
              class="text-dark"
              style="width: 100%"
            >
              <q-item-section class="q-pa-sm" style="width: 100%">{{
                subtopic.name
              }}</q-item-section>
            </router-link>
          </q-item>
        </q-list>
        <router-link
          v-if="topic_questions.length"
          :to="`/notes/${note?.id}/topics/${topic?.id}/test`"
        >
          <q-btn
            color="primary"
            icon="note"
            style="width: 100%"
            flat
            label="Progress Test"
          />
        </router-link>

        <q-btn
          v-else
          color="primary"
          icon="arrow_right"
          style="width: 100%"
          flat
          label="Next Topic"
          @click="nextTopic"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <!-- <q-card
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
      </q-card> -->

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
      note: null,
      topic: null,
      topic_questions: [],
      leftDrawerOpen: false,
      notes_logs: [],
      last_log: null,
      prevTopic: null,
    };
  },

  created() {
    this.getNote();
    this.getTopicQuestions();
  },

  methods: {
    getNote() {
      this.$api.get(`notes/${this.$route.params.notes_id}/`).then((res) => {
        this.note = res.data;
        this.getStudentNotesLogs();
      });
    },

    getTopicQuestions() {
      this.$api
        .get(`topic-questions/?topic=${this.$route.params.topic_id}`)
        .then((res) => {
          this.topic_questions = res.data;
        });
    },

    changeTopic() {
      this.getTopic(this.prevTopic);
      this.$router.push(
        `/notes/${this.$route.params.notes_id}/topics/${this.prevTopic}`
      );
    },

    getStudentNotesLogs() {
      this.$api
        .get(
          `student-notes-logs/?student=${this.user.student.id}&notes=${this.$route.params.notes_id}`
        )
        .then((res) => {
          this.notes_logs = res.data.map((log) => {
            if (log.topic) {
              log.topic_name = log.topic_detail.name;
            }
            return log;
          });
          console.log(this.notes_logs);
          this.last_log = this.notes_logs.pop();
          this.getTopic(this.last_log.topic);
        });
    },

    getTopic(topic_id) {
      if (!topic_id) {
        topic_id = this.note.topics[0].id;
      }
      this.$api.get(`topics/${topic_id}`).then((res) => {
        this.topic = res.data;
        this.$router.push(
          `/notes/${this.$route.params.notes_id}/topics/${this.topic.id}`
        );
      });
    },
    nextTopic() {
      if (confirm("Finish this topic?")) {
        var data = {
          notes: this.$route.params.notes_id,
          student: this.user.student.id,
          topic: this.$route.params.topic_id,
          note: "TESTED",
        };
        this.$api.post(`student-notes-logs/`, data).then((res) => {
          if ((res.status = 201)) {
            this.last_log = res.data;
          }
        });
        this.$router.push(
          `/notes/${this.$route.params.notes_id}/topics/${this.$route.params.topic_id}/next`
        );
      }
    },
  },

  watch: {
    "$route.params.topic_id": function (newVal, oldVal) {
      this.getTopicQuestions();
    },
  },
});
</script>

<style>
a {
  text-decoration: none;
}
</style>
