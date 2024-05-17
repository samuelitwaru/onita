<template lang>
  <div class="q-pa-sm">
    <q-btn
      color="primary"
      outline
      label="Select Subjects"
      @click="show = true"
    />

    <q-dialog v-model="show">
      <q-card class style="min-width: 400px">
        <q-card-section class="text-h6"> Select Subjects </q-card-section>

        <q-separator spaced />

        <q-card-section
          v-for="learningCenter in learningCenters"
          :key="learningCenter.id"
          class="q-pa-sm"
        >
          <div v-if="learningCenter.subjects.length">
            <div class="text-h6">{{ learningCenter.name }} Level</div>
            <q-list bordered>
              <q-item
                v-for="subject in subjects.filter(
                  (subj) => subj.learning_center_name == learningCenter.name
                )"
                :key="subject.id"
              >
                <q-item-section avatar>
                  <q-icon color="primary" name="subject" />
                </q-item-section>
                <q-item-section>{{ subject.name }} </q-item-section>
                <q-item-section>
                  <input
                    type="checkbox"
                    @click="createTeacherSubject(subject.id)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>

        <q-separator spaced />

        <q-card-section>
          <q-card-actions align="center">
            <div class="flex">
              <q-btn
                @click="show = false"
                class="justify-center"
                color="primary"
                label="Okay"
              ></q-btn>
            </div>
          </q-card-actions>
        </q-card-section>
      </q-card>
      <q-card-actions align="right"> </q-card-actions>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      user: this.$authStore.currentUser,
      subjects: [],
      teacherSubjects: [],
      teacherSubjectIds: [],
      formData: {
        subject: null,
      },
      formError: {
        teacher: this.$authStore.user.teacher.id,
        subject: "",
      },
    };
  },

  created() {
    this.getLearningCenters();
    this.getTeacherSubjects();
  },

  computed: {
    selectedSubject() {
      var subject = this.subjects.filter(
        (subj) => subj.id == this.formData.subject
      )[0];
      return subject;
    },
  },

  methods: {
    getSubjects() {
      this.$api.get(`subjects/`).then((res) => {
        this.subjects = res.data.filter(
          (subj) => !this.teacherSubjectIds.includes(subj.id)
        );
      });
    },

    getTeacherSubjects() {
      this.$api
        .get(`teacher-subjects/?teacher=${this.$authStore.user.teacher.id}`)
        .then((res) => {
          this.teacherSubjects = res.data;
          this.teacherSubjectIds = this.teacherSubjects.map(
            (subj) => subj.subject_detail.id
          );
          this.getSubjects();
        });
    },

    getLearningCenters() {
      this.$api.get(`learning-centers/`).then((res) => {
        this.learningCenters = res.data;
      });
    },

    createTeacherSubject(subjectId) {
      this.$api
        .post(`teacher-subjects/`, {
          teacher: this.$authStore.user.teacher.id,
          subject: subjectId,
        })
        .then((res) => {
          if (res.status == 201) {
            this.getTeacherSubjects();
            this.$emit("teacher-subject-created");
          }
        });
    },
  },
};
</script>
<style lang></style>
