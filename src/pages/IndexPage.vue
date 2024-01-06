<template>
  <q-page class="fle flex-center" style="height: 100%">
    <div style="height: 100%">
      <!-- <label>components/MainMenu.vue</label> -->
      <my-chart />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { authStore } from "src/stores/auth";

export default defineComponent({
  name: "IndexPage",

  created() {
    // console.log(authStore);
  },
});
</script>
