# Frontend PDF/A Converter

Interface web moderna para conversão de documentos PDF para o formato PDF/A, desenvolvida com Vue.js, TypeScript e Tailwind CSS.

## 🚀 Tecnologias Utilizadas

- **Vue.js 3** - Framework reativo
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Pinia** - Gerenciamento de estado
- **Vue Router** - Roteamento
- **Vue Toastification** - Notificações
- **Axios** - Cliente HTTP
- **Vite** - Bundler e servidor de desenvolvimento

## 🛠️ Arquitetura

Seguindo os padrões do projeto **dashboard-prefeituras-frontend**, implementamos:

### Estrutura de Pastas

```
src/
├── components/           # Componentes reutilizáveis
├── views/               # Páginas da aplicação
├── router/              # Configuração de rotas
├── store/               # Gerenciamento de estado (Pinia)
├── services/            # Services para API
│   └── api/            # Serviços específicos da API
├── types/               # Definições TypeScript
├── configs/             # Configurações (API, Axios)
└── utils/               # Utilitários e helpers
```

### ⚙️ Configuração da API

#### Instância do Axios

```typescript
// configs/http-axios-config.ts
export default class ApiService {
  constructor(baseURL: string, withAuthToken = false) {
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }
}
```

#### API Instances

```typescript
// configs/api-instances.ts
export const HttpPdfaApi = createApiInstance(API_BASE_URL, false);
export const HttpPdfaApiWithAuth = createApiInstance(API_BASE_URL, true);
```

### 🔄 Services Pattern

#### PDF Conversion Service

```typescript
const pdfConversionService = {
  async convertToPdfA(request: PdfConversionRequest) {
    const formData = new FormData();
    request.files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    const response = await HttpPdfaApi.post("/pdf/convert", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },
};
```

#### Expansion Service

```typescript
const expansionService = {
  async requestExpansion(request: ExpansionRequest) {
    const response = await HttpPdfaApi.post("/expansion/request", request);
    return response.data;
  },
};
```

### 🏪 Store Management (Pinia)

```typescript
export const usePdfConversionStore = defineStore("pdfConversion", () => {
  const uploadState = ref<UploadState>({
    files: [],
    isUploading: false,
    completed: 0,
    failed: 0,
    total: 0,
  });

  const startConversion = async () => {
    uploadState.value.isUploading = true;
    const files = uploadState.value.files.map((fp) => fp.file);
    const result = await pdfConversionService.convertToPdfA({ files });
    // ...
  };

  return { uploadState, startConversion };
});
```

## 📱 Páginas Implementadas

### 🏠 Home (`/`)

- **Upload múltiplo** com drag & drop
- **Preview** dos arquivos selecionados
- **Estatísticas** de uso diário
- **Conversão** em tempo real

### 📋 Histórico (`/history`)

- **Lista** de conversões anteriores
- **Download** de arquivos convertidos
- **Filtros** por data e status
- **Paginação** de resultados

### 📈 Expansão (`/expansion`)

- **Formulário** de solicitação
- **Status** da solicitação atual
- **Histórico** de solicitações
- **Informações** sobre limites

### ℹ️ Sobre (`/about`)

- **Informações** sobre PDF/A
- **Como funciona** a conversão
- **Especificações** técnicas
- **Contato** e suporte

## 🎨 Design System (Tailwind)

### Componentes CSS Customizados

```css
/* Botões */
.btn-primary       # Azul principal
.btn-secondary     # Cinza secundário
.btn-danger        # Vermelho de perigo
.btn-success       # Verde de sucesso

/* Cards */
.card              # Card básico com sombra
.card-header       # Cabeçalho com divisor
.card-body         # Corpo com padding

/* Formulários */
.input             # Input com foco azul
.label             # Label padronizada
.error-text        # Texto de erro vermelho
.success-text      # Texto de sucesso verde;
```

### Paleta de Cores

```css
primary: {
  50: '#eff6ff',    500: '#3b82f6',
  600: '#2563eb',   700: '#1d4ed8'
}

secondary: {
  100: '#f1f5f9',   500: '#64748b',
  900: '#0f172a'
}
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- **Node.js 20.19+** ou **22.12+**
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env

# Executar desenvolvimento
npm run dev
```

### Variáveis de Ambiente

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_NAME="PDF/A Converter"
VITE_APP_VERSION="1.0.0"
VITE_ENV=development
```

## 🔌 Integração com Backend

### Endpoints Consumidos

```typescript
// Conversão PDF
POST / api / v1 / pdf / convert;
GET / api / v1 / pdf / download / { id };
GET / api / v1 / pdf / status / { id };
GET / api / v1 / pdf / history;
GET / api / v1 / pdf / stats;

// Expansão de Limite
POST / api / v1 / expansion / request;
GET / api / v1 / expansion / status;
GET / api / v1 / expansion / history;
DELETE / api / v1 / expansion / cancel;

// Validação
POST / api / v1 / validate / pdf;
POST / api / v1 / validate / pdf - a;
POST / api / v1 / validate / estimate;
GET / api / v1 / validate / formats;

// Sistema
GET / api / v1 / health;
```

### Tipos TypeScript

```typescript
interface PdfConversionRequest {
  files: File[];
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: PaginationMeta;
}

interface PdfConversionResponse {
  id: number;
  original_filename: string;
  converted_filename: string;
  status: "processing" | "completed" | "failed";
  download_url?: string;
  created_at: string;
}
```

## 🧪 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run preview      # Preview do build
npm run type-check   # Verificar tipos TS
```

## 🚀 Deploy

### Build para Produção

```bash
npm run build
# Arquivos gerados em /dist
```

### Configuração Nginx

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    # Frontend (SPA)
    location / {
        root /path/to/dist;
        try_files $uri $uri/ /index.html;
    }

    # Proxy para API Laravel
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 📋 Status do Projeto

### ✅ **Implementado**

- [x] Estrutura base Vue 3 + TypeScript
- [x] Configuração Tailwind CSS
- [x] Roteamento Vue Router
- [x] Gerenciamento estado Pinia
- [x] Services para API
- [x] Instâncias Axios configuradas
- [x] Tipos TypeScript completos
- [x] 4 views principais criadas
- [x] Design responsivo
- [x] Componentes reutilizáveis

### 🔄 **Próximos Passos**

- [ ] Conectar com API Laravel real
- [ ] Implementar persistência Pinia
- [ ] Adicionar testes unitários
- [ ] Implementar PWA
- [ ] Dark mode toggle
- [ ] Internacionalização (i18n)

## ⚠️ **Observações Técnicas**

### Versão Node.js

O projeto requer **Node.js 20.19+** devido ao Vite 7.x.
Para desenvolvimento local com versão anterior, pode ser necessário:

- Usar nvm para alternar versões
- Ou fazer downgrade do Vite

### Arquitetura Seguida

Este projeto **replica fielmente** os padrões do `dashboard-prefeituras-frontend`:

- Services pattern para API
- Configuração Axios centralizada
- Organização de pastas idêntica
- Tipos TypeScript estruturados

---

**🎯 Pronto para integração com o backend Laravel desenvolvido!**
