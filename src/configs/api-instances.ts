import ApiService from "./http-axios-config";

// URL base da API Laravel
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

const createApiInstance = (baseURL: string, withAuthToken = false) => {
  return new ApiService(baseURL, withAuthToken).getInstance();
};

// Instância principal da API PDF/A
export const HttpPdfaApi = createApiInstance(API_BASE_URL, false);

// Instância com autenticação (se necessário no futuro)
export const HttpPdfaApiWithAuth = createApiInstance(API_BASE_URL, true);

export default {
  HttpPdfaApi,
  HttpPdfaApiWithAuth,
};
