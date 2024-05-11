<template lang>
  <div class="q-pa-sm">
    <div class="flex justify-between">
      <div class="q-py-sm text-h5">Students</div>
      <div>
        <q-input dense v-model="search" outlined type="text" label="Search" />
      </div>
    </div>
    <q-markup-table flat bordered>
      <thead align="left">
        <tr>
          <th>Student Name</th>
          <th>Email</th>
          <th>Level</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student">
          <td>{{ student.full_name }}</td>
          <td>{{ student.user.email }}</td>
          <td>{{ student.level.name }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      students: [],
    };
  },
  created() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      this.$api.get("students").then((res) => {
        this.students = res.data;
      });
    },
  },
};
</script>
<style lang></style>
