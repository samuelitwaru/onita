<template lang>
  <div class="q-pa-sm">
    <q-btn outline color="primary" label="Add" @click="show = true" />

    <q-form>
      <q-dialog v-model="show">
        <q-card class style="min-width: 400px">
          <q-card-section class="text-h6"> New Notes </q-card-section>

          <q-separator spaced />
          <q-card-section class="q-pa-sm">
            <q-select
              required
              outlined
              dense
              v-model="formData.teacher_subject"
              :options="subjects"
              label="Select Subject"
              option-value="id"
              option-label="name"
              map-options
              emit-value
            />
            <br />
            <q-select
              required
              outlined
              dense
              v-model="formData.level"
              :options="learningCenterLevels"
              label="Select Level"
              option-value="id"
              option-label="name"
              map-options
              emit-value
            />
          </q-card-section>

          <q-separator spaced />

          <q-card-section>
            <q-card-actions align="center">
              <div class="flex">
                <q-btn
                  @click="createNotes"
                  class="justify-center"
                  color="primary"
                  label="Create"
                ></q-btn>
              </div>
            </q-card-actions>
          </q-card-section>
        </q-card>
        <q-card-actions align="right"> </q-card-actions>
      </q-dialog>
    </q-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      user: this.$authStore.currentUser,
      subjects: [],
      levels: [],
      formData: {
        teacher_subject: null,
        title: "",
        level: null,
      },
      formError: {
        teacher_subject: "",
        title: "",
        level: "",
      },
    };
  },
  computed: {
    selectedLevel() {
      return this.levels.find((subject) => subject.id == this.formData.level);
    },
    selectedSubject() {
      return this.subjects.find(
        (subject) => subject.id == this.formData.teacher_subject
      );
    },
    learningCenterLevels() {
      if (this.selectedSubject) {
        return this.levels.filter(
          (level) =>
            this.selectedSubject.learning_center == level.learning_center
        );
      }
      return [];
    },
  },
  created() {
    this.getTeacherSubjects();
    this.getLevels();
  },

  methods: {
    getTeacherSubjects() {
      this.$api
        .get(`teacher-subjects/?teacher=${this.user.teacher.id}`)
        .then((res) => {
          this.subjects = res.data.map((subj) => {
            var val = subj.subject_detail;
            val.id = subj.id;
            return val;
          });
        });
    },
    getLevels() {
      this.$api.get(`levels/`).then((res) => {
        this.levels = res.data;
      });
    },

    createNotes() {
      console.log(this.selectedSubject);
      console.log(this.formData);
      this.formData.title = `${this.selectedSubject.learning_center_name} Level ${this.selectedSubject.name} ${this.selectedLevel.name}`;
      this.$api.post(`notes/`, this.formData).then((res) => {
        if (res.status == 201) {
          this.show = false;
          this.$emit("notes-created", res.data);
        }
      });
    },
  },
};
</script>
<style lang></style>
