<template>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      class="rounded-borders"
    >
      <q-carousel-slide
        v-for="question in questions"
        :key="question.id"
        :name="question.value"
        class="column no-wrap flex-center"
      >
        <!-- <q-icon :name="question.value" color="primary" size="56px" /> -->
        <!-- <vue-mathjax :formula="answer"></vue-mathjax> -->
        <mathjax-component :mathExpression="answer" />
        <!-- <div style="overflow: auto" v-html="answer"></div> -->
        <!-- <div class="q-mt-md text-center">{{ lorem }}</div> -->
      </q-carousel-slide>
    </q-carousel>

    <div class="row justify-center">
      <q-btn-toggle glossy v-model="slide" :options="questions" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      questions: [
        { id: 1, label: "1", value: "1" },
        { id: 1, label: "2", value: "2" },
        { id: 1, label: "3", value: "3" },
        { id: 1, label: "4", value: "4" },
        { id: 1, label: "5", value: "5" },
        { id: 1, label: "6", value: "6" },
        { id: 1, label: "7", value: "7" },
        { id: 1, label: "8", value: "8" },
        { id: 1, label: "9", value: "9" },
        // { id: 1, label: "10", value: "10" },
        // { id: 1, label: "11", value: "11" },
        // { id: 1, label: "12", value: "12" },
        // { id: 1, label: "13", value: "13" },
        // { id: 1, label: "14", value: "14" },
        // { id: 1, label: "15", value: "15" },
        // { id: 1, label: "16", value: "16" },
        // { id: 1, label: "17", value: "17" },
      ],
      slide: ref("1"),
      answer:
        '<div class="method"><p>Method 1/1</p></div><br>$\dfrac{2^{-2} \times 3^{-3}}{2^{-4} \times 3^{-6}\times 18}$ <br><br>But $a^{-c} = \dfrac{1}{a^c}$ <br><br>$\begin{align}&= \dfrac{\dfrac{1}{2^2} \times \dfrac{1}{3^3}}{\dfrac{1}{2^4} \times \dfrac{1}{3^6} \times 18}\;\;\;\color{red}{M_1} \\ \\&= \dfrac{2^4\times 3^6}{2^2\times 3^3\times 18} \;\;\;\color{red}{B_1}\\ \\\end{align}$<br><br>But,  $18= 9 \times 2$, $9 = 3^2$ <br><br>$= \dfrac{2^4\times 3^6}{2^2\times 3^3\times 2^1 \times 3^2}\;\;\;\color{red}{B_1}$ <br><br>Also, $a^x \times a^y= a^{x+y}$ <br><br>$\begin{align}&= \dfrac{2^4\times 3^6}{2^{2+1}\times 3^{3+2}} \\ \\&= \dfrac{2^4\times 3^6}{2^{3}\times 3^{5}} \\ \\&= \dfrac{2^4}{2^3} \times \dfrac{3^6}{3^5} \\ \\\end{align}$<br><br>But $\dfrac{a^x}{a^y}= a^{x-y}$ <br><br>$\begin{align}&= 2^{(4-3)} \times 3^{(6-5)} \\&= 2^1 \times 3^1 \\&= 2 \times 3 \\&= 6\;\;\;\color{red}{A_1}\\\end{align}$<br/><br/>',
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?",
    };
  },
};
</script>
