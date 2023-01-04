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
import { exceptionChannel } from "@/services/pusher";
import { onMounted, onUnmounted } from "vue";

import { useStacktraceStore } from "@/stores/stacktrace";
import { useServiceStore } from "@/stores/service";

const stacktraceStore = useStacktraceStore();
const serviceStore = useServiceStore();

const props = defineProps(["appName"]);

onMounted(() => {
  requestNewStacktrace(20);
  serviceStore.clearServiceCount(props.appName);

  exceptionChannel.bind(`service-exception-${props.appName}`, function (data) {
    stacktraceStore.requestStacktraces(data.exception_ids);
  });
});

onUnmounted(() => {
  // Stop listening for live traces
  exceptionChannel.unbind(`service-exception-${props.appName}`);
});

async function requestNewStacktrace(perPage) {
  await stacktraceStore.loadNewestStacktrace(props.appName, perPage);
}
</script>
