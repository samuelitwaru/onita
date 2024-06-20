<template lang>
  <div class="q-pa-sm my-auto">
    <small class="component-label">NotesPage</small>
    <div class="">
      {{ progresses }}
      <hr />
      {{ currentProgress }}
      <hr />
      {{ nextProgress }}
      <hr />
      {{ prevProgress }}
      <div
        class="text-center"
        v-if="
          progresses.length &&
          currentProgress &&
          currentProgress.category != 'test'
        "
      >
        <br />
        <div class="text-h4">{{ currentProgress.title }}</div>

        <q-separator spaced />
        <q-card class="q-py-md" flat bordered>
          <div v-html="currentProgress.content || nothing"></div>
        </q-card>
      </div>

      <student-test
        v-else-if="
          progresses.length &&
          currentProgress &&
          currentProgress.category == 'test'
        "
        :progress="currentProgress"
        @submit-test="completeCurrentProgress"
      />

      <div
        v-else-if="progresses.length && !currentProgress"
        class="text-center"
      >
        <div class="text-h4">Congratulations</div>

        <q-separator spaced />
        <q-card class="q-py-md" flat bordered>
          <div v-html="'<p>You have completed the course!<p>'"></div>
        </q-card>
      </div>

      <div
        v-if="currentProgress && currentProgress.category != 'test'"
        class="flex justify-between row reverse q-mt-auto q-py-md"
      >
        <q-btn
          v-if="nextProgress"
          outline
          color="primary"
          icon-right="arrow_right"
          label="next"
          @click="completeCurrentProgress"
        />

        <q-btn
          v-if="prevProgress"
          outline
          color="primary"
          icon="arrow_left"
          label="previous"
          @click="goToPrevProgress"
        />
      </div>
    </div>
  </div>
</template>
<script>
import AlertMsg from "src/components/utils/AlertMsg.vue";

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
      progresses: [],
      currentProgress: null,
    };
  },
  created() {
    this.getProgresses();
    this.getCurrentProgress();
  },
  computed: {
    nextProgress() {
      return this.progresses.find(
        (prog) => prog.order == this.currentProgress.order + 1
      );
    },
    prevProgress() {
      return this.progresses.find(
        (prog) => prog.order == this.currentProgress.order - 1
      );
    },
  },
  methods: {
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
    getCurrentProgress() {
      this.$api
        .get(
          `student-notes-progresses/?student=${this.user.student.id}&notes=${this.$route.params.notes_id}&status=STARTED`
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.length) {
            this.currentProgress = res.data[0];
          }
        });
    },

    completeCurrentProgress() {
      this.$api
        .patch(`student-notes-progresses/${this.currentProgress.id}/`, {
          status: "COMPLETED",
        })
        .then((res) => {
          if (this.nextProgress) {
            this.startNextProgress();
          } else {
            window.location = "";
          }
        });
    },

    startNextProgress() {
      this.$api
        .patch(`student-notes-progresses/${this.nextProgress.id}/`, {
          status: "STARTED",
        })
        .then((res) => {
          this.getCurrentProgress();
        });
    },

    goToPrevProgress() {
      this.currentProgress = this.prevProgress;
    },
  },

  watch: {
    currentProgress(newVal, oldVal) {
      this.$bus.emit("progress-changed", newVal);
      console.log(newVal);
    },
  },
};
</script>
<style lang></style>
