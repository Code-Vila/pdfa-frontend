<script setup lang="ts">
import { useRouter } from "vue-router";
import AppHeader from "./components/AppHeader.vue";

const router = useRouter();

// Configurar título da página baseado na rota
router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-900 text-gray-100">
    <AppHeader />
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>

<style>
#app {
  font-family: "Inter", system-ui, -apple-system, sans-serif;
}
</style>
