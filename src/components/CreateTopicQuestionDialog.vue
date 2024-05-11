<template lang>
  <div>
    <q-btn color="primary" label="New Question" outline @click="show = true" />
    <q-dialog v-model="show">
      <q-card style="min-width: 400px">
        <div class="text-h5 q-px-md q-my-md">New Question</div>
        <q-separator spaced />
        <q-card-section class>

          <br />
          <div class="flex items-center">
            <div class="q-my-auto q-pr-md" style="height: 2.5rem">Time:</div>
            <q-input
              v-model="formData.time"
              outlined
              dense
              mask="fulltime"
              :rules="['fulltime']">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale">
                    <q-time v-model="formData.time" with-seconds format24h>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <br />
          <label for>Question</label>
          <content-editor
            :content="formData.text"
            @contentChanged="formData.text = $event" />
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
        time: "00:02:00",
        topic: this.$route.params.topic_id
      },
    };
  },

  created() {
  },


  methods: {

    createQuestion() {
      this.formData.time = this.convertTimeStringToMinutes(this.formData.time);
      this.$api.post(`topic-questions/`, this.formData).then((res) => {
        if (res.status == 201) {
          this.show = false;
          this.$emit("question-created", res.data);
        }
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
<style lang></style>
