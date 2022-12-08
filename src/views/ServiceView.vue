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
          <v-tabs v-model="tab" bg-color="primary">
            <v-tab value="live-trace">Live updating</v-tab>
            <v-tab value="trace">Stacktraces</v-tab>
            <v-tab value="statistics">Statistics</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="live-trace">
                <liveStacktrace />
              </v-window-item>

              <v-window-item value="trace"> <stacktrace /> </v-window-item>

              <v-window-item value="statistics"> <statistics /> </v-window-item>
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
const serviceName = computed(() => route.params.name);

const route = useRoute();
</script>
