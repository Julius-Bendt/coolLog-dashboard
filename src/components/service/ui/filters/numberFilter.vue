<template>
  <baseFilter
    :choices="[
      {
        title: 'Equals',
        value: '=',
      },
      {
        title: 'Over',
        value: '>',
      },
      {
        title: 'Under',
        value: '<',
      },
      {
        title: 'Between',
        value: '><',
      },
    ]"
    multiFieldChoice="Between"
    selectText="Must be"
    firstInputText="Numeric"
    secondInputText="Numeric"
    :validationRules="rules"
  />
</template>

<script setup>
import { baseFilter } from "@/components/service/ui/filters";

const rules = [
  (value) => !!value || "Value is required",
  (value) => (value || "").length <= 20 || "Max 20 characters",
  (value) => !isNaN(value || "") || "Must be a number",
];
</script>
