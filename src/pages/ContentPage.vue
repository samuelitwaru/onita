<template lang="">
  <div>
    <q-card
      v-for="section in sections"
      :key="section"
      flat
      bordered
      class="bg-grey-2 q-pa-sm q-ma-lg"
    >
      <div>
        <div style="overflow: auto" v-html="content"></div>
      </div>
      <div class="flex" style="margin-bottom: -20px" align="right">
        <section-editor />
        <question-editor class="q-ml-xs" />
      </div>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sections: [
        { content: "lorem " },
        { content: "<h4>Hello 4</h4>" },
        { content: "<h4>Hello 3</h4>" },
      ],
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem aliquam repellendus, dolorum voluptas rerum, eligendi iusto numquam quaerat deserunt nihil magni possimus, autem reiciendis quos! Dolorem iusto animi neque ratione?",
    };
  },
};
</script>
<style lang=""></style>
