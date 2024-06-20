<template lang>
  <div class="q-pa-sm my-auto">
    <small class="component-label">NotesPage</small>
    <div class="">
      <div class="text-center">
        <br />
        <div class="text-h4">{{ title }}</div>

        <q-separator spaced />
        <q-card class="q-py-md" flat bordered>
          <div v-html="content || nothing"></div>
        </q-card>
      </div>
      <div class="flex justify-between row reverse q-mt-auto q-py-md">
        <q-btn
          v-if="nextProgress"
          outline
          color="primary"
          icon-right="arrow_right"
          label="next"
          @click="nxt"
        />
        <div v-else>
          <q-btn
            v-if="
              !(this.currentLog?.topic || this.currentLog?.subtopic) &&
              this.currentLog?.status == 'ENROLLED'
            "
            color="primary"
            icon="arrow_right"
            label="Go to first topic"
            @click="startTopic"
          />
          <q-btn
            v-else-if="this.currentLog?.topic && !this.currentLog?.subtopic"
            color="primary"
            icon="arrow_right"
            label="Go to first Subtopic"
            @click="startSubtopic"
          />
          <router-link
            v-else-if="
              !(this.currentLog?.topic || this.currentLog?.subtopic) &&
              this.currentLog?.status == 'COMPLETE'
            "
            to="/dashboard/subjects"
          >
            <q-btn
              color="primary"
              icon="arrow_right"
              label="Browse more courses"
            />
          </router-link>
          <q-btn
            v-else
            color="primary"
            icon="arrow_right"
            label="next"
            @click="next"
          />
        </div>

        <q-btn
          outline
          color="primary"
          icon="arrow_left"
          label="previous"
          @click="prev"
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
      notes: null,
      nothing: '<div class="text-h1 text-grey">Nothing Here</div>',
      logs: [],
      currentLog: null,
      title: null,
      content: null,
      nextTopic: null,
      nextSubtopic: null,
    };
  },
  created() {
    this.getLogs();
  },
  computed: {
    nextProgress() {
      var nextIndex = this.logs.indexOf(this.currentLog) + 1;
      if (nextIndex < this.logs.length) {
        return this.logs[nextIndex];
      }
      return null;
    },
    nextLogData() {
      var data = {};
      if (this.currentLog && this.notes) {
        var topic = null;
        var subtopic = null;
        var status = "STARTED";
        if (
          !(this.currentLog.topic || this.currentLog.subtopic) &&
          this.currentLog.status == "ENROLLED"
        ) {
          var firstTopic = this.notes.topics.find((topic) => topic.order == 1);
          topic = firstTopic;
        } else if (this.currentLog.topic && !this.currentLog.subtopic) {
          var firstSubtopic = this.topic.subtopics.find(
            (subtopic) => subtopic.order == 1
          );
          subtopic = firstSubtopic;
        } else if (this.currentLog.topic && this.currentLog.subtopic) {
          if (this.nextSubtopic) {
            topic = this.nextSubtopic.topic;
            subtopic = this.nextSubtopic.id;
            status = "STARTED";
          } else if (this.nextTopic) {
            topic = this.nextTopic.id;
            subtopic = null;
            status = "STARTED";
          } else {
            status = "COMPLETE";
          }
        }

        data.student = this.user.student.id;
        data.notes = this.currentLog.notes;
        data.topic = topic;
        data.subtopic = subtopic;
        data.status = status;
      }
      return data;
    },
  },
  methods: {
    getLogs() {
      this.$api
        .get(
          `student-notes-progresses/?notes=${this.$route.params.notes_id}&student=${this.user.student.id}`
        )
        .then((res) => {
          if ((res.status = 200)) {
            this.logs = res.data;
            if (this.logs.length == 0) {
              window.location = `/notes/${this.$route.params.notes_id}/enroll`;
            } else {
              this.currentLog = this.logs[this.logs.length - 1];
              this.getContent();
              this.getNextSubtopic();
              this.getNextTopic();
            }
          }
        });
    },

    getNotes() {
      this.$api.get(`notes/${this.currentLog.notes}`).then((res) => {
        if ((res.status = 200)) {
          this.notes = res.data;
          this.title = "Introduction";
          this.content = this.notes.introduction;
        }
      });
    },

    getSubtopic() {
      this.$api.get(`subtopics/${this.currentLog.subtopic}`).then((res) => {
        if ((res.status = 200)) {
          this.subtopic = res.data;
          this.title = this.subtopic.name;
          this.content = this.subtopic.content;
        }
      });
    },

    getTopic() {
      this.$api.get(`topics/${this.currentLog.topic}`).then((res) => {
        if ((res.status = 200)) {
          this.topic = res.data;
          this.title = this.topic.name;
          this.content = this.topic.content;
        }
      });
    },

    getContent() {
      if (this.currentLog.subtopic) {
        this.getSubtopic();
      } else if (this.currentLog.topic) {
        this.getTopic();
      } else if (!this.currentLog.topic && !this.currentLog.subtopic) {
        if (this.currentLog.status == "ENROLLED") {
          this.getNotes();
        } else {
          this.title = "Congratulations";
          this.content = "<p>You have completed the course!<p>";
        }
      }
    },

    getNextTopic() {
      this.nextTopic = null;
      if (this.currentLog.topic) {
        this.$api
          .get(`topics/${this.currentLog.topic}/get-next/`)
          .then((res) => {
            if ((res.status = 200)) {
              this.nextTopic = res.data;
            }
          });
      }
    },

    getNextSubtopic() {
      this.nextSubtopic = null;
      if (this.currentLog.subtopic) {
        this.$api
          .get(`subtopics/${this.currentLog.subtopic}/get-next/`)
          .then((res) => {
            if ((res.status = 200)) {
              this.nextSubtopic = res.data;
            }
          });
      }
    },

    next() {
      if (this.currentLog.topic && this.currentLog.subtopic) {
        var data = null;
        if (this.nextSubtopic) {
          data = {
            student: this.user.student.id,
            notes: this.currentLog.notes,
            topic: this.nextSubtopic.topic,
            subtopic: this.nextSubtopic.id,
            status: "STARTED",
          };
        } else if (this.nextTopic) {
          data = {
            student: this.user.student.id,
            notes: this.currentLog.notes,
            topic: this.nextTopic.id,
            subtopic: null,
            status: "STARTED",
          };
        } else {
          data = {
            student: this.user.student.id,
            notes: this.currentLog.notes,
            topic: null,
            subtopic: null,
            status: "COMPLETE",
          };
        }

        if (data) {
          this.$api.post(`student-notes-progresses/`, data).then((res) => {
            if ((res.status = 201)) {
              this.currentLog = res.data;
              this.getLogs();
            }
          });
        }
      }
    },

    prev() {
      var prevIndex = this.logs.indexOf(this.currentLog) - 1;
      this.currentLog = this.logs[prevIndex];
    },

    nxt() {
      this.currentLog = this.nextProgress;
    },

    startTopic() {
      var firstTopic = this.notes.topics.find((topic) => topic.order == 1);
      if (!firstTopic) {
        alert("First topic not found!");
        return;
      }
      var data = {
        student: this.user.student.id,
        notes: this.currentLog.notes,
        topic: firstTopic.id,
        subtopic: null,
        status: "STARTED",
      };
      this.$api.post(`student-notes-progresses/`, data).then((res) => {
        if ((res.status = 201)) {
          this.currentLog = res.data;
          this.getLogs();
        }
      });
    },

    startSubtopic() {
      var firstSubtopic = this.topic.subtopics.find(
        (subtopic) => subtopic.order == 1
      );
      if (!firstSubtopic) {
        alert("Next subtopic not found!");
        return;
      }
      var data = {
        student: this.user.student.id,
        notes: this.currentLog.notes,
        topic: this.topic.id,
        subtopic: firstSubtopic.id,
        status: "STARTED",
      };
      this.$api.post(`student-notes-progresses/`, data).then((res) => {
        if ((res.status = 201)) {
          this.currentLog = res.data;
          this.getLogs();
        }
      });
    },
  },

  watch: {
    currentLog(newVal, oldVal) {
      this.$bus.emit("progress-changed", newVal);
      this.getContent();
    },
  },
};
</script>
<style lang></style>
