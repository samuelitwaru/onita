<template>
  <q-layout view="hhh Lpr fff">
    <q-header reveal bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <router-link to="/dashboard/subjects">
          <q-btn class="q-mx-sm text-white" outline dense icon="arrow_back" />
        </router-link>
        <q-toolbar-title>
          {{ note?.title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" class="bg-grey-2" show-if-above bordered>
      <!-- {{ progresses }}

      {{ lastProgress }} -->

      <div v-if="!progresses?.length" class="text-center q-py-xl">
        Enroll to start learning
      </div>

      <div v-else-if="note">
        <q-list>
          <q-item v-for="prog in progresses" :key="prog.id">
            <q-item-section top avatar>
              <q-avatar
                v-if="prog.category == 'topic'"
                color="primary"
                text-color="white"
                icon="topic"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ prog.title }}</q-item-label>
              <q-item-label caption lines="2"
                >Secondary line text.</q-item-label
              >
            </q-item-section>
            <q-item-section side top>
              <q-item-label caption>{{ prog.status }}</q-item-label>
              <q-icon
                v-if="prog.status == 'COMPLETED'"
                name="check"
                color="green"
              />
            </q-item-section>
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
      note: null,
      leftDrawerOpen: false,
      last_log: null,
      prevTopic: null,
      progresses: [],
      lastProgress: null,
    };
  },

  created() {
    this.getNote();
    this.getProgresses();

    this.$bus.on("progress-changed", (val) => this.getProgresses());
  },

  methods: {
    getNote() {
      this.$api.get(`notes/${this.$route.params.notes_id}/`).then((res) => {
        this.note = res.data;
      });
    },

    getProgresses() {
      this.$api
        .get(
          `student-notes-progresses/?student=${this.user.student.id}&notes=${this.$route.params.notes_id}`
        )
        .then((res) => {
          console.log(res.data);
          this.progresses = res.data;
        });
    },

    changeTopic() {
      this.getTopic(this.prevTopic);
      this.$router.push(
        `/notes/${this.$route.params.notes_id}/topics/${this.prevTopic}`
      );
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
      this.getNote();
    },
  },
});
</script>

<style>
a {
  text-decoration: none;
}

.fixed-width-ellipsis {
  width: 200px; /* Set the fixed width as needed */
  white-space: nowrap; /* Prevent the text from wrapping */
  overflow: hidden; /* Hide the overflow content */
  text-overflow: ellipsis; /* Add ellipsis (...) for overflowing text */
  display: block; /* Ensure the element behaves like a block */
}
</style>
