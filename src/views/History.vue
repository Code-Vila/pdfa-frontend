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

      <!-- Filters -->
      <div class="card mb-6">
        <div class="card-body">
          <h3 class="text-lg font-medium text-gray-100 mb-4">Filtros</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Status Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                v-model="filters.status"
                @change="resetAndLoad"
                class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Todos</option>
                <option value="processing">Processando</option>
                <option value="completed">Concluído</option>
                <option value="failed">Falha</option>
              </select>
            </div>

            <!-- Filename Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Nome do Arquivo
              </label>
              <input
                v-model="filters.filename"
                @input="debouncedSearch"
                type="text"
                placeholder="Buscar por nome..."
                class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <!-- Date From -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Data Inicial
              </label>
              <input
                v-model="filters.date_from"
                @change="resetAndLoad"
                type="date"
                class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <!-- Date To -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Data Final
              </label>
              <input
                v-model="filters.date_to"
                @change="resetAndLoad"
                type="date"
                class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <!-- Order Controls -->
          <div class="mt-4 flex gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Ordenar por
              </label>
              <select
                v-model="filters.order_by"
                @change="resetAndLoad"
                class="px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="created_at">Data de Criação</option>
                <option value="original_filename">Nome do Arquivo</option>
                <option value="status">Status</option>
                <option value="processing_time">Tempo de Processamento</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Direção
              </label>
              <select
                v-model="filters.order_direction"
                @change="resetAndLoad"
                class="px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="desc">Decrescente</option>
                <option value="asc">Crescente</option>
              </select>
            </div>

            <!-- Clear Filters -->
            <div class="flex items-end">
              <button
                @click="clearFilters"
                class="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="summary" class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="card">
          <div class="card-body text-center">
            <div class="text-2xl font-bold text-primary-400">
              {{ summary.total_conversions }}
            </div>
            <div class="text-sm text-gray-400">Total</div>
          </div>
        </div>
        <div class="card">
          <div class="card-body text-center">
            <div class="text-2xl font-bold text-green-400">
              {{ summary.completed_conversions }}
            </div>
            <div class="text-sm text-gray-400">Concluídas</div>
          </div>
        </div>
        <div class="card">
          <div class="card-body text-center">
            <div class="text-2xl font-bold text-red-400">
              {{ summary.failed_conversions }}
            </div>
            <div class="text-sm text-gray-400">Falharam</div>
          </div>
        </div>
        <div class="card">
          <div class="card-body text-center">
            <div class="text-2xl font-bold text-yellow-400">
              {{ summary.pending_conversions }}
            </div>
            <div class="text-sm text-gray-400">Pendentes</div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="card">
        <div class="card-body">
          <div class="text-center py-12">
            <svg
              class="animate-spin mx-auto h-12 w-12 text-primary-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p class="text-gray-400">Carregando histórico...</p>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="card">
        <div class="card-body">
          <div class="text-center py-12">
            <svg
              class="mx-auto h-12 w-12 text-red-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h3 class="text-lg font-medium text-gray-100 mb-2">
              Erro ao carregar histórico
            </h3>
            <p class="text-gray-500 mb-4">{{ error }}</p>
            <button @click="() => loadHistory()" class="btn-primary">
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="conversions.length === 0" class="card">
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
            <router-link to="/converter" class="btn-primary">
              Converter Primeiro Arquivo
            </router-link>
          </div>
        </div>
      </div>

      <!-- Conversions List -->
      <div v-else class="space-y-4">
        <div
          v-for="conversion in conversions"
          :key="conversion.id"
          class="card"
        >
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <!-- File Icon -->
                <div class="flex-shrink-0">
                  <svg
                    class="h-10 w-10 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>

                <!-- File Info -->
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-medium text-gray-100">
                    {{ conversion.original_filename }}
                  </h3>
                  <div
                    class="mt-1 flex items-center space-x-4 text-sm text-gray-500"
                  >
                    <span>{{ formatDate(conversion.created_at) }}</span>
                    <span>•</span>
                    <span class="flex items-center">
                      <span
                        :class="getStatusColor(conversion.status)"
                        class="inline-block w-2 h-2 rounded-full mr-2"
                      ></span>
                      {{ getStatusText(conversion.status) }}
                    </span>
                    <span v-if="conversion.processing?.processing_time">•</span>
                    <span v-if="conversion.processing?.processing_time">
                      {{ conversion.processing.processing_time }}
                    </span>
                  </div>
                  <div class="mt-1 text-sm text-gray-500">
                    Tamanho:
                    {{ conversion.file_info.formatted_original_size }} →
                    {{ conversion.file_info.formatted_converted_size || "N/A" }}
                  </div>
                  <div
                    v-if="conversion.error_message"
                    class="mt-1 text-sm text-red-400"
                  >
                    Erro: {{ conversion.error_message }}
                  </div>
                </div>

                <!-- Status Badge -->
                <div class="flex-shrink-0">
                  <span
                    :class="getStatusBadgeClass(conversion.status)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ getStatusText(conversion.status) }}
                  </span>
                </div>

                <!-- Actions -->
                <div class="flex-shrink-0 flex items-center space-x-2">
                  <button
                    v-if="
                      conversion.status === 'completed' &&
                      conversion.download_url
                    "
                    @click="downloadFile(conversion)"
                    class="btn bg-primary-600 text-white hover:bg-primary-700"
                    title="Baixar arquivo convertido"
                  >
                    <svg
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More Button (Infinite Scroll) -->
        <div v-if="hasMorePages" ref="loadMoreTrigger" class="text-center py-8">
          <button
            @click="loadMoreConversions"
            :disabled="isLoadingMore"
            class="btn bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
          >
            <svg
              v-if="isLoadingMore"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isLoadingMore ? "Carregando..." : "Carregar Mais" }}
          </button>
          <p class="text-sm text-gray-500 mt-2">
            Página {{ pagination?.current_page }} de {{ pagination?.last_page }}
          </p>
        </div>

        <!-- No More Results -->
        <div v-else-if="conversions.length > 0" class="text-center py-8">
          <p class="text-gray-500">Todos os resultados foram carregados</p>
          <p class="text-sm text-gray-600 mt-1">
            Total: {{ pagination?.total }} conversões
          </p>
        </div>
      </div>

      <!-- Back Button -->
      <div class="mt-8 text-center">
        <router-link
          to="/"
          class="btn bg-gray-700 text-gray-300 hover:bg-gray-600"
        >
          ← Voltar para Ferramentas
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useToast } from "vue-toastification";
import pdfConversionService from "@/services/api/pdf-conversion";
import type {
  PdfConversionResponse,
  ConversionFilters,
  ConversionHistoryResponse,
} from "@/types/api";

