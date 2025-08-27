<template>
  <div class="min-h-screen bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-100">
          Histórico de Conversões
        </h1>
        <p class="mt-2 text-gray-400">
          Visualize e baixe suas conversões anteriores
        </p>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="text-center py-12">
            <svg
              class="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 class="text-lg font-medium text-gray-100 mb-2">
              Nenhuma conversão encontrada
            </h3>
            <p class="text-gray-500 mb-4">
              Você ainda não converteu nenhum arquivo.
            </p>
            <router-link to="/" class="btn-primary">
              Converter Primeiro Arquivo
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Implementação futura com dados reais
</script>
