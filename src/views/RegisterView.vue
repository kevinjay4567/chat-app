<script setup lang="ts">
  import RegisterForm from '@/components/RegisterForm.vue'
</script>
<template>

  <div class="flex justify-center items-center h-[90vh]">
    <RegisterForm />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
