<template lang="">
  <div class="q-pa-sm">
    <small class="component-label">TeacherPendingTests</small>
    <div class="flex justify-between">
      <div class="text-h5 q-py-sm">Pending Tests</div>
    </div>
    <q-markup-table flat>
      <thead>
        <tr>
          <th class="text-left">Student</th>
          <th class="text-left">Topic</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in logs" :key="log.id">
          <td>{{ log.student_name }}</td>
          <td>{{ log.topic_detail.name }}</td>
          <td>
            <router-link :to="`/teacher/tests/${log.student}/${log.topic}`">
              <q-btn flat color="primary" label="score" />
            </router-link>
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <div v-if="logs.length == 0" class="text-center q-py-lg q-my-lg text-grey">
      No pending tests found
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: this.$authStore.currentUser,
      logs: [],
    };
  },

  created() {
    this.getLogs();
  },

  methods: {
    getLogs() {
      this.$api.get(`student-notes-logs/?note=TESTED`).then((res) => {
        this.logs = res.data;
      });
    },
    getExamSubmissions() {
      this.$api.get(`exams/?submitted=1`).then((res) => {
        this.exams = res.data;
      });
    },
  },
};
</script>
<style lang=""></style>
