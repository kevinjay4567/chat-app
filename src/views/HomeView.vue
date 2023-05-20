<script setup lang="ts">
import { useAuth } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';

const store = useAuth();
const router = useRouter();

async function logout() {
  await store.logout();
  router.push('/login')
}

</script>

<template>
  <main class="flex flex-col justify-center items-center h-[90vh] gap-10">
    <h1 v-if="store.user" class="text-3xl">Hello {{ store.user.name }}</h1>
    <button class="bg-[#42b883] px-4 py-2 rounded-md" @click="logout()">Logout</button>
  </main>
</template>
