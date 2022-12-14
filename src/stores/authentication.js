import { ref } from "vue";
import { defineStore } from "pinia";
import { UserAgentApplication } from "msal";
import { getRequest, postRequest } from "@/services/http";
import router from "@/router";

const tokenConfig = {
  scopes: ["User.Read"],
};

const clientId = import.meta.env.VITE_APP_AUTH_CLIENT_ID;
const redirectUri = import.meta.env.VITE_APP_AUTH_REDIRECT_URI;
const tenantId = import.meta.env.VITE_APP_AUTH_TENANT_ID;

const authConfig = {
  auth: {
    clientId: clientId,
    // authority: tenantId,
    redirectUri: redirectUri,
    postLogoutRedirectUri: redirectUri,
  },
};

const auth = new UserAgentApplication(authConfig);

export const useAuthenticationStore = defineStore("authentication", () => {
  const loggedIn = ref(false);
  const username = ref("");

  auth.handleRedirectCallback((error, resolve) => {
    if (error) {
      console.error(error);
    }

    getAccountFromAzure();
  });

  function logout(azureLogout = true) {
    if (azureLogout) {
      auth.logout();
    }

    localStorage.removeItem("api-token");
    loggedIn.value = false;
    router.replace("Login");
  }

  function sso() {
    auth.loginRedirect(tokenConfig);
  }

  async function getAccountFromAzure() {
    const azureAccount = auth.getAccount();

    if (azureAccount) {
      const data = await auth.acquireTokenSilent(tokenConfig);
      console.log(data);
      await loginFromBackend(data.accessToken);
    }
  }

  async function loginFromBackend(accessToken) {
    const response = await postRequest({
      endpoint: "/authenticate",
      payload: { access_token: accessToken },
      skipAuth: true,
    });

    username.value = response.data.user.name;
    localStorage.setItem("api-token", response.data.access_token);
    loggedIn.value = true;
  }

  async function getUserFromBackend() {
    const response = await getRequest({ endpoint: "/user" });
    username.value = response.data.name;
    loggedIn.value = true;
  }

  async function autoLogin() {
    // Verify and get information about user, otherwise try to load a token from Azure
    localStorage.getItem("api-token")
      ? await getUserFromBackend()
      : await getAccountFromAzure();

    if (loggedIn.value) {
      router.replace("Dashboard");
    }

    return loggedIn.value;
  }

  return {
    loggedIn,
    sso,
    autoLogin,
    logout,
  };
});
