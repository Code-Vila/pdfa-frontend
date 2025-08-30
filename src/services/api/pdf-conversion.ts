import { HttpPdfaApi } from "@/configs/api-instances";
import type {
  PdfConversionRequest,
  PdfConversionResponse,
  PdfConversionApiResponse,
  ApiResponse,
  ApiErrorResponse,
  PdfStatsResponse,
  ConversionFilters,
  ConversionHistoryResponse,
  HealthCheckResponse,
} from "@/types/api";

const pdfConversionService = {
  /**
   * Converte arquivos PDF para PDF/A
   */
  async convertToPdfA(
    request: PdfConversionRequest
  ): Promise<ApiResponse<PdfConversionApiResponse> | ApiErrorResponse> {
    try {
      const formData = new FormData();

      // Adiciona os arquivos ao FormData
      request.files.forEach((file: File, index: number) => {
        formData.append(`files[${index}]`, file);
      });

      const response = await HttpPdfaApi.post("/pdf/convert", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 300000, // 5 minutos para upload
      });

      return response.data as ApiResponse<PdfConversionApiResponse>;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }

      return {
        success: false,
        message: "Erro ao processar conversão. Tente novamente.",
      };
    }
  },

  /**
   * Baixa arquivo convertido
   */
  async downloadConvertedFile(
    conversionId: number
  ): Promise<Blob | ApiErrorResponse> {
    try {
      const response = await HttpPdfaApi.get(`/pdf/download/${conversionId}`, {
        responseType: "blob",
      });

      return response.data as Blob;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }

      return {
        success: false,
        message: "Erro ao baixar arquivo. Tente novamente.",
      };
    }
  },

  /**
   * Verifica status de uma conversão
   */
  async getConversionStatus(
    conversionId: number
  ): Promise<ApiResponse<PdfConversionResponse> | ApiErrorResponse> {
    try {
      const response = await HttpPdfaApi.get(`/pdf/status/${conversionId}`);
      return response.data as ApiResponse<PdfConversionResponse>;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }

      return {
        success: false,
        message: "Erro ao verificar status da conversão.",
      };
    }
  },

  /**
   * Busca histórico de conversões
   */
  async getConversionHistory(
    filters?: ConversionFilters
  ): Promise<ApiResponse<ConversionHistoryResponse> | ApiErrorResponse> {
    try {
      const params = new URLSearchParams();

      if (filters?.page) params.append("page", filters.page.toString());
      if (filters?.per_page)
        params.append("per_page", filters.per_page.toString());
      if (filters?.status) params.append("status", filters.status);
      if (filters?.date_from) params.append("date_from", filters.date_from);
      if (filters?.date_to) params.append("date_to", filters.date_to);
      if (filters?.filename) params.append("filename", filters.filename);
      if (filters?.order_by) params.append("order_by", filters.order_by);
      if (filters?.order_direction)
        params.append("order_direction", filters.order_direction);

      const response = await HttpPdfaApi.get(
        `/pdf/history?${params.toString()}`
      );
      return response.data as ApiResponse<ConversionHistoryResponse>;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }

      return {
        success: false,
        message: "Erro ao buscar histórico de conversões.",
      };
    }
  },

  /**
   * Busca estatísticas do usuário
   */
  async getUserStats(): Promise<
    ApiResponse<PdfStatsResponse> | ApiErrorResponse
  > {
    try {
      const response = await HttpPdfaApi.get("/pdf/stats");
      return response.data as ApiResponse<PdfStatsResponse>;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }

      return {
        success: false,
        message: "Erro ao buscar estatísticas.",
      };
    }
  },

  /**
   * Verifica saúde da API
   */
  async healthCheck(): Promise<
    ApiResponse<HealthCheckResponse> | ApiErrorResponse
  > {
    try {
      const response = await HttpPdfaApi.get("/health");
      return response.data as ApiResponse<HealthCheckResponse>;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }

      return {
        success: false,
        message: "Erro ao verificar status da API.",
      };
    }
  },
};

export default pdfConversionService;
