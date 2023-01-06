<template>
  <baseFilter
    :choices="[
      {
        title: 'Equals',
        value: '=',
      },
    ]"
    multiFieldChoice="Between"
    selectText="Must be"
    firstInputText="Enter text..."
    secondInputText=""
    :validationRules="rules"
    :filterKey="props.filterKey"
  />
</template>

<script setup>
import { baseFilter } from "@/components/service/ui/filters";

const props = defineProps(["filterKey"]);

const rules = [
  (value) => !!value || "Value is required",
  (value) => (value || "").length >= 4 || "Must be 4 characters",
];
</script>
