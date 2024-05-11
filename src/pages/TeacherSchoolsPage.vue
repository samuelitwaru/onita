<template lang>
  <div>
    <div class="q-pa-sm">
      <q-input
        @update:model-value="searchSchools"
        flat
        outlined
        rounded
        v-model="formData.search"
        type="search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <div class="flex q-pa-sm" v-if="formData.search">
      <q-card
        class="my-card"
        style="min-width: 200px"
        v-for="school in schools"
        :key="school.id"
      >
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom">
            <div class="text-h6">{{ school.name }}</div>
          </div>
        </q-img>

        <q-card-actions>
          <q-btn flat @click="joinSchool(school.id)">Join</q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <div v-else>
      <q-markup-table flat bordered>
        <thead>
          <tr>
            <th class="text-left">My Schools</th>
            <th class="text-right"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="teacher_school in teacher_schools"
            :key="teacher_school.id"
          >
            <td class="text-left">{{ teacher_school.school_detail.name }}</td>
            <td class="text-right">
              {{ teacher_school.accepted ? "" : "REQUEST PENDING" }}
            </td>
          </tr>
          <tr v-if="!teacher_schools?.length" colspan="2">
            <p class="text-grey text-center q-pa-xl">
              You are not enrolled to any schools
            </p>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      teacher_schools: [],
      schools: [],
      formData: {
        search: "",
      },
    };
  },

  created() {
    this.getTeacherSchools();
  },

  methods: {
    getTeacherSchools() {
      this.$api
        .get(`teacher-schools/?teacher=${this.$authStore.user.teacher.id}`)
        .then((res) => {
          this.teacher_schools = res.data;
          console.log(this.teacher_schools);
        });
    },

    searchSchools() {
      this.$api.get(`schools/?search=${this.formData.search}`).then((res) => {
        this.schools = res.data;
      });
    },
    joinSchool(schoolId) {
      this.$api
        .post(`teacher-schools/`, {
          teacher: this.$authStore.user.teacher.id,
          school: schoolId,
        })
        .then((res) => {
          alert("Request sent to school");
        })
        .catch((err) => {
          alert("Already requested to join this school");
        });
    },
  },
};
</script>
<style lang></style>
