<template>
  <div>
    <div class="q-pa-sm">
      <div class="text-h5 q-pa-sm">My Subjects</div>
      <router-link
        v-for="subject in subjects"
        :key="subject"
        :to="`/subjects/${subject.id}`"
      >
        <q-chip style="max-width: 15rem" square>
          <q-avatar icon="bookmark" color="red" text-color="white" />
          {{ subject.name }}
        </q-chip>
      </router-link>
    </div>
    <!-- <div class="flex justify-cente q-col-gutter-sm q-pa-sm">
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
    </div> -->

    <q-separator spaced />
    <div>
      <div class="flex justify-cente q-col-gutter-sm q-pa-sm">
        <q-card
          class="q-ma-sm"
          v-for="subjectProg in subjectProgresses"
          :key="subjectProg"
          style="max-width: 15rem"
        >
          <q-card-section>
            <div class="text-h6">
              {{ subjectProg.subject_detail.code }}/{{
                subjectProg.subject_detail.name
              }}
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions vertical align="right">
            <router-link :to="`/subjects/${subjectProg.subject_detail.id}`">
              <q-btn flat label="browse" />
            </router-link>
          </q-card-actions>
        </q-card>
      </div>
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
      subjectProgresses: [],
    };
  },

  created() {
    this.get_subjects();
    this.getStudentTopicProgress();
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
