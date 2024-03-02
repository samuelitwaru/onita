<template lang="">
  <div>
    <q-btn color="primary" label="New Question" outline @click="show = true" />
    <q-dialog v-model="show">
      <q-card style="min-width: 400px">
        <div class="text-h5 q-px-md q-my-md">New Question</div>
        <q-separator spaced />
        <q-card-section class="">
          <div class="row q-gutter-xs">
            <div class="col">
              <q-select
                required
                outlined
                v-model="learningCenter"
                :options="learningCenters"
                label="Learnig Center"
                option-value="id"
                option-label="name"
                map-options
                emit-value
                dense
                @update:model-value="formData.subject = null"
              />
            </div>
            <div class="col">
              <q-select
                required
                outlined
                v-model="formData.subject"
                :options="currentSubjects"
                label="Select Subject"
                option-value="id"
                option-label="name"
                map-options
                emit-value
                dense
              />
            </div>
          </div>

          <br />
          <div class="flex items-center justify-end">
            <div class="q-my-auto q-pr-md" style="height: 2.5rem">Time:</div>
            <q-input
              v-model="formData.time"
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
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <br />
          <label for="">Question</label>
          <content-editor
            :content="formData.text"
            @contentChanged="formData.text = $event"
          />
        </q-card-section>
        <q-separator spaced />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn color="primary" label="Submit" @click="createQuestion" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  props: ["text", "is_correct"],
  data() {
    return {
      show: false,
      subjects: [],
      learningCenters: [],
      timeWithSeconds: "00:02:00",
      learningCenter: 1,
      formData: {
        text: "",
        subject: null,
        time: "00:02:00",
      },
    };
  },

  created() {
    this.getSubjects();
    this.getLearningCenters();
  },

  computed: {
    currentSubjects() {
      var subjects = this.subjects.filter(
        (subj) => subj.learning_center == this.learningCenter
      );
      // this.formData.subject = 1;
      return subjects;
    },
  },

  methods: {
    enable() {
      alert();
    },
    createQuestion() {
      this.formData.time = this.convertTimeStringToMinutes(this.formData.time);
      this.$api.post(`test-questions/`, this.formData).then((res) => {
        if (res.status == 201) {
          this.show = false;
          this.$emit("question-created", res.data);
        }
      });
    },

    getSubjects() {
      this.$api.get(`subjects/`).then((res) => {
        this.subjects = res.data;
      });
    },

    getLearningCenters() {
      this.$api.get(`learning-centers/`).then((res) => {
        this.learningCenters = res.data;
        console.log(res.data);
      });
    },

    convertTimeStringToMinutes(timeString) {
      // Split the time string into hours, minutes, and seconds
      const [hours, minutes, seconds] = timeString.split(":").map(Number);

      // Calculate the total minutes
      const totalMinutes = hours * 60 + minutes + seconds / 60;

      return totalMinutes;
    },
  },
};
</script>
<style lang=""></style>
