<template lang="">
  <div class="q-pa-sm">
    <div class="flex justify-between">
      <div class="text-h5 q-py-sm">Examination History</div>
      <div class="q-py-sm">
        <create-exam-dialog @exam-created="exams.unshift($event)" />
      </div>
    </div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Date</th>
          <th class="text-left">Name</th>
          <th class="text-left">Status</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="exam in exams" :key="exam.id">
          <td>{{ exam.id }}</td>
          <td>{{ exam.created_at }}</td>
          <td>{{ exam.subject }}</td>
          <td class="text-center">
            <q-chip
              v-if="exam.submitted"
              class="glossy text-white"
              dense
              color="green"
              label="SUBMITTED"
            />
            <q-chip
              v-else
              class="glossy text-white"
              dense
              color="orange"
              label="PENDING"
            />
          </td>
          <td>
            <router-link :to="`/dashboard/examination/${exam.id}`">
              <q-btn color="primary" label="view" outline />
            </router-link>
            <q-btn
              color="primary"
              icon="close"
              dense
              class="q-mx-md"
              flat
              @click="deleteExam(exam.id)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: this.$authStore.currentUser,
      exams: [],
    };
  },

  created() {
    this.getExams();
  },

  methods: {
    getExams() {
      this.$api.get(`exams/?student=${this.user.student.id}`).then((res) => {
        this.exams = res.data;
      });
    },

    deleteExam(examId) {
      if (confirm("Are you sure you want to delete this exam?")) {
        this.$api.delete(`exams/${examId}/`).then((res) => {
          if (res.status == 204) {
            this.exams = this.exams.filter((exam) => exam.id != examId);
          }
        });
      }
    },
  },
};
</script>
<style lang=""></style>
