<template>
  <div class="min-h-screen bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-100">
          Solicitação de Expansão
        </h1>
        <p class="mt-2 text-gray-400">
          Precisa converter mais arquivos? Solicite um aumento do seu limite
          diário.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Formulário -->
        <div class="card">
          <div class="card-header">
            <h2 class="text-lg font-medium text-gray-100">
              Informações da Solicitação
            </h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitRequest" class="space-y-6">
              <div>
                <label class="label">Nome Completo</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="input"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label class="label">E-mail</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="input"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label class="label">Empresa/Organização (opcional)</label>
                <input
                  v-model="form.company"
                  type="text"
                  class="input"
                  placeholder="Nome da empresa"
                />
              </div>

              <div>
                <label class="label">Justificativa</label>
                <textarea
                  v-model="form.justification"
                  required
                  rows="4"
                  class="input"
                  placeholder="Explique por que precisa de mais conversões..."
                ></textarea>
                <p class="text-sm text-gray-500 mt-1">
                  Descreva o motivo da solicitação e quantos arquivos pretende
                  converter
                </p>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="btn-primary"
                  :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
                >
                  <svg
                    v-if="isSubmitting"
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {{ isSubmitting ? "Enviando..." : "Enviar Solicitação" }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Informações -->
        <div class="space-y-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-lg font-medium text-gray-100">Como Funciona</h3>
            </div>
            <div class="card-body">
              <div class="space-y-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600 text-sm font-medium"
                    >
                      1
                    </div>
                  </div>
                  <div class="ml-4">
                    <h4 class="text-sm font-medium text-gray-100">
                      Preencha o formulário
                    </h4>
                    <p class="text-sm text-gray-500">
                      Forneça suas informações e justificativa
                    </p>
                  </div>
                </div>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600 text-sm font-medium"
                    >
                      2
                    </div>
                  </div>
                  <div class="ml-4">
                    <h4 class="text-sm font-medium text-gray-100">
                      Análise da solicitação
                    </h4>
                    <p class="text-sm text-gray-500">
                      Nossa equipe avaliará sua solicitação
                    </p>
                  </div>
                </div>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600 text-sm font-medium"
                    >
                      3
                    </div>
                  </div>
                  <div class="ml-4">
                    <h4 class="text-sm font-medium text-gray-100">
                      Resposta por e-mail
                    </h4>
                    <p class="text-sm text-gray-500">
                      Você receberá a resposta em até 24h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="text-lg font-medium text-gray-100">
                Limites Disponíveis
              </h3>
            </div>
            <div class="card-body">
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-400">Limite Atual</span>
                  <span class="text-sm font-medium text-gray-100"
                    >10 conversões/dia</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-400">Limite Expandido</span>
                  <span class="text-sm font-medium text-green-600"
                    >Até 1.000 conversões/dia</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-400">Tempo de Análise</span>
                  <span class="text-sm font-medium text-gray-100"
                    >Até 24 horas</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const isSubmitting = ref(false);

const form = reactive({
  name: "",
  email: "",
  company: "",
  justification: "",
});

const submitRequest = async () => {
  isSubmitting.value = true;

  try {
    // Simular envio por enquanto
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success(
      "Solicitação enviada com sucesso! Você receberá uma resposta por e-mail."
    );

    // Limpar formulário
    Object.assign(form, {
      name: "",
      email: "",
      company: "",
      justification: "",
    });
  } catch (error) {
    toast.error("Erro ao enviar solicitação. Tente novamente.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
