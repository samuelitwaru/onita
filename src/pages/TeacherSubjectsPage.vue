<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="text-h5 q-pa-sm text-primary">My Subjects</div>
      <create-teacher-subject @teacher-subject-created="this.getSubjects" />
    </div>
    <q-separator spaced />

    <div v-if="subjects.length" class="flex q-pa-sm">
      <q-card
        v-for="subj in subjects"
        :key="subj"
        class="my-card q-ma-sm"
        style="min-width: 300px"
      >
        <q-img
          :src="
            subj.subject_detail.image ||
            `${this.$baseURL}/media/subjects/onita-logo.923195d3.png`
          "
        >
          <div class="absolute-bottom">
            <div class="text-h6">{{ subj.subject_detail.name }}</div>
            <div class="text-subtitle2">
              {{ subj.subject_detail.learning_center_name }} Level
            </div>
          </div>
        </q-img>
      </q-card>
    </div>

    <div v-else class="q-py-xl">
      <p class="text-center text-grey">You do not have any subjects yet</p>
    </div>
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
      learningCenters: [],
    };
  },

  created() {
    this.getSubjects();
    this.getLearningCenters();
  },

  methods: {
    getSubjects() {
      this.$api
        .get(`teacher-subjects/?teacher=${this.$authStore.user.teacher.id}`)
        .then((res) => {
          this.subjects = res.data;
        });
    },
    getLearningCenters() {
      this.$api.get(`learning-centers/`).then((res) => {
        this.learningCenters = res.data;
      });
    },

    subjectImage(image) {
      if (image) {
        return image;
      } else {
        return `${this.$baseURL}/media/subjects/onita-logo.923195d3.png`;
      }
    },

    random(array) {
      // Generate a random index
      const randomIndex = Math.floor(Math.random() * array.length);
      // Return the random item
      return array[randomIndex];
    },
  },
});
</script>
