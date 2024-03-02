<template>
  <q-layout view="lHh Lpr lFf">
    <loading-component :loading="true" />
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-img
            src="~assets/onita-logo.923195d3.png"
            :ratio="1"
            spinner-color="primary"
            spinner-size="82px"
            height="30px"
            width="30px"
          />
          ONITA
        </q-toolbar-title>
        <user-logout />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <student-menu v-if="$userHasGroup('student')" />
      <teacher-menu v-if="$userHasGroup('teacher')" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
