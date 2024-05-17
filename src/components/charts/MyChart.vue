<template>
  <div>
    <div class="flex q-pa-sm">
      <q-card
        v-for="note in notes"
        :key="note"
        class="my-card q-ma-sm text-center"
        style="min-width: 300px; min-height: 300px"
      >
        <q-card-section>
          <div class="text-h6">{{ note.subject_detail.name }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="text-h2">{{ calculateProgress(note) }}%</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <!-- <apexchart
    type="bar"
    height="350"
    :options="chartOptions"
    :series="series"
    style="height: 100%"
  ></apexchart> -->
</template>
<script>
export default {
  data() {
    return {
      user: this.$authStore.currentUser,
      subjects: [],
      notes: [],
      notes_logs: [],
      notes_ids: [],
    };
  },

  created() {
    this.get_subjects();
    this.getStudentNotesLogs();
  },

  computed: {
    chartOptions() {
      var chartOptions = {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {},
      };
      chartOptions["xaxis"]["categories"] = this.subjects.map(
        (subj) => subj.name
      );
      return chartOptions;
    },

    series() {
      var series = [];
      var data1 = {
        data: this.subjects.map((subj) => this.getRandomInt(0, 100)),
      };
      series.push(data1);
      return series;
    },
  },

  methods: {
    getStudentNotesLogs() {
      this.$api
        .get(
          `student-notes-logs/?student=${this.user.student.id}&note=ENROLLED`
        )
        .then((res) => {
          this.notes_logs = res.data;
          this.notes_ids = res.data.map((note) => note.notes);
          this.getNotes();
        });
    },
    getNotes() {
      this.notes_ids.forEach((notes_id) => {
        this.$api.get(`notes/${notes_id}/`).then((res) => {
          this.notes.push(res.data);
        });
      });
    },
    get_subjects() {
      this.$api
        .get(
          `subjects/?learning_center=${this.user.student.level.learning_center}`
        )
        .then((res) => {
          this.subjects = res.data;
        });
    },

    calculateProgress(notes) {
      if (notes) {
        var topics_covered = notes.logs.filter(
          (log) => log.note != "TESTED"
        ).length;
        console.log(topics_covered);
        var total_topics = notes.topics.length;
        if (!total_topics.length) return 0;
        var progress = (topics_covered / total_topics) * 100;
        return progress;
      }
    },

    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
};
</script>
<style lang=""></style>
