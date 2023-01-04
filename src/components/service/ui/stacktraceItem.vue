<template>
  <tr :class="{ 'fade-color': trace.fadeIn }">
    <td>
      <p>{{ trace.createdAt }} fade in: {{ trace.fadeIn ?? false }}</p>
    </td>
    <td>
      <p>{{ trace.message }}</p>
    </td>
    <td>
      <p>Line {{ trace.line }} in {{ trace.file }}</p>
    </td>
    <td v-if="props.showTimes">
      <v-chip :color="getCountColor(trace.count)" variant="outlined">
        <p>{{ trace.count }}</p>
      </v-chip>
    </td>
    <td>
      <v-chip :color="getStatusCodeColor(trace.statusCode)" variant="outlined">
        <p>{{ trace.statusCode }}</p>
      </v-chip>
    </td>
    <td>
      <p>{{ trace.url }}</p>
    </td>
    <td>
      <p>{{ trace.exception }}</p>
    </td>
    <td>
      <v-btn color="purple" @click.prevent="openCurl()">cURL</v-btn>
      <v-btn color="blue" @click.prevent="openStacktrace()">Open</v-btn>
    </td>
  </tr>

  <curlDialog ref="curlDialogRef" />
  <stacktraceDialog ref="stacktraceDialogRef" />
</template>

<script setup>
import curlDialog from "@/components/service/ui/curlDialog.vue";
import stacktraceDialog from "@/components/service/ui/stacktraceDialog.vue";
import { ref } from "vue";

const props = defineProps(["trace", "showTimes"]);
const curlDialogRef = ref();
const stacktraceDialogRef = ref();

function getCountColor(count) {
  if (count > 100) return "red";

  if (count > 50) return "orange";

  return "";
}

function getStatusCodeColor(statusCode) {
  if (statusCode > 499) return "red";
  if (statusCode > 399) return "orange";
  if (statusCode > 299) return "blue";
  if (statusCode > 199) return "green";
  return "";
}

function openStacktrace() {
  stacktraceDialogRef.value.openDialog(props.trace.stacktraceLink);
}

function openCurl() {
  curlDialogRef.value.openCurl(props.trace);
}
</script>

<style scoped>
p {
  font-size: 12px;
}

.fade-color {
  animation-name: fade-color;
  animation-duration: 1s;
  animation-timing-function: ease-in;
}

@keyframes fade-color {
  from {
    background-color: rgba(255, 166, 0, 0.75);
  }
}
</style>