const toast = useToast();
const conversions = ref<PdfConversionResponse[]>([]);
const summary = ref<ConversionHistoryResponse["summary"] | null>(null);
const pagination = ref<any>(null);
const isLoading = ref(true);
const isLoadingMore = ref(false);
const error = ref<string | null>(null);
const currentPage = ref(1);
const loadMoreTrigger = ref<HTMLElement | null>(null);

// Filtros
const filters = ref<ConversionFilters>({
  page: 1,
  per_page: 10,
  status: undefined,
  filename: "",
  date_from: "",
  date_to: "",
  order_by: "created_at",
  order_direction: "desc",
});

// Função para obter data atual no formato YYYY-MM-DD
const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// Função para definir filtros iniciais com data atual
const setInitialFilters = () => {
  const today = getTodayDate();
  filters.value = {
    page: 1,
    per_page: 10,
    status: undefined,
    filename: "",
    date_from: today,
    date_to: today,
    order_by: "created_at",
    order_direction: "desc",
  };
};

// Computed para verificar se há mais páginas
const hasMorePages = computed(() => {
  if (!pagination.value) return false;
  return pagination.value.current_page < pagination.value.last_page;
});

// Debounce para busca por nome
let searchTimeout: number | null = null;
const debouncedSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    resetAndLoad();
  }, 500);
};

// Intersection Observer para scroll infinito
let observer: IntersectionObserver | null = null;

const setupInfiniteScroll = () => {
  if (!loadMoreTrigger.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMorePages.value && !isLoadingMore.value) {
        loadMoreConversions();
      }
    },
    {
      rootMargin: "100px",
    }
  );

  observer.observe(loadMoreTrigger.value);
};

// Carrega histórico ao montar o componente
onMounted(async () => {
  setInitialFilters(); // Define filtros iniciais com data atual
  await loadHistory();
  setupInfiniteScroll();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

const loadHistory = async (page: number = 1) => {
  if (page === 1) {
    isLoading.value = true;
    conversions.value = [];
  } else {
    isLoadingMore.value = true;
  }

  error.value = null;

  try {
    const currentFilters = { ...filters.value, page };

    // Remove filtros vazios
    Object.keys(currentFilters).forEach((key) => {
      if (
        currentFilters[key as keyof ConversionFilters] === "" ||
        currentFilters[key as keyof ConversionFilters] === null ||
        currentFilters[key as keyof ConversionFilters] === undefined
      ) {
        delete currentFilters[key as keyof ConversionFilters];
      }
    });

    const response = await pdfConversionService.getConversionHistory(
      currentFilters
    );

    if (response.success && response.data) {
      if (page === 1) {
        conversions.value = response.data.data;
        summary.value = response.data.summary;
      } else {
        conversions.value.push(...response.data.data);
      }

      pagination.value = (response as any).pagination;
      currentPage.value = page;
    } else {
      error.value = response.message || "Erro ao carregar histórico";
    }
  } catch (err: any) {
    error.value = "Erro de conexão. Verifique sua internet e tente novamente.";
    console.error("Erro ao carregar histórico:", err);
  } finally {
    isLoading.value = false;
    isLoadingMore.value = false;
  }
};

const resetAndLoad = () => {
  currentPage.value = 1;
  loadHistory(1);
};

const loadMoreConversions = async () => {
  if (hasMorePages.value && !isLoadingMore.value) {
    await loadHistory(currentPage.value + 1);
  }
};

const clearFilters = () => {
  setInitialFilters(); // Usa a função que define filtros com data atual
  resetAndLoad();
};

const downloadFile = async (conversion: PdfConversionResponse) => {
  try {
    if (!conversion.download_url) {
      toast.error("URL de download não disponível");
      return;
    }

    // Criar link temporário para download
    const link = document.createElement("a");
    link.href = conversion.download_url;
    link.download =
      conversion.converted_filename || `converted_${conversion.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Download iniciado!");
  } catch (error) {
    console.error("Erro no download:", error);
    toast.error("Erro ao baixar arquivo. Tente novamente.");
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    processing: "Processando",
    completed: "Concluído",
    failed: "Falha",
  };
  return statusMap[status] || status;
};

const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    processing: "bg-yellow-500",
    completed: "bg-green-500",
    failed: "bg-red-500",
  };
  return colorMap[status] || "bg-gray-500";
};

const getStatusBadgeClass = (status: string): string => {
  const classMap: Record<string, string> = {
    processing: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };
  return classMap[status] || "bg-gray-100 text-gray-800";
};
</script>
