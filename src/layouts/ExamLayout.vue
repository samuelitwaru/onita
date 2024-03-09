<template>
  <q-layout view="lHh Lpr lFf" v-if="exam">
    <q-page-sticky
      v-if="!leftDrawerOpen"
      position="top-left"
      :offset="[11, 11]"
    >
      <q-btn
        round
        color="primary"
        icon="menu"
        aria-label="Menu"
        @click="leftDrawerOpen = !leftDrawerOpen"
      />
    </q-page-sticky>
    <q-drawer v-model="leftDrawerOpen" class="bg-grey-2" show-if-above bordered>
      <q-card flat class="q-py-sm flex justify-between items-center">
        <a href="/dashboard/examination">
          <q-btn
            class="q-mx-sm"
            block
            color="primary"
            flat
            dense
            icon="arrow_back"
          />
        </a>
        <div class="text-h6 q-px-md q-py-xs">
          {{ exam?.name }}

          <!-- <q-chip class="glossy" label="Term 1" /> -->
        </div>

        <div>
          <q-btn
            round
            dense
            outline
            class="q-mx-sm"
            color="primary"
            icon="close"
            aria-label="Menu"
            v-if="leftDrawerOpen"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
        </div>
      </q-card>
      <q-separator />
      <div>
        <div class="flex justify-between bg-white text-h5 q-pa-md">SECTION</div>
        <q-list dense bordered separator style="max-width: 318px">
          <q-item
            :active="ques.id == $route.params.ques_id"
            active-class="bg-accent text-white"
            v-for="(ques, index) in exam.questions"
            :key="ques.id"
            clickable
            class="q-pa-sm"
          >
            <router-link
              :to="`/examination/${exam.id}/answers/${ques.id}`"
              class="text-dark"
              style="width: 100%"
            >
              <q-item-section style="width: 100%"
                >Question {{ index + 1 }}</q-item-section
              >
            </router-link>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <div class="text-right">
        <q-chip
          outline
          square
          color="red"
          text-color="white"
          icon="alarm"
          :label="$formatTime(exam.total_time - exam.time_taken)"
        />
      </div>
      <router-view> </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
const updateTimeTakenEvery = 15;
export default defineComponent({
  data() {
    return {
      user: this.$authStore.currentUser,
      exam: null,
      leftDrawerOpen: false,
      updateTimeTakenEvery: updateTimeTakenEvery,
    };
  },

  created() {
    this.getExam();
    setTimeout(this.countDown, 1000);
  },

  methods: {
    getExam() {
      this.$api.get(`exams/${this.$route.params.id}/`).then((res) => {
        this.exam = res.data;
        // this.$resStore.setSubject(this.subject);
      });
    },

    autoSubmitExam() {
      this.$api
        .patch(`exams/${this.$route.params.id}/`, {
          submitted: true,
          time_taken: this.exam.time_taken,
        })
        .then((res) => {
          if (res.status == 200) {
            this.$router.push("/dashboard/examination");
          }
        });
    },

    updateExamTimeTaken() {
      this.$api
        .patch(`exams/${this.$route.params.id}/`, {
          time_taken: this.exam.time_taken,
        })
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
          }
        });
    },

    countDown() {
      this.exam.time_taken += 1;
      this.updateTimeTakenEvery -= 1;
      if (this.updateTimeTakenEvery == 0) {
        this.updateExamTimeTaken();
        this.updateTimeTakenEvery = updateTimeTakenEvery;
      }
      if (this.exam.time_taken < this.exam.total_time) {
        setTimeout(this.countDown, 1000);
      } else {
        this.autoSubmitExam();
      }
    },
  },
});
</script>

<style>
a {
  text-decoration: none;
}
</style>
