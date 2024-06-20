<template lang>
  <div class="q-pa-sm">
    <small>TeacherNotesTest.vue</small>
    <div class="flex justify-between">
      <div class="text-h5 q-py-sm">Progress Test</div>
      <div class="flex q-py-sm items-center q-gutter-xs"></div>
    </div>
    <q-markup-table flat bordered>
      <thead>
        <tr>
          <th class="text-left">Questions</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ques in questions" :key="ques.id">
          <td><div v-html="ques.text"></div></td>
          <td>
            <router-link
              :to="`/teacher/notes/${$route.params.notes_id}/topics/${$route.params.topic_id}/test/questions/${ques.id}`"
            >
              <q-btn flat dense color="primary" icon="edit" outline />
            </router-link>
            <q-btn
              dense
              flat
              class="q-mx-sm"
              color="primary"
              icon="delete"
              @click="deleteTopicQuestion(ques.id)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <div class="text-center" v-if="!questions?.length">
      <p class="q-my-xl text-grey">No questions added</p>
    </div>

    <br />

    <div class="text-h5 q-py-sm">Add Question</div>

    <q-card flat bordered class="q-pa-sm">
      <div>
        <br />
        <div class="flex items-center"></div>

        <div class="flex">
          <div class="q-my-auto q-pr-md" style="height: 2.5rem">Time:</div>
          <q-input
            v-model="formData.formattedTime"
            outlined
            dense
            mask="fulltime"
            :rules="['fulltime']"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="formData.time" with-seconds format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div class="q-my-auto q-px-md" style="height: 2.5rem">Marks:</div>
          <q-input v-model="formData.mark" type="number" dense outlined />
        </div>
        <content-editor
          :content="formData.text"
          @contentChanged="formData.text = $event"
        />
      </div>

      <div class="flex justify-end items-center q-py-sm">
        <q-btn color="primary" label="Add" @click="createQuestion" />
      </div>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: this.$authStore.currentUser,
      questions: [],
      formData: {
        text: "",
        formattedTime: "00:02:00",
        time: 2,
        mark: 2,
        topic: this.$route.params.topic_id,
        test: null,
      },
    };
  },

  created() {
    this.getTopic();
  },

  methods: {
    getTopic() {
      this.$api.get(`topics/${this.$route.params.topic_id}`).then((res) => {
        this.topic = res.data;
        this.test = this.topic?.test_detail;
        this.questions = this.test?.questions;
      });
    },

    createQuestion() {
      if (this.test) {
        this.formData.time = this.convertTimeStringToMinutes(
          this.formData.formattedTime
        );
        this.formData.test = this.test.id;
        console.log(this.formData);
        this.$api.post(`topic-questions/`, this.formData).then((res) => {
          if (res.status == 201) {
            (this.formData.time = "00:02:00"), (this.formData.text = "");
            this.getTopic();
          }
        });
      } else {
        this.$api
          .post(`tests/`, {
            name: this.topic.name,
            topic: this.topic.id,
          })
          .then((res) => {
            if ((res.status = 201)) {
              console.log(res.data);
              console.log({
                test: res.data.id,
              });
              console.log(this.$route.params.topic_id);
              this.$api
                .patch(`topics/${this.$route.params.topic_id}/`, {
                  test: res.data.id,
                })
                .then((res) => {
                  if ((res.status = 200)) {
                    this.getTopic();
                    this.createQuestion();
                  }
                });
            }
          });
      }
    },

    deleteTopicQuestion(quesId) {
      if (confirm("Are you sure you would like to delete this question?")) {
        this.$api.delete(`topic-questions/${quesId}`).then((res) => {
          if (res.status == 204) {
            this.getTopic();
          }
        });
      }
    },
    convertTimeStringToMinutes(timeString) {
      // Split the time string into hours, minutes, and seconds
      const [hours, minutes, seconds] = timeString.split(":").map(Number);

      // Calculate the total minutes
      const totalMinutes = hours * 60 + minutes + seconds / 60;

      return totalMinutes;
    },
  },

  watch: {
    "$route.params.topic_id": function (newVal, oldVal) {
      this.getTopic();
    },
  },
};
</script>
<style lang></style>
