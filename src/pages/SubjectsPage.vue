<template>
  <div>
    <div class="text-h5 q-pa-sm">My Subjects</div>
    <div v-for="learningCenter in learningCenters" :key="learningCenter.id">
      <q-separator spaced />

      <div class="text-h6 q-pa-sm">{{ learningCenter.name }} Level</div>
      <div class="flex q-px-sm items-end">
        <router-link
          v-for="subject in subjects.filter(
            (subj) => subj.learning_center_name == learningCenter.name
          )"
          :key="subject"
          :to="`/teacher/subjects/${subject.id}`"
        >
          <q-card class="my-card q-ma-sm" style="min-width: 200px">
            <q-img :src="random(images)">
              <div class="absolute-bottom">
                <div class="text-h6">{{ subject.name }}</div>
                <div class="text-subtitle2">
                  {{ subject.learning_center_name }} Level
                </div>
              </div>
            </q-img>

            <q-card-actions class="flex justify-between">
              {{ subject.topics.length }} Topics
              <q-btn color="primary" label="view" />
            </q-card-actions>
          </q-card>
        </router-link>
      </div>
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
      learningCenters: [],
      images: [
        "data:image/jpeg;base64,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",
        "https://cdn.quasar.dev/img/parallax2.jpg",
        "https://cdn3.vectorstock.com/i/1000x1000/60/57/scientific-biological-banner-vector-19386057.jpg",
        "https://i.pinimg.com/originals/12/f9/41/12f941d98916eda572f7fecab8379bf9.jpg",
      ],
    };
  },

  created() {
    this.getSubjects();
    this.getLearningCenters();
  },

  methods: {
    getSubjects() {
      this.$api.get(`subjects/`).then((res) => {
        this.subjects = res.data;
        console.log(this.subjects);
      });
    },
    getLearningCenters() {
      this.$api.get(`learning-centers/`).then((res) => {
        this.learningCenters = res.data;
        console.log(res.data);
      });
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
