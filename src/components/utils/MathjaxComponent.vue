<template>
  <div v-html="mathjaxContent"></div>
</template>

<script>
import { onMounted } from "vue";

export default {
  props: ["mathExpression"],
  data() {
    return {
      mathjaxContent: "",
    };
  },
  watch: {
    mathExpression: {
      handler(newVal) {
        this.updateMathjaxContent(newVal);
      },
      immediate: true,
    },
  },
  methods: {
    updateMathjaxContent(mathExpression) {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.$el]);
      this.mathjaxContent = mathExpression;
    },
  },
  mounted() {
    onMounted(() => {
      this.updateMathjaxContent(this.mathExpression);
    });
  },
};
</script>

<style scoped>
/* Add your custom styles if needed */
</style>
