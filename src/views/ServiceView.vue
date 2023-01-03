<template>
  <v-row>
    <v-col>
      <h2>Stacktrace for {{ serviceName }}</h2>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card class="pa-2" outlined tile>
        <v-card>
          <v-tabs
            :model-value="tab"
            @update:model-value="changeTab"
            bg-color="primary"
          >
            <v-tab value="trace">Stacktraces</v-tab>
            <v-tab value="live-trace">Live updating</v-tab>
            <v-tab value="statistics">Statistics</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window :model-value="tab" :key="`${serviceName}_${lastUpdate}`">
              <v-window-item value="trace">
                <stacktrace :appName="serviceName" />
              </v-window-item>

              <v-window-item value="live-trace">
                <liveStacktrace :appName="serviceName" />
              </v-window-item>

              <v-window-item value="statistics" :appName="serviceName">
                <statistics />
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import {
  liveStacktrace,
  stacktrace,
  statistics,
} from "@/components/service/tabs";

const tab = ref(1);
const lastUpdate = ref(new Date().getTime());
const serviceName = computed(() => route.params.name);

const route = useRoute();

function changeTab(idx) {
  tab.value = idx;
  lastUpdate.value = new Date().getTime();
}
</script>
