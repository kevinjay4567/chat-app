<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  message: String
  bool: boolean
}>()

const style = computed(() => (props.bool ? 'self-start bg-gray-700' : 'self-end bg-green-700'))
</script>
<template>
  <div :class="`px-2 text-center rounded-lg ${style}`">
    <p>{{ props.message }}</p>
  </div>
</template>
