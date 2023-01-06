<template>
  <baseFilter
    :choices="[
      {
        title: 'Equals',
        value: '=',
      },
      {
        title: 'Later than',
        value: '>',
      },
      {
        title: 'Earlier than',
        value: '<',
      },
      {
        title: 'Between',
        value: '><',
      },
    ]"
    multiFieldChoice="Between"
    selectText="Must be"
    firstInputText="Start date (Y-m-d)"
    secondInputText="End date (Y-m-d)"
    :validationRules="rules"
    :filterKey="props.filterKey"
  />
</template>

<script setup>
import { baseFilter } from "@/components/service/ui/filters";

const props = defineProps(["filterKey"]);

const rules = [
  (value) => !!value || "Value is required",
  (value) => {
    const pattern = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
    return pattern.test(value) || "Invalid date";
  },
  (value) => (value || "").length <= 10 || "Invalid date",
];
</script>
