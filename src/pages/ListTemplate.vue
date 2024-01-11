<template lang="">
  <div class="q-pa-sm">
    <div class="text-h3">Generate Model List Template</div>
    <q-separator spaced />

    <div class="row q-gutter-sm">
      <div class="col">
        <q-card class="my-card" flat bordered>
          <q-card-section>
            <q-input v-model="formData.name" type="text" label="Name" />
            <q-input
              v-model="formData.plural_name"
              type="text"
              label="Plural Name"
              outline
            />
            <q-select
              v-model="formData.search_fields"
              multiple
              :options="searchFieldOptions"
              label="Search Fields"
            />
            <q-select
              v-model="formData.filter_fields"
              multiple
              :options="filterFieldOptions"
              label="Filter Fields"
            />
            <q-select
              v-model="formData.columns"
              multiple
              :options="filterFieldOptions"
              label="Columns"
            />
          </q-card-section>
        </q-card>
        <div class="q-py-sm text-right">
          <q-btn
            color="primary"
            label="Generate"
            @click="generateModelListTemplate"
          />
        </div>
      </div>
      <div class="col">
        <q-card class="my-card" flat bordered> </q-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        name: "Car",
        plural_name: "Cars",
        queryset_name: "cars",
        search_fields: ["name"],
        filter_fields: ["age"],
        columns: ["name", "age"],
      },
      searchFieldOptions: ["name", "age"],
      filterFieldOptions: ["age"],
    };
  },
};
</script>
<style lang=""></style>
