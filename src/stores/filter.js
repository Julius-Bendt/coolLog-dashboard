import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useFilterStore = defineStore("filters", () => {
  const filters = ref([]);

  const activeFilters = computed(() =>
    filters.value.filter((filter) => filter.active === true)
  );

  function changeFilters(filter) {
    const existingFilter = getFilter(filter.key);
    if (existingFilter) {
      const index = filters.value.indexOf(existingFilter);
      filters.value[index] = filter;
    } else {
      filters.value.push(filter);
    }
  }

  function getFilter(key) {
    return filters.value.find((filter) => filter.key === key);
  }

  return { filters, activeFilters, changeFilters, getFilter };
});
