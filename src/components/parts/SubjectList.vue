<template>
  <div v-if="formula">
    <div class="flex justify-cente q-col-gutter-sm q-pa-sm">
      <q-card
        class="q-ma-sm"
        v-for="subject in subjects"
        :key="subject"
        style="max-width: 15rem"
      >
        <q-card-section>
          <div class="text-h6">{{ subject.code }}/{{ subject.name }}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions vertical align="right">
          <router-link :to="`/subjects/${subject.id}`">
            <q-btn flat label="browse" />
          </router-link>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

// import MathJax from "components/MathJax.vue";
// import { VueMathjax } from "vue-mathjax-next";
// import MathJax from "components/MathJax.vue";
export default defineComponent({
  components: {
    // MathJax,
    // "vue-mathjax": VueMathjax,
  },
  data() {
    return {
      formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$",
      formula1: "$$\int x^3 e^{x^4} dx$$",
      formula2: `$$\(x^2 + y^2 = z^2\)$$`,
      formula3: `
      <div>
        <div class="method"><p>Method 1/1</p></div>
        <br />
        <table class="table table-stripped table-bordered">
          <tr>
            <td>Chicken</td>
            <td>360</td>
            <td>x</td>
          </tr>
          <tr>
            <td>days</td>
            <td>21</td>
            <td>15</td>
          </tr>
        </table>
        <br />Since in order for the feeds to last 15 days, more chicken are
        needed. So, <br />$\begin{align}x &= \dfrac{21}{15} \times 360
        \;\;\;\color{red}{M_1}\\&= 504 \;\;\;\color{red}{B_1}\\\end{align}$<br /><br />
        The number of chicken required <br />$\begin{align}&= 504 - 360
        \;\;\;\color{red}{B_1} \\&= 144 \;\;\;\color{red}{A_1}\\\end{align}$<br /><br />
      </div>
      `,
      formula4: `$$\dfrac{21}{15}$$`,
      user: this.$authStore.currentUser,
      subjects: [
        {
          id: 1,
          name: "Mathematics",
          code: "01",
          icon: "icon",
        },
        {
          id: 2,
          name: "English",
          code: "02",
          icon: "",
        },
        {
          id: 3,
          name: "Science",
          code: "03",
          icon: "",
        },
        {
          id: 4,
          name: "Social Studies",
          code: "04",
          icon: "",
        },
      ],
    };
  },

  created() {
    this.get_subjects();
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
  },
});
</script>
