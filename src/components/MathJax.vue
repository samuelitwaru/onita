<template>
  <div class="mathjax-content" ref="mathjaxContent">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MathJax",
  watch: {
    $route() {
      this.renderMath();
    },
  },
  // mounted() {
  //   this.renderMath();
  // },
  methods: {
    renderMath() {
      if (window.MathJax) {
        window.MathJax.typeset();
      }
    },
  },
};
</script>

<style scoped>
.mathjax-content {
  display: block;
}
</style>
