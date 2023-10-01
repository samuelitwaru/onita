<template>
  <div class="flex q-col-gutter-sm">
    <q-card
      class="q-ma-sm"
      v-for="level in levels"
      :key="level"
      style="max-width: 15rem"
    >
      <q-card-section>
        <div class="text-h6" :class="`text-${level.themeColor}`">
          {{ level.name }} Level
        </div>
        <div class="text-subtitle2">{{ level.description }}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions vertical>
        <q-btn :color="level.themeColor" label="browse" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      levels: [
        {
          name: "Primary",
          description: "Past Exam Questions",
          themeColor: "primary",
        },
        {
          name: "Ordianry",
          description: "Past Exam Questions",
          themeColor: "secondary",
        },
        {
          name: "Advanced",
          description: "Past Exam Questions",
          themeColor: "accent",
        },
      ],
    };
  },
});
</script>
