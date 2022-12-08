<template>
  <div>
    <v-row>
      <v-col cols="12" sm="4" class="mx-auto">
        <v-btn
          @click="redirectToLogin"
          prepend-icon="mdi-microsoft-windows"
          block
          variant="outlined"
        >
          SSO login
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="4" class="mx-auto">
        <v-btn
          @click="getAccount"
          prepend-icon="mdi-microsoft-windows"
          block
          variant="outlined"
        >
          Get Account
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import router from "@/router";
import { useAuthenticationStore } from "@/stores/authentication";

const authentication = useAuthenticationStore();

function redirectToLogin() {
  authentication.sso();
  // localStorage.setItem("api-token", "1234");
  // router.replace("dashboard");
}

function getAccount() {
  authentication.serverLogin();
  // localStorage.setItem("api-token", "1234");
  // router.replace("dashboard");
}
</script>
