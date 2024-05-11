<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Example School </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <router-link
          v-for="level in levels"
          :key="level"
          :to="`/school/performance/${level.id}`"
        >
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="class" />
            </q-item-section>
            <q-item-section>{{ level.name }}</q-item-section>
          </q-item>
        </router-link>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      levels: [
        {
          id: 1,
          name: "Senior 1",
          learning_center: 2,
        },
        {
          id: 2,
          name: "Senior 2",
          learning_center: 2,
        },
        {
          id: 3,
          name: "Senior 3",
          learning_center: 2,
        },
        {
          id: 4,
          name: "Senior 4",
          learning_center: 2,
        },
        {
          id: 5,
          name: "Senior 5",
          learning_center: 3,
        },
        {
          id: 6,
          name: "Senior 6",
          learning_center: 3,
        },
      ],
    };
  },
};
</script>
