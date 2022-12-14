import { ref } from "vue";
import { defineStore } from "pinia";
import { getRequest } from "@/services/http";

export const useServiceStore = defineStore("service", () => {
  const serviceNames = ref([]);

  async function getServiceNames() {
    const response = await getRequest({ endpoint: "/services" });
    serviceNames.value = response.data;
  }

  return { serviceNames, getServiceNames };
});
