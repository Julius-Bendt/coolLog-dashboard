<template>
  <v-card variant="tonal" class="pa-5">
    <v-row>
      <v-col cols="2">
        <v-switch
          v-model="active"
          label="Active"
          color="primary"
          hide-details
          @update:modelValue="onValueChanged"
        ></v-switch>
      </v-col>
      <v-col cols="2" v-if="props.choices.length > 1">
        <v-select
          :label="props.selectText"
          :items="props.choices"
          v-model="type"
          return-object
          @update:modelValue="onValueChanged"
        ></v-select>
      </v-col>
      <v-col
        :cols="
          type.title == props.multiFieldChoice
            ? 4
            : props.choices.length > 1
            ? 8
            : 10
        "
      >
        <v-text-field
          @update:modelValue="onValueChanged"
          v-model="values[0]"
          :label="props.firstInputText"
          :rules="props.validationRules"
          ref="firstInputRef"
        ></v-text-field>
      </v-col>
      <v-col cols="4" v-if="type.title == props.multiFieldChoice">
        <v-text-field
          @update:modelValue="onValueChanged"
          v-model="values[1]"
          :label="props.secondInputText"
          :rules="props.validationRules"
          ref="secondInputRef"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useFilterStore } from "@/stores/filter";

const emit = defineEmits(["onFilterChanged"]);
const props = defineProps([
  "choices",
  "multiFieldChoice",
  "selectText",
  "firstInputText",
  "secondInputText",
  "validationRules",
  "filterKey",
]);

const active = ref(false);
const type = ref(props.choices[0]);
const values = ref(["", ""]);

const firstInputRef = ref();
const secondInputRef = ref();

const filterStore = useFilterStore();
onMounted(() => {
  const filter = filterStore.getFilter(props.filterKey);

  if (filter) {
    active.value = filter.active;
    values.value = filter.values;
    type.value = filter.type;
  }
});

async function validateFilter() {
  // A small delay is needed, in order to register the keystroke
  await new Promise((resolve) => setTimeout(resolve, 50));

  // Validate inputs
  const firstInputErrors = await firstInputRef.value.validate();
  const secondInputErrors =
    type.value.title === props.multiFieldChoice
      ? await secondInputRef.value.validate()
      : [];

  return firstInputErrors.length + secondInputErrors.length === 0;
}

function emitChanges() {
  emit("onFilterChanged", {
    active: active.value,
    values: values.value,
    type: type.value,
    key: props.filterKey,
  });
}

async function onValueChanged(value) {
  // If value is bool, its most likely "active" thats being manipulated.
  // If this is being set to "false", then emit changes immediately
  if (typeof value === "boolean" && !value) {
    emitChanges();
    return;
  }

  const filterValid = await validateFilter();

  // Enable filter, if a input have been received, that isnt a boolean
  if (typeof value != "boolean" && active.value == false && filterValid) {
    active.value = true;
  }

  if (filterValid) {
    emitChanges();
  }
}
</script>
