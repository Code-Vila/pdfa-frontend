import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type {
  FileUploadProgress,
  UploadState,
  PdfConversionResponse,
  PdfStatsResponse,
} from "@/types/api";
import { pdfConversionService } from "@/services";

export const usePdfConversionStore = defineStore("pdfConversion", () => {
  // Estado
  const uploadState = ref<UploadState>({
    files: [],
    isUploading: false,
    completed: 0,
    failed: 0,
    total: 0,
  });

  const conversions = ref<PdfConversionResponse[]>([]);
  const stats = ref<PdfStatsResponse | null>(null);
  const isLoading = ref(false);

  // Computed
  const hasActiveUploads = computed(() => uploadState.value.isUploading);
  const uploadProgress = computed(() => {
    if (uploadState.value.total === 0) return 0;
    return Math.round(
      ((uploadState.value.completed + uploadState.value.failed) /
        uploadState.value.total) *
        100
    );
  });

  const remainingConversions = computed(() => {
    if (!stats.value) return 0;
    return stats.value.daily_limit - stats.value.today_conversions;
  });

  const canConvert = computed(() => remainingConversions.value > 0);

  // Actions
  const addFiles = (files: File[]) => {
    const fileProgresses: FileUploadProgress[] = files.map((file) => ({
      file,
      progress: 0,
      status: "pending",
    }));

    uploadState.value.files.push(...fileProgresses);
    uploadState.value.total = uploadState.value.files.length;
  };

  const removeFile = (index: number) => {
    uploadState.value.files.splice(index, 1);
    uploadState.value.total = uploadState.value.files.length;
  };

  const clearFiles = () => {
    uploadState.value.files = [];
    uploadState.value.completed = 0;
    uploadState.value.failed = 0;
    uploadState.value.total = 0;
  };

  const startConversion = async () => {
    if (uploadState.value.files.length === 0) return;

    uploadState.value.isUploading = true;
    uploadState.value.completed = 0;
    uploadState.value.failed = 0;

    try {
      // Marca todos os arquivos como uploading
      uploadState.value.files.forEach((fileProgress) => {
        fileProgress.status = "uploading";
        fileProgress.progress = 0;
      });

      const files = uploadState.value.files.map((fp) => fp.file);
      const result = await pdfConversionService.convertToPdfA({ files });

      if (result.success && "data" in result) {
        // Sucesso - atualizar estado dos arquivos
        uploadState.value.files.forEach((fileProgress, index) => {
          fileProgress.status = "completed";
          fileProgress.progress = 100;
          fileProgress.conversionId = result.data[index]?.id;
        });

        uploadState.value.completed = uploadState.value.files.length;

        // Adicionar às conversões
        conversions.value.unshift(...result.data);

        // Atualizar estatísticas
        await fetchStats();
      } else {
        // Erro - marcar todos como falha
        uploadState.value.files.forEach((fileProgress) => {
          fileProgress.status = "error";
          fileProgress.error = result.message || "Erro desconhecido";
        });

        uploadState.value.failed = uploadState.value.files.length;
      }
    } catch (error) {
      // Erro geral
      uploadState.value.files.forEach((fileProgress) => {
        fileProgress.status = "error";
        fileProgress.error = "Erro ao processar arquivo";
      });

      uploadState.value.failed = uploadState.value.files.length;
    } finally {
      uploadState.value.isUploading = false;
    }
  };

  const downloadFile = async (conversionId: number, filename: string) => {
    try {
      const result = await pdfConversionService.downloadConvertedFile(
        conversionId
      );

      if (result instanceof Blob) {
        // Criar URL temporária e fazer download
        const url = window.URL.createObjectURL(result);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error(result.message || "Erro ao baixar arquivo");
      }
    } catch (error) {
      console.error("Erro ao baixar arquivo:", error);
      throw error;
    }
  };

  const fetchConversions = async (filters?: any) => {
    isLoading.value = true;
    try {
      const result = await pdfConversionService.getConversionHistory(filters);

      if (result.success && "data" in result) {
        conversions.value = result.data;
      }
    } catch (error) {
      console.error("Erro ao buscar conversões:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchStats = async () => {
    try {
      const result = await pdfConversionService.getUserStats();

      if (result.success && "data" in result) {
        stats.value = result.data;
      }
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    }
  };

  const checkConversionStatus = async (conversionId: number) => {
    try {
      const result = await pdfConversionService.getConversionStatus(
        conversionId
      );

      if (result.success && "data" in result) {
        // Atualizar conversão na lista
        const index = conversions.value.findIndex((c) => c.id === conversionId);
        if (index !== -1) {
          conversions.value[index] = result.data;
        }

        return result.data;
      }
    } catch (error) {
      console.error("Erro ao verificar status:", error);
    }

    return null;
  };

  return {
    // Estado
    uploadState,
    conversions,
    stats,
    isLoading,

    // Computed
    hasActiveUploads,
    uploadProgress,
    remainingConversions,
    canConvert,

    // Actions
    addFiles,
    removeFile,
    clearFiles,
    startConversion,
    downloadFile,
    fetchConversions,
    fetchStats,
    checkConversionStatus,
  };
});
