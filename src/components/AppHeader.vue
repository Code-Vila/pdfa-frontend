<template>
  <header class="bg-gray-800 border-b border-gray-700 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-3">
            <div
              class="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <span class="text-xl font-bold text-white">PDF/A Converter</span>
          </router-link>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link
            to="/"
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            :class="{ 'text-white bg-gray-700': $route.name === 'Home' }"
          >
            Converter
          </router-link>
          <router-link
            to="/history"
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            :class="{ 'text-white bg-gray-700': $route.name === 'History' }"
          >
            Histórico
          </router-link>
          <router-link
            to="/expansion"
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            :class="{ 'text-white bg-gray-700': $route.name === 'Expansion' }"
          >
            Expansão
          </router-link>
          <router-link
            to="/about"
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            :class="{ 'text-white bg-gray-700': $route.name === 'About' }"
          >
            Sobre
          </router-link>
        </nav>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-gray-300 hover:text-white focus:outline-none focus:text-white"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!showMobileMenu"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="showMobileMenu" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
          <router-link
            to="/"
            @click="closeMobileMenu"
            class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            :class="{ 'text-white bg-gray-700': $route.name === 'Home' }"
          >
            Converter
          </router-link>
          <router-link
            to="/history"
            @click="closeMobileMenu"
            class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            :class="{ 'text-white bg-gray-700': $route.name === 'History' }"
          >
            Histórico
          </router-link>
          <router-link
            to="/expansion"
            @click="closeMobileMenu"
            class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            :class="{ 'text-white bg-gray-700': $route.name === 'Expansion' }"
          >
            Expansão
          </router-link>
          <router-link
            to="/about"
            @click="closeMobileMenu"
            class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            :class="{ 'text-white bg-gray-700': $route.name === 'About' }"
          >
            Sobre
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showMobileMenu = ref(false);

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const closeMobileMenu = () => {
  showMobileMenu.value = false;
};
</script>
