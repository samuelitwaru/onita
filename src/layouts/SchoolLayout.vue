<template>
  <q-layout view="lHh Lpr lFf">
    <loading-component :loading="true" />
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            src="~assets/onita-logo.923195d3.png"
            :ratio="1"
            spinner-color="primary"
            spinner-size="82px"
            height="30px"
            width="30px"
          />
          {{ $authStore.user.school.name }}
        </q-toolbar-title>
        <user-logout />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SchoolLayout",

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
