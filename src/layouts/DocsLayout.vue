<template>
  <q-layout view="lHh LpR lFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Onita Docs </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Page Content -->
    <q-page-container>
      <!-- Content goes here -->
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      sidebarItems: [
        { label: "Dashboard" },
        { label: "Posts" },
        { label: "Users" },
        // Add more sidebar items as needed
      ],
      breakpoint: 600, // Set a breakpoint for sidebar behavior
    };
  },
};
</script>

<style>
/* Add any custom styles here */
</style>
