<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Time</th>
        <th class="text-left">Message</th>
        <th class="text-left">File</th>
        <th class="text-left" v-if="props.showTimes">Times</th>
        <th class="text-left">Status code</th>
        <th class="text-left">URL</th>
        <th class="text-left">Exception class</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <stacktraceItem
        v-for="trace in traces"
        :key="trace.name"
        :trace="trace"
        :showTimes="showTimes"
      />
    </tbody>
  </v-table>
</template>

<script setup>
import stacktraceItem from "@/components/service/ui/stacktraceItem.vue";
const props = defineProps(["traces", "showTimes"]);
</script>
