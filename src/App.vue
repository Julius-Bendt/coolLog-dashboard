<template>
  <v-app>
    <navBar v-if="authentication.loggedIn && !loading" />
    <v-main>
      <v-container :fluid="true" class="fill-height">
        <v-row
          v-if="loading"
          align="center"
          justify="center"
          class="fill-height"
        >
          <v-col cols="4">
            <loader />
          </v-col>
        </v-row>
        <router-view v-else />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useTheme } from "vuetify";

import navBar from "@/components/common/navbar.vue";
import loader from "@/components/common/loading.vue";

import { useServiceStore } from "@/stores/service";
import { useAuthenticationStore } from "@/stores/authentication";

const authentication = useAuthenticationStore();

const loading = ref(false);

onMounted(async () => {
  // Set theme
  if (localStorage.theme) {
    const theme = useTheme();
    theme.global.name.value = localStorage.getItem("theme");
  }

  loading.value = true;

  const loggedIn = await authentication.autoLogin();

  if (loggedIn) {
    const service = useServiceStore();
    await service.getServiceNames();
  }

  loading.value = false;
});
</script>

<style>
::-webkit-scrollbar {
  width: 8px;
  border: 4px solid white;
}
::-webkit-scrollbar-thumb {
  background-color: #7f8c8d;
  background-clip: padding-box;
  border: 0.05em solid #eeeeee;
  border-radius: 16px;
}
::-webkit-scrollbar-thumb:hover {
  background: #95a5a6;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  background-color: #ecf0f1;
}
</style>
