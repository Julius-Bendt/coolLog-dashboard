import { ref } from "vue";
import { defineStore } from "pinia";
import { postRequest } from "@/services/http";
import { useFilterStore } from "./filter";

export const useStacktraceStore = defineStore("stacktrace", () => {
  const stacktraces = ref([]);
  const loading = ref(false);

  const prevCursor = ref("");
  const nextCursor = ref("");

  function setData(response) {
    stacktraces.value = response.data.data;

    prevCursor.value = response.data.prev_page_url;
    nextCursor.value = response.data.next_page_url;
  }

  async function loadSearchableStacktrace(appName, perPage = 20) {
    loading.value = true;

    const response = await postRequest({
      endpoint: `services/searchable/${appName}/${perPage}`,
      payload: { filters: getFilters() },
    });

    setData(response);

    loading.value = false;
  }

  async function loadNewestStacktrace(appName, perPage = 20) {
    loading.value = true;

    const response = await postRequest({
      endpoint: `services/newest/${appName}/${perPage}`,
    });

    setData(response);

    loading.value = false;
  }

  async function requestStacktraces(exception_ids) {
    // Filter away any duplicate ids:
    const existingIds = stacktraces.value.map((v) => v.id);
    exception_ids = exception_ids.filter((v) => !existingIds.includes(v));

    const response = await postRequest({
      endpoint: "services/load",
      payload: { ids: exception_ids },
    });

    response.data.forEach((newTrace) => {
      newTrace.fadeIn = true;
      stacktraces.value.unshift(newTrace);
    });
  }

  async function loadNext() {
    // Split string
    const url = nextCursor.value.replace(
      `${import.meta.env.VITE_API_ENDPOINT}/api/v1`,
      ""
    );

    loading.value = true;

    const response = await postRequest({
      endpoint: url,
      payload: { filters: getFilters() },
    });

    setData(response);

    loading.value = false;
  }

  async function loadPrev() {
    // Split string
    const url = prevCursor.value.replace(
      `${import.meta.env.VITE_API_ENDPOINT}/api/v1`,
      ""
    );

    loading.value = true;

    const response = await postRequest({
      endpoint: url,
      payload: { filters: getFilters() },
    });

    setData(response);

    loading.value = false;
  }

  function getFilters() {
    const filterStore = useFilterStore();

    const filters = filterStore.activeFilters.map((f) => ({
      ...f,
      type: f.type.value,
    }));

    return filters;
  }

  return {
    loading,
    stacktraces,
    loadSearchableStacktrace,
    loadNewestStacktrace,
    requestStacktraces,
    loadNext,
    nextCursor,
    loadPrev,
    prevCursor,
  };
});
