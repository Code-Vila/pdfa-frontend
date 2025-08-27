<template>
  <div class="min-h-screen bg-gray-900">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-100 mb-4">
          Ferramentas para Documentos
        </h1>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto">
          Plataforma completa com ferramentas profissionais para processamento,
          conversão e validação de documentos PDF. Simplifique seu fluxo de
          trabalho com nossas soluções confiáveis e fáceis de usar.
        </p>
      </div>

      <!-- Tools Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <!-- PDF/A Converter Tool -->
        <div
          class="card hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          @click="goToPdfConverter"
        >
          <div class="card-body">
            <div class="text-center">
              <!-- Icon -->
              <div class="mb-6">
                <div
                  class="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full"
                >
                  <svg
                    class="w-8 h-8 text-white"
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
              </div>

              <!-- Content -->
              <h3 class="text-xl font-semibold text-gray-100 mb-3">
                Conversor PDF/A
              </h3>
              <p class="text-gray-400 mb-6">
                Converta documentos PDF para o formato PDF/A, ideal para
                arquivamento de longo prazo e conformidade legal.
              </p>

              <!-- Features -->
              <ul class="text-sm text-gray-500 space-y-2 mb-6">
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Conversão rápida e segura
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Múltiplos arquivos
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Gratuito até 10 conversões/dia
                </li>
              </ul>

              <!-- Button -->
              <button class="btn-primary w-full">Converter Agora</button>
            </div>
          </div>
        </div>

        <!-- PDF/A Validator Tool - Coming Soon -->
        <div
          class="card hover:shadow-lg transition-shadow duration-300 opacity-75 relative"
        >
          <div class="card-body">
            <div class="text-center">
              <!-- Coming Soon Badge -->
              <div class="absolute top-4 right-4">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                >
                  Em Breve
                </span>
              </div>

              <!-- Icon -->
              <div class="mb-6">
                <div
                  class="inline-flex items-center justify-center w-16 h-16 bg-gray-600 rounded-full"
                >
                  <svg
                    class="w-8 h-8 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                </div>
              </div>

              <!-- Content -->
              <h3 class="text-xl font-semibold text-gray-300 mb-3">
                Validação de PDF/A
              </h3>
              <p class="text-gray-500 mb-6">
                Valide se seus documentos estão em conformidade com os padrões
                PDF/A e identifique possíveis problemas.
              </p>

              <!-- Features -->
              <ul class="text-sm text-gray-600 space-y-2 mb-6">
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-gray-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Verificação de conformidade
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-gray-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Relatório detalhado
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-gray-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Sugestões de correção
                </li>
              </ul>

              <!-- Button -->
              <button
                class="btn bg-gray-600 text-gray-300 w-full cursor-not-allowed"
                disabled
              >
                Em Desenvolvimento
              </button>
            </div>
          </div>
        </div>

        <!-- Future Tool Placeholder -->
        <div
          class="card hover:shadow-lg transition-shadow duration-300 opacity-75 relative"
        >
          <div class="card-body">
            <div class="text-center">
              <!-- Coming Soon Badge -->
              <div class="absolute top-4 right-4">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-600 text-gray-300"
                >
                  Futuro
                </span>
              </div>

              <!-- Icon -->
              <div class="mb-6">
                <div
                  class="inline-flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full"
                >
                  <svg
                    class="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    ></path>
                  </svg>
                </div>
              </div>

              <!-- Content -->
              <h3 class="text-xl font-semibold text-gray-400 mb-3">
                Mais Ferramentas
              </h3>
              <p class="text-gray-500 mb-6">
                Estamos trabalhando em novas ferramentas para documentos. Fique
                ligado para as próximas novidades!
              </p>

              <!-- Button -->
              <button
                class="btn bg-gray-700 text-gray-400 w-full cursor-not-allowed"
                disabled
              >
                Em Planejamento
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="bg-gray-800 rounded-lg p-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-100 mb-2">
            Estatísticas da Plataforma
          </h2>
          <p class="text-gray-400">
            Acompanhe o uso das ferramentas disponíveis
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-primary-600 mb-2">1,234</div>
            <div class="text-sm text-gray-400">Documentos Processados</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">567</div>
            <div class="text-sm text-gray-400">Usuários Ativos</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div class="text-sm text-gray-400">Taxa de Sucesso</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-yellow-600 mb-2">24/7</div>
            <div class="text-sm text-gray-400">Disponibilidade</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToPdfConverter = () => {
  // Navegar para uma rota específica do conversor PDF/A
  router.push("/pdf-converter");
};
</script>
