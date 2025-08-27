import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./tailwind.css";
import App from "./App.vue";

// Import routes
import { routes } from "./router";

// Create Pinia store
const pinia = createPinia();

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Create app
const app = createApp(App);

// Use plugins
app.use(pinia);
app.use(router);
app.use(Toast, {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
});

// Mount app
app.mount("#app");
