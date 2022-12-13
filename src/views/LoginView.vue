<template>
  <v-row align="center" justify="center" class="fill-height">
    <v-col cols="6" sm="4">
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
  authentication.getAccountFromAzure();
}
</script>
