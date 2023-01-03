<template>
  <nav>
    <v-app-bar app clipped-left color="primary">
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">
        <span class="font-weight-light">Cool</span>
        <span>Log</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn variant="text" @click="logout"> Logout </v-btn>
    </v-app-bar>

    <!-- Sidebar -->
    <v-layout justify-space-between column fill-height></v-layout>
    <v-navigation-drawer color="primary" app clipped v-model="drawer">
      <v-list shaped class="mt-4">
        <v-list-item
          class="py-6"
          router
          to="/dashboard"
          title="Dashboard"
          prepend-icon="mdi-home"
        >
        </v-list-item>
        <hr class="my-2" style="border: 0.1px solid #2f3640" />
        <v-list-item
          v-for="service in serviceStore.availableServices"
          :key="service.title"
          :to="service.route"
          :title="service.title"
          router
        >
          <template v-slot:append v-if="service.count > 0">
            <v-badge color="error" :content="service.count" inline></v-badge>
          </template>
        </v-list-item>
      </v-list>

      <!-- Dark mode switch -->
      <template v-slot:append>
        <div class="pa-2">
          <v-switch
            @click="toggleDarkmode"
            v-model="darkmode"
            class="ml-10 mt-10"
            :label="darkmode ? 'Dark mode 🌑' : 'Light mode 🌞'"
          ></v-switch>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useTheme } from "vuetify";
import { useAuthenticationStore } from "@/stores/authentication";
import { useServiceStore } from "@/stores/service";

const drawer = ref(true);
const darkmode = ref(false);
const serviceStore = useServiceStore();

const theme = useTheme();
function toggleDarkmode() {
  darkmode.value = !darkmode.value;

  theme.global.name.value = darkmode.value ? "dark" : "light";

  localStorage.setItem("theme", darkmode.value ? "dark" : "light");
}

async function logout() {
  const authentication = useAuthenticationStore();
  authentication.logout();
}

onMounted(() => {
  darkmode.value = localStorage.getItem("theme") === "dark";
});
</script>
