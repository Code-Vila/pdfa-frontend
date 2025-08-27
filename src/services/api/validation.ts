import { HttpPdfaApi } from "@/configs/api-instances";
import type {
  PdfValidationRequest,
  PdfValidationResponse,
  ApiResponse,
  ApiErrorResponse,
} from "@/types/api";

const validationService = {
  /**
   * Valida PDF para conversão
   */
  async validatePdf(
    request: PdfValidationRequest
  ): Promise<ApiResponse<PdfValidationResponse> | ApiErrorResponse> {
    try {
      const formData = new FormData();
      formData.append("file", request.file);

      const response = await HttpPdfaApi.post("/validate/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data as ApiResponse<PdfValidationResponse>;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }

      return {
        success: false,
        message: "Erro ao validar arquivo PDF.",
      };
    }
  },

  /**
   * Verifica conformidade PDF/A
   */
  async validatePdfA(
    request: PdfValidationRequest
  ): Promise<ApiResponse<PdfValidationResponse> | ApiErrorResponse> {
    try {
      const formData = new FormData();
      formData.append("file", request.file);

      const response = await HttpPdfaApi.post("/validate/pdf-a", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data as ApiResponse<PdfValidationResponse>;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }

      return {
        success: false,
        message: "Erro ao verificar conformidade PDF/A.",
      };
    }
  },

  /**
   * Estima tempo de processamento
   */
  async estimateProcessingTime(
    request: PdfValidationRequest
  ): Promise<ApiResponse<PdfValidationResponse> | ApiErrorResponse> {
    try {
      const formData = new FormData();
      formData.append("file", request.file);

      const response = await HttpPdfaApi.post("/validate/estimate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data as ApiResponse<PdfValidationResponse>;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }

      return {
        success: false,
        message: "Erro ao estimar tempo de processamento.",
      };
    }
  },

  /**
   * Busca formatos suportados
   */
  async getSupportedFormats(): Promise<ApiResponse<any> | ApiErrorResponse> {
    try {
      const response = await HttpPdfaApi.get("/validate/formats");
      return response.data as ApiResponse<any>;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }

      return {
        success: false,
        message: "Erro ao buscar formatos suportados.",
      };
    }
  },
};

export default validationService;
