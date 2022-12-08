<template>
  <nav v-if="authentication.loggedIn">
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
          v-for="(link, i) in links"
          router
          :to="link.route"
          :disabled="link.disabled"
          :title="link.title"
          :prepend-icon="link.icon"
        >
        </v-list-item>
      </v-list>

      <!-- Dark mode switch -->
      <template v-slot:append>
        <div class="pa-2">
          <v-switch
            @click="toggleDarkmode"
            v-model="$vuetify.theme.dark"
            class="ml-10 mt-10"
            :label="$vuetify.theme.dark ? 'Light mode 🌞' : 'Dark mode 🌑'"
          ></v-switch>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useTheme } from "vuetify";
import router from "@/router";
import { useAuthenticationStore } from "@/stores/authentication";

const authentication = useAuthenticationStore();

const links = ref([
  {
    icon: "mdi-home",
    title: "Dashboard",
    route: "/dashboard",
  },
  {
    title: "Core",
    route: "/services/core",
  },
  {
    title: "Advisering",
    route: "/services/advisering",
  },
]);

const drawer = ref(true);
const darkmode = ref(false);

const loggedIn = computed(() => {
  return localStorage.getItem("api-token");
});

const theme = useTheme();
function toggleDarkmode() {
  darkmode.value = !darkmode.value;

  theme.global.name.value = darkmode.value ? "dark" : "light";

  localStorage.setItem("theme", darkmode.value ? "dark" : "light");
}

async function logout() {
  console.log("logout");
  localStorage.removeItem("api-token", null);
  router.replace("login");
}

onMounted(() => {
  if (localStorage.theme) {
    theme.global.name.value = localStorage.getItem("theme");
    darkmode.value = localStorage.getItem("theme") === "dark";
  }
});
</script>
