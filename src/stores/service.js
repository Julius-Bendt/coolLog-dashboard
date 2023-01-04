import { ref } from "vue";
import { defineStore } from "pinia";
import { getRequest } from "@/services/http";
import { exceptionChannel } from "@/services/pusher";

export const useServiceStore = defineStore("service", () => {
  const availableServices = ref([]);

  exceptionChannel.bind("exception-count", function (data) {
    let newServices = availableServices.value;

    Object.keys(data.message).forEach(function (key, index) {
      let item = availableServices.value.find((s) => s.title === key);

      if (item) {
        item.count += data.message[key];
      } else {
        newServices.push({
          title: key,
          route: `/services/${key}`,
          count: data.message[key],
        });
      }
    });

    availableServices.value = newServices;
    orderServices();
  });

  async function getServiceNames() {
    const response = await getRequest({ endpoint: "/services" });

    availableServices.value = response.data.map((name) => ({
      title: name,
      route: `/services/${name}`,
      count: 0,
    }));
    orderServices();
  }

  function clearServiceCount(serviceName) {
    availableServices.value.find((s) => s.title === serviceName).count = 0;
  }

  function orderServices() {
    availableServices.value.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  return { availableServices, getServiceNames, clearServiceCount };
});
