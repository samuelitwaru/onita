<template>
  <!-- <q-layout view="lHh Lpr lFf">
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
    </q-drawer>

    <q-page-container>
      <div class="text-right"></div>
      <router-view> </router-view>
    </q-page-container>
  </q-layout> -->
  <q-layout view="hHr LpR lFf">
    <router-view> </router-view>
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

  created() {},

  methods: {},
});
</script>

<style>
a {
  text-decoration: none;
}
</style>
