<template>
  <v-dialog v-model="open">
    <v-card>
      <v-card-text>
        cURL for
        <code class="block whitespace-pre overflow-x-scroll">{{
          trace.exception
        }}</code>
        in
        <code class="block whitespace-pre overflow-x-scroll">{{
          trace.file
        }}</code>
        line
        {{ trace.line }}
        <br /><br />

        <code>{{ curl }}</code>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary">Copy cURL</v-btn>
        <v-btn color="red" @click="open = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const open = ref(false);
const trace = ref();
const curl = ref("");

const openCurl = function openCurl(newTrace) {
  open.value = true;
  trace.value = newTrace;

  curl.value = generateCurl(newTrace);
};

function generateCurl(trace) {
  const method = "POST";
  const location = trace.url;
  const data = trace.params
    ? `--data-raw '${JSON.stringify(trace.params)}'`
    : "";

  return `
  curl --location --request ${method} '${location}' \
  --header 'Content-Type: application/json' \
  ${data}
  `;
}

defineExpose({
  openCurl,
});
</script>
