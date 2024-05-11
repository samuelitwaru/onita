<template lang>
  <div>
    <div class="row q-pa-sm">
      <div class="col-md-6 q-pa-xs" v-if="teacher_requests.length">
        <h4 class="q-my-sm">Pending Requests</h4>
        <q-list bordered>
          <q-item clickable v-ripple v-for="school_teacher in teacher_requests"
            :key="school_teacher.id">
            <q-item-section avatar>
              <q-icon color="primary" name="person" />
            </q-item-section>
            <q-item-section>{{school_teacher.teacher_detail.full_name}}</q-item-section>
            <q-item-section><q-btn color="primary" flat icon="check"
                label="ACCEPT"
                @click="acceptTeacherRequest(school_teacher.id)" />
            </q-item-section>
          </q-item>
        </q-list>
        <p class="text-grey q-pa-lg" v-if="!teacher_requests.length">
          No pending requests found
        </p>
      </div>
      <div class="col-md-6 q-pa-xs">
        <h4 class="q-my-sm">Enrolled Teachers</h4>
        <q-list bordered>
          <q-item clickable v-ripple v-for="school_teacher in school_teachers"
            :key="school_teacher.id">
            <q-item-section avatar>
              <q-icon color="primary" name="person" />
            </q-item-section>
            <q-item-section>{{school_teacher.teacher_detail.full_name}}</q-item-section>
          </q-item>
        </q-list>
        <p class="text-grey q-pa-lg" v-if="!school_teachers.length">
          No teachers enrolled
        </p>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      school_teachers: [],
      teacher_requests: [],
    }
  },
  created() {
    this.getSchoolTeachers()
    this.getTeacherRequests()
  },
  methods: {
    getSchoolTeachers(){
      this.$api.get(`teacher-schools/?school=${this.$authStore.user.school.id}&accepted=true`).then((res) => {
        this.school_teachers = res.data;
      });
    },

    getTeacherRequests() {
      this.$api
        .get(`teacher-schools/?school=${this.$authStore.user.school.id}&accepted=false`)
        .then((res) => {
          this.teacher_requests = res.data;
        });
    },

    acceptTeacherRequest(requestId){
      this.$api.patch(`teacher-schools/${requestId}/`, {
        accepted: true
      }).then((res) => {
        this.getSchoolTeachers()
        this.getTeacherRequests()
      })
    }
  },
};
</script>
<style lang></style>
