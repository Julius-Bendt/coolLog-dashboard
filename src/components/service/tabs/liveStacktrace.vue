<template>
  <loader v-if="stacktraceStore.loading" />
  <div v-else>
    <stacktraceList :traces="stacktraceStore.stacktraces" />
    <cursorPaginator />
  </div>
</template>

<script setup>
import stacktraceList from "@/components/service/ui/stacktraceList.vue";
import cursorPaginator from "@/components/common/cursorPaginator.vue";
import loader from "@/components/common/loading.vue";
import { onMounted } from "vue";

import { useStacktraceStore } from "@/stores/stacktrace";
const stacktraceStore = useStacktraceStore();

const props = defineProps(["appName"]);

onMounted(() => {
  requestNewStacktrace(20);
});

async function requestNewStacktrace(perPage) {
  await stacktraceStore.loadNewestStacktrace(props.appName, perPage);
}
</script>
