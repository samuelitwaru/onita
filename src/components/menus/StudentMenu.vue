<template lang="">
  <div>
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Samuel Itwaru</div>
      </q-card-section>

      <q-card-section class="q-pt-none"> You're signed in </q-card-section>
    </q-card>
    <q-list>
      <div v-for="item in menuItems" :key="item.name">
        <router-link :to="item.route" block>
          <q-btn
            color="black"
            class="full-width"
            align="left"
            :icon="item.icon"
            flat
          >
            <span class="q-px-md">{{ item.name }}</span>
          </q-btn>
        </router-link>
      </div>
    </q-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuItems: [
        { name: "Dashboard", route: "/dashboard", icon: "dashboard" },
        { name: "Subjects", route: "/dashboard/subjects", icon: "subject" },
        {
          name: "Examination",
          route: "/dashboard/subjects",
          icon: "edit_note",
        },
        { name: "Account", route: "/dashboard/subjects", icon: "person" },
      ],
    };
  },
};
</script>
<style lang=""></style>
