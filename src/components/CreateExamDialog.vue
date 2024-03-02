<template lang="">
  <div class="q-pa-sm">
    <q-btn color="primary" label="New Examination" flat @click="show = true" />

    <q-form>
      <q-dialog v-model="show">
        <q-card class="" style="min-width: 400px">
          <q-card-section class="text-h6"> New Examination </q-card-section>

          <q-separator spaced />

          <q-card-section class="q-pa-sm">
            <div class="">
              <div class="">
                <q-select
                  required
                  outlined
                  v-model="formData.subject"
                  :options="subjects"
                  label="Select Subject"
                  option-value="id"
                  option-label="name"
                  map-options
                  emit-value
                />
                <small class="text-red">{{ formError.subject }}</small>
              </div>
              <div class="q-my-sm">
                <q-markup-table flat bordered>
                  <tbody>
                    <tr>
                      <td class="text-left">Learning center</td>
                      <td class="text">
                        <strong
                          >{{
                            selectedSubject?.learning_center_name
                          }}
                          Level</strong
                        >
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </div>
            </div>
          </q-card-section>

          <q-separator spaced />

          <q-card-section>
            <q-card-actions align="center">
              <div class="flex">
                <q-btn
                  @click="createExam"
                  class="justify-center"
                  color="primary"
                  label="Create Examination"
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
      formData: {
        subject: null,
        student: this.$authStore.currentUser.student.id,
      },
      formError: {
        subject: "",
      },
    };
  },

  created() {
    this.getSubjects();
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
      this.$api
        .get(
          `subjects/?learning_center=${this.user.student.level.learning_center}`
        )
        .then((res) => {
          this.subjects = res.data;
        });
    },

    createExam() {
      this.formData["name"] = `Exam - ${this.selectedSubject.name}`;
      this.$api.post(`exams/`, this.formData).then((res) => {
        if (res.status == 201) {
          this.show = false;
          this.$emit("exam-created", res.data);
          this.$router.push(`/dashboard/examination/${res.data.id}`);
        }
      });
    },
  },
};
</script>
<style lang=""></style>
