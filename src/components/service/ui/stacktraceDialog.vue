<template>
  <v-dialog v-model="open">
    <v-card>
      <v-btn @click="open = false" class="close-btn" color="red"> X </v-btn>
      <loader v-if="loading" />
      <div v-else>
        <v-card-text>
          <h2>Stacktrace</h2>
          <div class="d-flex">
            <v-chip
              @click="toggleType(type.type)"
              v-for="type in types"
              :key="type.title"
              class="ma-2"
              :color="type.color"
              >{{ type.title }} {{ isHidden(type.type) ? "❌" : "✅" }}</v-chip
            >
          </div>
        </v-card-text>
        <v-timeline side="end" align="start">
          <v-timeline-item
            :dot-color="getDotColor(exceptionData.file)"
            size="small"
          >
            <div
              class="d-flex"
              :class="{ opacity: isHidden(fileType(exceptionData.file).type) }"
            >
              <div>
                <div>
                  <h3>{{ exceptionData.message }}</h3>
                </div>
                <div>
                  Throw at line {{ exceptionData.line }} in
                  {{ splitFilePath(exceptionData.file)[0] }}/<strong>{{
                    splitFilePath(exceptionData.file)[1]
                  }}</strong>
                </div>
              </div>
            </div>
          </v-timeline-item>

          <v-timeline-item
            v-for="(trace, i) in exceptionData.stacktrace"
            :dot-color="getDotColor(trace.file)"
            size="small"
          >
            <div
              class="d-flex"
              :class="{ opacity: isHidden(fileType(trace.file).type) }"
            >
              <div>
                <div>
                  <strong>At</strong> line {{ trace.line }} in {{ trace.file }}
                </div>
                <div>
                  <strong>Class: </strong>{{ trace.class }}{{ trace.type
                  }}{{ trace.function }}
                </div>
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>

        <v-card-actions>
          <v-btn color="red" block @click="open = false">Close Dialog</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { getRequest } from "@/services/http";

import loader from "@/components/common/loading.vue";
const open = ref(false);
const loading = ref(false);
const exceptionData = ref([]);

const hiddenTypes = ref([]);

const types = ref([
  {
    title: "Service class/file",
    type: "service",
    color: "primary",
    includes: "app",
  },
  {
    title: "Laravel class/file",
    type: "laravel",
    color: "red",
    includes: "Illuminate",
  },
  {
    title: "Vendor class/file",
    type: "vendor",
    color: "orange",
    includes: "vendor",
  },
  {
    title: "composer/unknown",
    type: "composer",
    color: "green",
    includes: "aaaaaa",
  },
]);

const openDialog = function openCurl(exceptionId) {
  open.value = true;
  getStacktrace(exceptionId);
};

async function getStacktrace(exceptionId) {
  loading.value = true;
  const response = await getRequest({ endpoint: `stacktrace/${exceptionId}` });
  loading.value = false;

  exceptionData.value = response.data;
}

function toggleType(type) {
  if (hiddenTypes.value.includes(type)) {
    hiddenTypes.value = hiddenTypes.value.filter((item) => item != type);
    return;
  }

  hiddenTypes.value.push(type);
}

function isHidden(type) {
  return hiddenTypes.value.includes(type);
}

function fileType(file) {
  let fileType = types.value.find((type) => type.type === "composer");

  types.value.forEach((type) => {
    if (file.includes(type.includes) && fileType.type == "composer") {
      fileType = type;
    }
  });

  return fileType;
}

function getDotColor(file) {
  if (!file) {
    return "green";
  }

  return fileType(file).color;
}

function splitFilePath(file) {
  let strings = file.split("/");
  const end = strings.pop();

  return [strings.join("/"), end];
}

defineExpose({
  openDialog,
});
</script>

<style scoped>
.opacity {
  opacity: 0.25;
}

.close-btn {
  position: absolute;
  top: 0%;
  right: 0%;
}
</style>
