<template lang="">
  <div>
    <q-card flat bordered class="my-card q-ma-sm">
      <q-card-section>
        <div class="text-h6">
          <q-icon name="person" size="xl" />{{ user.teacher.full_name }}
          <p class="q-pl-xl">
            <!-- <small class="text-grey-8">asasaa</small> -->
          </p>
          <!-- <q-separator spaced /> -->
        </div>
        <div class="q-pl-xl">You're signed in</div>
      </q-card-section>
    </q-card>
    <q-list>
      <div v-for="item in menuItems" :key="item.name">
        <router-link :to="item.route" block>
          <q-btn
            :color="$route.path == item.route ? 'primary' : 'black'"
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
      user: this.$authStore.currentUser,
      menuItems: [
        { name: "Dashboard", route: "/dashboard", icon: "dashboard" },
        { name: "My Subjects", route: "/teacher/subjects", icon: "subject" },
        { name: "Questions", route: "/teacher/questions", icon: "edit" },
        {
          name: "Examinations",
          route: "/teacher/examinations",
          icon: "edit_note",
        },
        // { name: "Wallet", route: "/dashboard/wallet", icon: "wallet" },
        // // {
        // //   name: "Examination",
        // //   route: "/dashboard/subjects",
        // //   icon: "edit_note",
        // // },
        // {
        //   name: "Account",
        //   route: "/dashboard/account/teacher",
        //   icon: "person",
        // },
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
