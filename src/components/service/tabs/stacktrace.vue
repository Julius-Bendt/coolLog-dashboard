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
          <v-btn block color="primary"> Filters </v-btn>
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
</template>

<script setup>
import loader from "@/components/common/loading.vue";
import cursorPaginator from "@/components/common/cursorPaginator.vue";
import { ref, onMounted } from "vue";

import stacktraceList from "@/components/service/ui/stacktraceList.vue";

import { useStacktraceStore } from "@/stores/stacktrace";
const stacktraceStore = useStacktraceStore();

const props = defineProps(["appName"]);

const perPage = 25;

onMounted(() => {
  requestNewStacktrace();
});

function paginatorChanged() {
  requestNewStacktrace();
}

async function requestNewStacktrace() {
  await stacktraceStore.loadSearchableStacktrace(props.appName, perPage);
}
</script>
