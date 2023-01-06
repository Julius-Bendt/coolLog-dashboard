<template>
  <div>
    <v-card>
      <v-row>
        <v-col cols="10">
          <v-text-field
            clearable
            label="Search for exception message"
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
const stacktraceStore = useStacktraceStore();
const filterStore = useFilterStore();

const props = defineProps(["appName"]);

const perPage = 25;

const FiltersDialogRef = ref();

onMounted(() => {
  requestNewStacktrace();
});

function paginatorChanged() {
  requestNewStacktrace();
}

async function requestNewStacktrace() {
  await stacktraceStore.loadSearchableStacktrace(props.appName, perPage);
}

function openFilters() {
  FiltersDialogRef.value.openDialog();
}
</script>
