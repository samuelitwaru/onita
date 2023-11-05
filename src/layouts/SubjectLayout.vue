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
          <div>Mathematics</div>
        </q-toolbar-title>
        <div class="flex"></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" class="bg-grey-2" show-if-above bordered>
      <q-card flat class="q-py-sm">
        <router-link to="/dashboard/subjects">
          <q-btn
            class="q-mx-sm"
            block
            color="primary"
            flat
            icon="arrow_back"
            label="My Subjects"
          />
        </router-link>
      </q-card>
      <q-separator />

      <div class="text-h5 q-px-md q-py-xs">Term 1</div>

      <q-list bordered class="rounded-borders">
        <q-expansion-item
          v-for="theme in themes"
          :key="theme.name"
          expand-separator
          icon="folder"
          :label="theme.name"
        >
          <q-card>
            <q-list class="q-ml-lg">
              <div v-for="topic in theme.topics" :key="topic.name">
                <router-link :to="topic.route" block>
                  <q-btn
                    color="secondary"
                    class="full-width q-my-xs"
                    align="left"
                    flat
                    no-caps
                  >
                    <div class="flex no-wrap justify-start" align="left">
                      <!-- <div style="width: 20px"></div> -->
                      <q-icon name="topic" />
                      <span class="q-px-md">{{ topic.name }}</span>
                    </div>
                  </q-btn>
                </router-link>
              </div>
            </q-list>
          </q-card>
          <!-- <q-expansion-item
            switch-toggle-side
            dense-toggle
            :content-inset-level="2"
            v-for="topic in theme.topics"
            :key="topic.name"
            :header-inset-level="1"
            expand-separator
            icon="topic"
            :label="topic.name"
          >
          </q-expansion-item> -->
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>

    <!-- <q-footer elevated>
      <q-toolbar class="bg-white text-dark flex justify-between">
        <div>Attachments</div>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SubjectLayout",

  data() {
    return {
      leftDrawerOpen: false,
      topics: [{ id: 1 }],
      themes: [
        {
          name: "SETS",
          topics: [{ name: "Set Concepts", route: "/subjects/1/content" }],
        },
        {
          name: "NUMERACY",
          topics: [
            {
              name: "Whole Numbers up to 100,000",
              route: "/subjects/1/content",
            },
            {
              name: "Operations on whole Numbers",
              route: "/subjects/1/content",
            },
            { name: "Patterns and Sequences", route: "/subjects/1/content" },
          ],
        },
        {
          name: "GEOMETRY",
          topics: [
            { name: "2-Dimensional Geometry", route: "/subjects/1/content" },
          ],
        },
      ],
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
