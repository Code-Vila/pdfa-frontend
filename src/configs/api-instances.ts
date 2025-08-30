import ApiService from "./http-axios-config";

// Determinar URL base da API baseada no ambiente
const getApiBaseUrl = () => {
  const env = import.meta.env.VITE_ENV || "development";

  if (env === "production") {
    return (
      import.meta.env.VITE_API_BASE_URL_PROD ||
      "http://pdfworksbackend.codevila.com.br/api/v1"
    );
  }

  return (
    import.meta.env.VITE_API_BASE_URL_DEV || "http://localhost:8000/api/v1"
  );
};

const API_BASE_URL = getApiBaseUrl();

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
