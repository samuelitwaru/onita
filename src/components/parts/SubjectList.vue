<template>
  <div>
    <!-- <h3 class="text-center text-h3">Your Subjects</h3> -->
    <div class="flex justify-cente q-col-gutter-sm q-pa-sm">
      <q-card
        class="q-ma-sm"
        v-for="subject in subjects"
        :key="subject"
        style="max-width: 15rem"
      >
        <q-card-section>
          <div class="text-h6">{{ subject.code }}/{{ subject.name }}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions vertical align="right">
          <router-link :to="`/subjects/${subject.id}`">
            <q-btn flat label="browse" />
          </router-link>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      user: this.$authStore.currentUser,
      subjects: [
        {
          id: 1,
          name: "Mathematics",
          code: "01",
          icon: "icon",
        },
        {
          id: 2,
          name: "English",
          code: "02",
          icon: "",
        },
        {
          id: 3,
          name: "Science",
          code: "03",
          icon: "",
        },
        {
          id: 4,
          name: "Social Studies",
          code: "04",
          icon: "",
        },
      ],
    };
  },

  created() {
    this.get_subjects();
  },

  methods: {
    get_subjects() {
      this.$api
        .get(
          `subjects/?learning_center=${this.user.student.level.learning_center}`
        )
        .then((res) => {
          this.subjects = res.data;
        });
    },
  },
});
</script>
