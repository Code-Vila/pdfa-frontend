<template>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
    <label class="block text-sm font-medium text-gray-200 mb-2">
      {{ label }}
    </label>
    <div class="flex items-center space-x-4">
      <span class="text-lg font-mono text-gray-300">
        {{ question.a }} + {{ question.b }} = ?
      </span>
      <input
        v-model.number="userAnswer"
        type="number"
        class="input w-20"
        placeholder="?"
        required
        @input="validateAnswer"
      />
      <button
        @click="generateNewQuestion"
        class="text-gray-400 hover:text-gray-300 p-1 rounded transition-colors"
        type="button"
        :title="refreshTitle"
      >
        🔄
      </button>
    </div>
    <p class="text-sm text-gray-500 mt-1">
      {{ helpText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

// Props
interface Props {
  label?: string;
  helpText?: string;
  refreshTitle?: string;
  modelValue?: boolean;
}

withDefaults(defineProps<Props>(), {
  label: "Verificação Anti-Bot",
  helpText: "Resolva esta operação para continuar",
  refreshTitle: "Gerar nova pergunta",
});

// Emits
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  correct: [];
  incorrect: [];
}>();

// Estado interno
const question = ref({ a: 0, b: 0, answer: 0 });
const userAnswer = ref<number | null>(null);

// Computed para verificar se a resposta está correta
const isCorrect = computed(() => {
  return userAnswer.value === question.value.answer;
});

// Gerar nova pergunta matemática
const generateNewQuestion = () => {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  question.value = { a, b, answer: a + b };
  userAnswer.value = null;

  // Emitir que não está mais correto
  emit("update:modelValue", false);
  emit("incorrect");
};

// Validar resposta
const validateAnswer = () => {
  if (isCorrect.value) {
    emit("update:modelValue", true);
    emit("correct");
  } else {
    emit("update:modelValue", false);
    emit("incorrect");
  }
};

// Watcher para mudanças na resposta
watch(userAnswer, validateAnswer);

// Expor métodos para uso externo
defineExpose({
  generateNewQuestion,
  isCorrect: computed(() => isCorrect.value),
  reset: () => {
    generateNewQuestion();
  },
});

// Gerar primeira pergunta ao montar
onMounted(() => {
  generateNewQuestion();
});
</script>
