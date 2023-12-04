<template>
  <apexchart
    type="bar"
    height="350"
    :options="chartOptions"
    :series="series"
    style="height: 100%"
  ></apexchart>
</template>
<script>
export default {
  data() {
    return {
      user: this.$authStore.currentUser,
      subjects: [],
      // series: [
      //   {
      //     data: [40, 43, 90, 70, 40, 80, 90, 11, 12, 80],
      //   },
      // ],

      // chartOptions: {
      //   chart: {
      //     type: "bar",
      //     height: 350,
      //   },
      //   plotOptions: {
      //     bar: {
      //       borderRadius: 4,
      //       horizontal: true,
      //     },
      //   },
      //   dataLabels: {
      //     enabled: false,
      //   },
      //   xaxis: {
      //     categories: [
      //       "South Korea",
      //       "Canada",
      //       "United Kingdom",
      //       "Netherlands",
      //       "Italy",
      //       "France",
      //       "Japan",
      //       "United States",
      //       "China",
      //       "Germany",
      //     ],
      //   },
      // },
    };
  },

  created() {
    this.get_subjects();
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
    get_subjects() {
      this.$api
        .get(
          `subjects/?learning_center=${this.user.student.level.learning_center}`
        )
        .then((res) => {
          this.subjects = res.data;
        });
    },

    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
};
</script>
<style lang=""></style>
