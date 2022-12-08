import { ref } from "vue";
import { defineStore } from "pinia";
import { UserAgentApplication } from "msal";

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
  const loggingIn = ref(false);
  const username = ref("");

  auth.handleRedirectCallback((error, resolve) => {
    if (error) {
      console.error(error);
    }

    console.log("No errros! got data!");
    serverLogin();
  });

  function logout() {
    auth.logout();
    localStorage.removeItem("api-token");
    loggedIn.value = false;
  }

  function sso() {
    auth.loginRedirect(tokenConfig);
  }

  function getAccountFromAzure() {
    const azureAccount = auth.getAccount();

    if (azureAccount) {
      auth
        .acquireTokenSilent(tokenConfig)
        .catch(() => auth.acquireTokenRedirect(tokenConfig))
        .then((data) => {
          const account = requestAccountFromBackend(data.accessToken);
        })
        .catch((error) => {
          console.error("error", error);
        });
    }
  }

  function serverLogin() {}

  return { loggedIn, loggingIn, sso, serverLogin, getTokenFromAzure, logout };
});
