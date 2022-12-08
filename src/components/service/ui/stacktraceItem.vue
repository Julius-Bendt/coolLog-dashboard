<template>
  <tr>
    <td>{{ trace.message }}</td>
    <td>Line {{ trace.line }} in {{ trace.file }}</td>
    <td>
      <v-chip :color="getCountColor(trace.count)" variant="outlined">
        {{ trace.count }}
      </v-chip>
    </td>
    <td>
      <v-chip :color="getStatusCodeColor(trace.statusCode)" variant="outlined">
        {{ trace.statusCode }}
      </v-chip>
    </td>
    <td>{{ trace.url }}</td>
    <td>{{ trace.exception }}</td>
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

const props = defineProps(["trace"]);
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
