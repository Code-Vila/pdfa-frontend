import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export default class ApiService {
  private instance: AxiosInstance;

  constructor(baseURL: string, withAuthToken = false) {
    this.instance = axios.create({
      baseURL,
      timeout: 30000, // 30 segundos
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Interceptador de request
    this.instance.interceptors.request.use(
      (config) => {
        if (withAuthToken) {
          // Aqui você pode adicionar tokens de autenticação se necessário
          // const token = localStorage.getItem('authToken');
          // if (token) {
          //   config.headers.Authorization = `Bearer ${token}`;
          // }
        }

        // Log da requisição em desenvolvimento
        if (import.meta.env.DEV) {
          console.log("🚀 Request:", {
            method: config.method?.toUpperCase(),
            url: config.url,
            data: config.data,
          });
        }

        return config;
      },
      (error) => {
        console.error("❌ Request Error:", error);
        return Promise.reject(error);
      }
    );

    // Interceptador de response
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log da resposta em desenvolvimento
        if (import.meta.env.DEV) {
          console.log("✅ Response:", {
            status: response.status,
            data: response.data,
          });
        }
        return response;
      },
      (error) => {
        // Log do erro
        console.error("❌ Response Error:", {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          data: error.response?.data,
        });

        // Tratamento específico de erros
        if (error.response?.status === 401) {
          // Unauthorized - redirecionar para login se necessário
          console.warn("🔒 Unauthorized access");
        } else if (error.response?.status >= 500) {
          // Erro do servidor
          console.error("🔥 Server error");
        }

        return Promise.reject(error);
      }
    );
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }

  // Métodos utilitários
  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.get(url, config);
    return response.data;
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.post(url, data, config);
    return response.data;
  }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.put(url, data, config);
    return response.data;
  }

  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.delete(url, config);
    return response.data;
  }

  public async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.patch(url, data, config);
    return response.data;
  }
}
