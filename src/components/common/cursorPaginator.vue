<template>
  <v-row justify="center" class="pt-5">
    <v-col cols="1">
      <v-btn
        :disabled="!stacktraceStore.prevCursor"
        variant="outlined"
        @click="stacktraceStore.loadPrev"
        icon
        color="info"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="1">
      <v-btn
        :disabled="!stacktraceStore.nextCursor"
        variant="outlined"
        @click="stacktraceStore.loadNext"
        icon
        color="info"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { useStacktraceStore } from "@/stores/stacktrace";
const stacktraceStore = useStacktraceStore();
</script>
