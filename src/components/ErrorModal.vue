<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useAuth } from '../stores/auth'

const error = ref('')
const authStore = useAuth()

function closeModal() {
  error.value = ''
  emit('update')
}

const emit = defineEmits<{
  (e: 'update'): void
}>()

watchEffect(() => {
  error.value = authStore.errorMsg
})
</script>
<template>
  <div v-if="error" class="fixed z-10 bg-gray-600 px-5 pb-14 pt-5 rounded-lg">
    <button @click="closeModal" class="flex w-full justify-end">
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
    <svg
      aria-hidden="true"
      class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <p class="text-3xl pt-5">{{ error }}</p>
  </div>
</template>
