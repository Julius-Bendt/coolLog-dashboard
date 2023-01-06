<template>
  <v-dialog v-model="open">
    <v-card>
      <v-card-text> <h2>Filters</h2> </v-card-text>

      <v-row>
        <v-col offset="1" cols="10">
          <dateFilter
            @onFilterChanged="filterChanged"
            title="Date filter"
            filterKey="created_at"
          />
        </v-col>
      </v-row>
      <v-row class="my-2">
        <v-col offset="1" cols="10">
          <numberFilter
            @onFilterChanged="filterChanged"
            title="User filter"
            filterKey="user_id"
            firstInputText="User id"
            :choices="[{ text: 'Equals', value: '=' }]"
          />
        </v-col>
      </v-row>

      <v-row class="my-2">
        <v-col offset="1" cols="10">
          <numberFilter
            @onFilterChanged="filterChanged"
            title="Status filter"
            filterKey="status_code"
          />
        </v-col>
      </v-row>

      <v-card-actions>
        <v-btn color="red" @click="open = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

import { dateFilter, numberFilter } from "@/components/service/ui/filters";
import { useFilterStore } from "@/stores/filter";

const filterStore = useFilterStore();

const open = ref(false);

let filtersEdited = false;
const emit = defineEmits(["onShouldFetchStacktraces"]);

function filterChanged(filter) {
  console.log("filter changed");
  filterStore.changeFilters(filter);
  filtersEdited = true;
}

const openDialog = function openDialog() {
  open.value = true;
};

watch(
  () => open.value,
  (newValue, previousValue) => {
    if (filtersEdited && !newValue) {
      filtersEdited = false;
      emit("onShouldFetchStacktraces");
    }
  }
);

defineExpose({
  openDialog,
});
</script>
