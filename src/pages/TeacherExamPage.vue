<template lang="">
  <div class="q-pa-sm">
    <div class="flex justify-between">
      <div class="text-h5 q-py-sm">Examination Submissions</div>
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
            <router-link
              :to="`/examination/${exam.id}/questions/${exam.questions[0].id}`"
            >
              <q-btn color="primary" label="view" outline />
            </router-link>
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <div v-if="exams.length == 0" class="text-center q-py-lg q-my-lg text-grey">
      No examinations found
    </div>
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
    this.getExamSubmissions();
  },

  methods: {
    getExamSubmissions() {
      this.$api.get(`exams/?submitted=1`).then((res) => {
        this.exams = res.data;
      });
    },
  },
};
</script>
<style lang=""></style>
