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

    changeTitle();
    sortServices();
  });

  async function getServiceNames() {
    const response = await getRequest({ endpoint: "/services" });

    availableServices.value = response.data.map((name) => ({
      title: name,
      route: `/services/${name}`,
      count: 0,
    }));
    sortServices();
  }

  function clearServiceCount(serviceName) {
    availableServices.value.find((s) => s.title === serviceName).count = 0;
    changeTitle();
  }

  function sortServices() {
    availableServices.value.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  function changeTitle() {
    let title = document.title;

    if (title.startsWith("(")) {
      const titleSplit = title.split(" "); // Split string to array
      titleSplit.shift(); // Remove first element
      title = titleSplit.join(" "); // Join array to string
    }

    // Add up all notifications into an int
    const newExceptionCount = availableServices.value.reduce(
      (accumulator, current) => (accumulator += current.count),
      0
    );

    // Set the new title
    document.title = `(${newExceptionCount}) ${title}`;
  }

  return { availableServices, getServiceNames, clearServiceCount };
});
