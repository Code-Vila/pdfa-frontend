<template>
  <div class="min-h-screen bg-gray-900">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-100 mb-4">
          Conversor PDF para PDF/A
        </h1>
        <p class="text-lg text-gray-400 max-w-2xl mx-auto">
          Converta seus documentos PDF para o formato PDF/A de forma rápida e
          gratuita. O PDF/A é ideal para arquivamento de longo prazo e
          conformidade legal.
        </p>
      </div>

      <!-- Upload Area -->
      <div class="max-w-2xl mx-auto">
        <div class="card">
          <div class="card-body">
            <div
              class="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-primary-400 transition-colors"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <svg
                class="mx-auto h-12 w-12 text-gray-400 mb-4"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p class="text-lg font-medium text-gray-100 mb-2">
                Arraste e solte seus arquivos PDF aqui
              </p>
              <p class="text-sm text-gray-500 mb-4">
                ou clique para selecionar arquivos
              </p>
              <input
                ref="fileInputRef"
                type="file"
                multiple
                accept=".pdf"
                @change="handleFileSelect"
                class="hidden"
              />
              <button @click="fileInputRef?.click()" class="btn-primary">
                Selecionar Arquivos PDF
              </button>
            </div>

            <!-- File List -->
            <div v-if="selectedFiles.length > 0" class="mt-6">
              <h3 class="text-lg font-medium text-gray-100 mb-4">
                Arquivos Selecionados ({{ selectedFiles.length }})
              </h3>
              <div class="space-y-3">
                <div
                  v-for="(file, index) in selectedFiles"
                  :key="index"
                  class="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
                >
                  <div class="flex items-center">
                    <svg
                      class="h-8 w-8 text-red-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-gray-100">
                        {{ file.name }}
                      </p>
                      <p class="text-sm text-gray-500">
                        {{ formatFileSize(file.size) }}
                      </p>
                    </div>
                  </div>
                  <button
                    @click="removeFile(index)"
                    class="text-red-500 hover:text-red-700"
                  >
                    <svg
                      class="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- CAPTCHA Anti-Bot -->
              <div v-if="selectedFiles.length > 0" class="mt-4">
                <MathCaptcha
                  v-model="isCaptchaCorrect"
                  @correct="onCaptchaCorrect"
                  @incorrect="onCaptchaIncorrect"
                  ref="captchaRef"
                />
              </div>

              <!-- Convert Button -->

              <!-- Convert Button -->
              <div class="mt-6 text-center">
                <button
                  @click="convertFiles"
                  :disabled="
                    selectedFiles.length === 0 ||
                    isConverting ||
                    !isCaptchaCorrect
                  "
                  class="btn-primary"
                  :class="{
                    'opacity-50 cursor-not-allowed':
                      selectedFiles.length === 0 ||
                      isConverting ||
                      !isCaptchaCorrect,
                  }"
                >
                  <svg
                    v-if="isConverting"
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
                  {{ isConverting ? "Convertendo..." : "Converter para PDF/A" }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Usage Stats -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card">
            <div class="card-body text-center">
              <div class="text-2xl font-bold text-primary-600">
                {{ stats?.daily_limit || 10 }}
              </div>
              <div class="text-sm text-gray-500">Limite Diário</div>
            </div>
          </div>
          <div class="card">
            <div class="card-body text-center">
              <div class="text-2xl font-bold text-green-600">
                {{ stats?.today_conversions || 0 }}
              </div>
              <div class="text-sm text-gray-500">Utilizadas Hoje</div>
            </div>
          </div>
          <div class="card">
            <div class="card-body text-center">
              <div class="text-2xl font-bold text-gray-400">
                {{ stats?.remaining_conversions || 0 }}
              </div>
              <div class="text-sm text-gray-500">Restantes</div>
            </div>
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
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import pdfConversionService from "@/services/api/pdf-conversion";
import type { PdfStatsResponse } from "@/types/api";
import MathCaptcha from "@/components/MathCaptcha.vue";

const toast = useToast();
const selectedFiles = ref<File[]>([]);
const isConverting = ref(false);
const fileInputRef = ref<HTMLInputElement>();
const stats = ref<PdfStatsResponse | null>(null);

// CAPTCHA Anti-Bot
const isCaptchaCorrect = ref(false);
const captchaRef = ref<InstanceType<typeof MathCaptcha>>();

// Carregar estatísticas ao montar o componente
onMounted(async () => {
  await loadStats();
  // O CAPTCHA gera automaticamente a primeira pergunta
});

const loadStats = async () => {
  try {
    const response = await pdfConversionService.getUserStats();
    if (response.success) {
      stats.value = response.data;
    }
  } catch (error) {
    console.error("Erro ao carregar estatísticas:", error);
  }
};

// Funções do CAPTCHA
const onCaptchaCorrect = () => {
  isCaptchaCorrect.value = true;
};

const onCaptchaIncorrect = () => {
  isCaptchaCorrect.value = false;
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    addFiles(Array.from(target.files));
    // Reset do input para permitir selecionar o mesmo arquivo novamente
    target.value = "";
  }
};

const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files) {
    addFiles(Array.from(event.dataTransfer.files));
  }
};

const addFiles = (files: File[]) => {
  const pdfFiles = files.filter((file) => file.type === "application/pdf");

  if (pdfFiles.length !== files.length) {
    toast.warning("Apenas arquivos PDF são aceitos");
  }

  selectedFiles.value.push(...pdfFiles);
};

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1);

  // Se não há mais arquivos, reset do input
  if (selectedFiles.value.length === 0 && fileInputRef.value) {
    fileInputRef.value.value = "";
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const convertFiles = async () => {
  if (selectedFiles.value.length === 0) return;

  isConverting.value = true;

  try {
    // Usar o serviço real de conversão
    const response = await pdfConversionService.convertToPdfA({
      files: selectedFiles.value,
    });

    if (response.success && response.data && response.data.conversions) {
      toast.success(
        `${response.data.conversions.length} arquivo(s) convertido(s) com sucesso!`
      );

      // Fazer download dos arquivos convertidos
      for (const conversion of response.data.conversions) {
        if (conversion.download_url && conversion.converted_filename) {
          // Criar link temporário para download
          const link = document.createElement("a");
          link.href = conversion.download_url;
          link.download = conversion.converted_filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }

      selectedFiles.value = [];

      // Reset do input de arquivo para permitir selecionar o mesmo arquivo novamente
      if (fileInputRef.value) {
        fileInputRef.value.value = "";
      }

      // Gerar nova pergunta do CAPTCHA para próxima conversão
      captchaRef.value?.generateNewQuestion();

      // Recarregar estatísticas após conversão
      await loadStats();
    } else {
      // Tratar erro da API
      const errorResponse = response as any; // Type assertion para acessar errors
      const errorMessage =
        errorResponse.message || "Erro ao converter arquivos";
      toast.error(errorMessage);

      // Se há detalhes de validação, mostrar também
      if (errorResponse.errors) {
        Object.values(errorResponse.errors)
          .flat()
          .forEach((error: any) => {
            toast.error(error);
          });
      }
    }
  } catch (error: any) {
    console.error("Erro na conversão:", error);

    if (error.response?.status === 429) {
      toast.error(
        "Limite diário de conversões atingido. Tente novamente amanhã."
      );
    } else if (error.response?.status === 413) {
      toast.error("Arquivo muito grande. Tamanho máximo: 10MB por arquivo.");
    } else {
      toast.error(
        "Erro ao converter arquivos. Verifique sua conexão e tente novamente."
      );
    }
  } finally {
    isConverting.value = false;
  }
};
</script>
