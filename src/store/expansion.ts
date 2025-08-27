import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  UserExpansionRequest,
  ExpansionStatusResponse,
  ExpansionRequest,
} from "@/types/api";
import { expansionService } from "@/services";

export const useExpansionStore = defineStore("expansion", () => {
  // Estado
  const currentRequest = ref<UserExpansionRequest | null>(null);
  const requests = ref<UserExpansionRequest[]>([]);
  const expansionStatus = ref<ExpansionStatusResponse | null>(null);
  const isLoading = ref(false);

  // Actions
  const submitExpansionRequest = async (request: ExpansionRequest) => {
    isLoading.value = true;
    try {
      const result = await expansionService.requestExpansion(request);

      if (result.success && "data" in result) {
        currentRequest.value = result.data;
        requests.value.unshift(result.data);
        await fetchExpansionStatus(); // Atualizar status
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error("Erro ao solicitar expansão:", error);
      return { success: false, message: "Erro ao solicitar expansão" };
    } finally {
      isLoading.value = false;
    }
  };

  const fetchExpansionStatus = async () => {
    try {
      const result = await expansionService.getExpansionStatus();

      if (result.success && "data" in result) {
        expansionStatus.value = result.data;
        currentRequest.value = result.data.request || null;
      }
    } catch (error) {
      console.error("Erro ao buscar status de expansão:", error);
    }
  };

  const fetchExpansionHistory = async (filters?: any) => {
    isLoading.value = true;
    try {
      const result = await expansionService.getExpansionHistory(filters);

      if (result.success && "data" in result) {
        requests.value = result.data;
      }
    } catch (error) {
      console.error("Erro ao buscar histórico de expansão:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const cancelExpansionRequest = async () => {
    isLoading.value = true;
    try {
      const result = await expansionService.cancelExpansionRequest();

      if (result.success) {
        currentRequest.value = null;
        await fetchExpansionStatus();
        await fetchExpansionHistory();
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error("Erro ao cancelar solicitação:", error);
      return { success: false, message: "Erro ao cancelar solicitação" };
    } finally {
      isLoading.value = false;
    }
  };

  const getExpansionInfo = async () => {
    try {
      const result = await expansionService.getExpansionInfo();

      if (result.success && "data" in result) {
        return result.data;
      }
    } catch (error) {
      console.error("Erro ao buscar informações de expansão:", error);
    }

    return null;
  };

  return {
    // Estado
    currentRequest,
    requests,
    expansionStatus,
    isLoading,

    // Actions
    submitExpansionRequest,
    fetchExpansionStatus,
    fetchExpansionHistory,
    cancelExpansionRequest,
    getExpansionInfo,
  };
});
