import { HttpPdfaApi } from "@/configs/api-instances";
import type {
  ExpansionRequest,
  UserExpansionRequest,
  ExpansionStatusResponse,
  ApiResponse,
  ApiErrorResponse,
  ExpansionHistoryFilters,
} from "@/types/api";

const expansionService = {
  /**
   * Solicita expansão de limite
   */
  async requestExpansion(
    request: ExpansionRequest
  ): Promise<ApiResponse<UserExpansionRequest> | ApiErrorResponse> {
    try {
      const response = await HttpPdfaApi.post("/expansion/request", request);
      return response.data as ApiResponse<UserExpansionRequest>;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }

      return {
        success: false,
        message: "Erro ao solicitar expansão. Tente novamente.",
      };
    }
  },

  /**
   * Verifica status da solicitação atual
   */
  async getExpansionStatus(): Promise<
    ApiResponse<ExpansionStatusResponse> | ApiErrorResponse
  > {
    try {
      const response = await HttpPdfaApi.get("/expansion/status");
      return response.data as ApiResponse<ExpansionStatusResponse>;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }

      return {
        success: false,
        message: "Erro ao verificar status da solicitação.",
      };
    }
  },

  /**
   * Busca histórico de solicitações
   */
  async getExpansionHistory(
    filters?: ExpansionHistoryFilters
  ): Promise<ApiResponse<UserExpansionRequest[]> | ApiErrorResponse> {
    try {
      const params = new URLSearchParams();

      if (filters?.page) params.append("page", filters.page.toString());
      if (filters?.per_page)
        params.append("per_page", filters.per_page.toString());
      if (filters?.status) params.append("status", filters.status);

      const response = await HttpPdfaApi.get(
        `/expansion/history?${params.toString()}`
      );
      return response.data as ApiResponse<UserExpansionRequest[]>;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }

      return {
        success: false,
        message: "Erro ao buscar histórico de solicitações.",
      };
    }
  },

  /**
   * Busca informações sobre expansão
   */
  async getExpansionInfo(): Promise<ApiResponse<any> | ApiErrorResponse> {
    try {
      const response = await HttpPdfaApi.get("/expansion/info");
      return response.data as ApiResponse<any>;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }

      return {
        success: false,
        message: "Erro ao buscar informações de expansão.",
      };
    }
  },

  /**
   * Cancela solicitação pendente
   */
  async cancelExpansionRequest(): Promise<ApiResponse<any> | ApiErrorResponse> {
    try {
      const response = await HttpPdfaApi.delete("/pdf/expansion/cancel");
      return response.data as ApiResponse<any>;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }

      return {
        success: false,
        message: "Erro ao cancelar solicitação.",
      };
    }
  },
};

export default expansionService;
