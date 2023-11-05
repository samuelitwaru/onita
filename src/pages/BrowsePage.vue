<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-dark">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title class="flex justify-between">
          <div>Browse</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-grey-2"
      show-if-above
      bordered
      :width="220"
    >
      <q-card flat class="q-py-sm">
        <router-link to="/">
          <q-btn
            class="q-mx-sm"
            block
            color="primary"
            flat
            icon="arrow_back"
            label="Home"
          />
        </router-link>
      </q-card>
      <q-separator />
      <q-list>
        <a v-for="(subject, index) in subjects" :key="subject.id">
          <q-item clickable v-ripple>
            <div class="q-px-sm border q-my-auto q-mr-sm">
              {{ index + 1 }}
            </div>
            <q-item-section>{{ subject.name }} </q-item-section>
          </q-item>
          <q-separator />
        </a>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "BrowsePage",

  data() {
    return {
      leftDrawerOpen: false,

      subjects: [
        { id: 1, name: "Mathematics" },
        { id: 2, name: "English" },
        { id: 3, name: "Social Studies" },
        { id: 4, name: "Science" },
      ],
    };
  },

  created() {},

  methods: {
    openFile(fileURL) {
      window.open(fileURL);
    },
  },
});
</script>

<style>
a {
  text-decoration: none;
}
</style>
