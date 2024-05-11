<template lang="">
  <div class="q-pa-sm">
    <div class="flex justify-between">
      <div class="text-h5 q-py-sm">Questions</div>
      <div class="flex q-py-sm items-center q-gutter-xs">
        <q-select
          v-model="formData.subject"
          :options="subjects"
          label="Standard"
          option-value="id"
          option-label="name"
          map-options
          emit-value
          outlined
          dense
          style="width: 10rem"
          @update:model-value="getQuestions(formData)"
        />
        <create-question-dialog @question-created="questions.unshift($event)" />
      </div>
    </div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">Subject</th>
          <th class="text-left">Question</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ques in questions" :key="ques.id">
          <td>{{ ques.subject_name }}</td>
          <td><div v-html="ques.text"></div></td>
          <td>
            <router-link :to="`/teacher/questions/${ques.id}`">
              <q-btn color="primary" label="edit" outline />
            </router-link>
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
      questions: [],
      formData: {
        subject: 0,
      },
      subjects: [{ id: 0, name: "All" }],
    };
  },

  created() {
    this.getQuestions();
    this.getSubjects();
  },

  methods: {
    getQuestions(args = {}) {
      var queryString = this.$buildURLQuery(args);
      this.$api.get(`test-questions/?${queryString}`).then((res) => {
        this.questions = res.data;
      });
    },

    getSubjects() {
      this.$api.get(`subjects/`).then((res) => {
        this.subjects = this.subjects.concat(res.data);
      });
    },
  },
};
</script>
<style lang=""></style>
