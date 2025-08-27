// ===== TIPOS PRINCIPAIS =====

export interface PdfConversion {
  id: number;
  ip_address: string;
  user_agent?: string;
  original_filename: string;
  original_path: string;
  converted_filename: string;
  converted_path: string;
  original_size: number; // bytes
  converted_size: number; // bytes
  status: "processing" | "completed" | "failed";
  error_message?: string;
  processing_time?: number; // milissegundos
  metadata?: PdfMetadata;
  created_at: string;
  updated_at: string;
}

export interface PdfMetadata {
  title?: string;
  author?: string;
  subject?: string;
  creator?: string;
  producer?: string;
  creation_date?: string;
  modification_date?: string;
  pages?: number;
  pdf_version?: string;
}

export interface UserExpansionRequest {
  id: number;
  ip_address: string;
  user_agent?: string;
  name: string;
  email: string;
  company?: string;
  reason: string;
  requested_limit: number;
  status: "pending" | "approved" | "rejected";
  admin_notes?: string;
  approved_at?: string;
  approved_by?: number;
  created_at: string;
  updated_at: string;
}

export interface DailyUsage {
  id: number;
  ip_address: string;
  usage_date: string;
  conversions_count: number;
  daily_limit: number;
  is_expanded: boolean;
  expansion_request_id?: number;
  created_at: string;
  updated_at: string;
}

// ===== TIPOS DE REQUEST =====

export interface PdfConversionRequest {
  files: File[];
}

export interface ExpansionRequest {
  name: string;
  email: string;
  company?: string;
  justification: string;
}

export interface PdfValidationRequest {
  file: File;
}

// ===== TIPOS DE RESPONSE =====

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    total?: number;
    per_page?: number;
    current_page?: number;
    last_page?: number;
  };
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PdfConversionResponse {
  id: number;
  original_filename: string;
  converted_filename: string;
  status: string;
  processing_time?: number;
  original_size: number;
  converted_size: number;
  download_url?: string;
  created_at: string;
}

export interface PdfStatsResponse {
  total_conversions: number;
  today_conversions: number;
  daily_limit: number;
  remaining_conversions: number;
  is_expanded: boolean;
  average_processing_time?: number;
}

export interface ExpansionStatusResponse {
  has_request: boolean;
  request?: UserExpansionRequest;
  can_request: boolean;
  current_limit: number;
}

export interface PdfValidationResponse {
  is_valid: boolean;
  is_pdf_a_compatible: boolean;
  estimated_processing_time: number; // segundos
  file_info: {
    size: number;
    pages?: number;
    pdf_version?: string;
  };
  warnings?: string[];
  errors?: string[];
}

export interface HealthCheckResponse {
  status: "ok" | "error";
  timestamp: string;
  services: {
    database: "up" | "down";
    ghostscript: "up" | "down";
    storage: "up" | "down";
  };
}

// ===== TIPOS DE FILTROS E PAGINAÇÃO =====

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

export interface ConversionFilters extends PaginationParams {
  status?: PdfConversion["status"];
  date_from?: string;
  date_to?: string;
}

export interface ExpansionHistoryFilters extends PaginationParams {
  status?: UserExpansionRequest["status"];
}

// ===== TIPOS DE UPLOAD =====

export interface FileUploadProgress {
  file: File;
  progress: number; // 0-100
  status: "pending" | "uploading" | "completed" | "error";
  conversionId?: number;
  error?: string;
}

export interface UploadState {
  files: FileUploadProgress[];
  isUploading: boolean;
  completed: number;
  failed: number;
  total: number;
}

// ===== TIPOS DE ERRO =====

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: ValidationError[];
}

// ===== UTILITÁRIOS =====

export type ConversionStatus = PdfConversion["status"];
export type ExpansionStatus = UserExpansionRequest["status"];

export interface AppNotification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
  actions?: {
    label: string;
    action: () => void;
  }[];
}
