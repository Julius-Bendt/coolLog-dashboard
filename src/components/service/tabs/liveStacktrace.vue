<template>
  <stacktraceList :traces="traces" />
</template>

<script setup>
import stacktraceList from "@/components/service/ui/stacktraceList.vue";
import { ref } from "vue";

const traces = ref([]);
</script>
