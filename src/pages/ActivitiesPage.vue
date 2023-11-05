<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      :limits="[50, 100]"
      style="height: 500px"
    >
      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h5 q-mb-md">Activities</div>
          <q-card class="my-card q-my-sm" v-for="n in 5" :key="n">
            <!-- <q-card-section>
              <div class="text-h6">Our Changing Planet</div>
            </q-card-section> -->
            <q-card-section>
              {{ n }} Draw equivalent sets of various named objects e.g fruits
              and animals
            </q-card-section>
          </q-card>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md"></div>
      </template>
    </q-splitter>
  </div>
</template>
<script>
export default {
  data() {
    return {
      splitterModel: 50,
    };
  },
};
</script>
<style lang=""></style>
