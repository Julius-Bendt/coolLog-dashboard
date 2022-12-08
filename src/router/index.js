import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard-home",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/services/:name",
      name: "Service",
      component: () => import("../views/ServiceView.vue"),
    },
  ],
});

router.afterEach((to, from) => {
  document.title = to.name + " | CoolLog";
});

router.beforeEach((to, from, next) => {
  console.log("before each");

  if (localStorage.getItem("api-token") == null && to.name !== "Login") {
    next({
      name: "Login",
    });
    return;
  }

  if (to.name === "Dashboard-home") {
    next({
      name: "Dashboard",
    });

    return;
  }

  next();
});

export default router;
