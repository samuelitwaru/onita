<template>
  <div>
    <div class="text-h5 q-pa-md">My Subjects</div>
    <div class="flex q-pa-sm">
      <router-link
        v-for="subject in subjects"
        :key="subject"
        :to="`/subjects/${subject.id}`"
      >
        <q-card class="my-card q-ma-sm" style="min-width: 200px">
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom">
              <div class="text-h6">{{ subject.name }}</div>
              <div class="text-subtitle2">
                {{ subject.learning_center_name }} Level
              </div>
            </div>
          </q-img>

          <q-card-actions align="right">
            <q-btn color="primary" label="view" />
          </q-card-actions>
        </q-card>
      </router-link>
    </div>
    <q-separator spaced />
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  data() {
    return {
      user: this.$authStore.currentUser,
      subjects: [],
      subjectProgresses: [],
    };
  },

  created() {
    this.getSubjects();
    this.getStudentTopicProgress();
  },

  methods: {
    getSubjects() {
      this.$api
        .get(
          `subjects/?learning_center=${this.user.student.level.learning_center}`
        )
        .then((res) => {
          this.subjects = res.data;
        });
    },

    getStudentTopicProgress() {
      this.$api
        .get(`student-topic-progresses/?student=${this.user.student.id}`)
        .then((res) => {
          console.log(res.data);
          this.subjectProgresses = res.data;
        });
    },
  },
});
</script>
