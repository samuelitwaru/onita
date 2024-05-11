<template lang="">
  <div class="flex q-pa-sm flex-center q-gutter-sm" style="width: 40rem">
    <router-link :to="item.route" v-for="item in menuItems" :key="item.name">
      <q-card class="text-center" flat bordered style="min-width: 150px">
        <q-card-section>
          <q-icon :name="item.icon" size="xl" />
        </q-card-section>

        <q-card-actions>
          <div class="absolute-bottom">
            <div class="text-h6">{{ item.name }}</div>
          </div>
        </q-card-actions>
      </q-card>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$authStore.currentUser,
      menuItems: [
        { name: "Students", route: "/school/students", icon: "school" },
        { name: "Teachers", route: "/school/teachers", icon: "people" },
        { name: "Wallet", route: "/school/wallet", icon: "wallet" },
        {
          name: "Performance",
          route: "/school/performance",
          icon: "bar_chart",
        },
        { name: "Profile", route: "/school/profile", icon: "home_work" },
      ],
    };
  },
  watch: {
    "$authStore.currentUser": {
      handler(newValue) {
        this.user = newValue;
      },
      deep: true,
    },
  },
};
</script>

<style lang=""></style>
