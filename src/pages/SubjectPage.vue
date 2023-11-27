<template lang="">
  <div class="q-pa-sm">
    <div>
      <router-link to="/dashboard/subjects">Subjects</router-link> >
      {{ subject.code }}/{{ subject.name }}
    </div>

    <div>
      <!-- <question-browser /> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      subject: {
        id: 1,
        name: "Mathematics",
        code: "01",
        icon: "icon",
      },
    };
  },
};
</script>
<style lang=""></style>
