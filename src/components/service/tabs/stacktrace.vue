<template>
  <div>
    <v-card>
      <v-row>
        <v-col cols="10">
          <v-text-field
            clearable
            label="Search for exception message"
            @update:modelValue="searchUpdatedDebounced"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn block color="primary" @click="openFilters">
            Filters({{ filterStore.activeFilters.length }})
          </v-btn>
        </v-col>
      </v-row>

      <loader v-if="stacktraceStore.loading" />
      <div v-else>
        <stacktraceList
          :showTimes="true"
          :traces="stacktraceStore.stacktraces"
        />
        <cursorPaginator />
      </div>
    </v-card>
  </div>
  <FiltersDialog
    ref="FiltersDialogRef"
    @onShouldFetchStacktraces="requestNewStacktrace"
  />
</template>

<script setup>
import loader from "@/components/common/loading.vue";
import cursorPaginator from "@/components/common/cursorPaginator.vue";
import FiltersDialog from "@/components/service/ui/FiltersDialog.vue";
import { ref, onMounted } from "vue";

import stacktraceList from "@/components/service/ui/stacktraceList.vue";

import { useStacktraceStore } from "@/stores/stacktrace";
import { useFilterStore } from "@/stores/filter";

import debounce from "@/helpers/debounce";
const stacktraceStore = useStacktraceStore();
const filterStore = useFilterStore();

const props = defineProps(["appName"]);

const perPage = 25;

const FiltersDialogRef = ref();

const searchUpdatedDebounced = debounce(applySearch, 300);

onMounted(() => {
  requestNewStacktrace();
});

async function requestNewStacktrace() {
  await stacktraceStore.loadSearchableStacktrace(props.appName, perPage);
}

function openFilters() {
  FiltersDialogRef.value.openDialog();
}

function applySearch(value) {
  // If less than 4 characters, dont search, unless length is 0
  const shouldBeActive = value != null && value.length > 3 && value.length != 0;

  const filter = {
    active: shouldBeActive,
    values: [value, ""],
    type: { value: "=" },
    key: "message",
  };

  filterStore.changeFilters(filter);

  if (value.length > 3) {
    requestNewStacktrace();
    return;
  }

  if (value == null || value.length == 0) {
    requestNewStacktrace();
  }
}
</script>
