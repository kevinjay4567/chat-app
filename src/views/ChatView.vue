<script setup lang="ts">
import { useAuth } from '@/stores/auth';

const store = useAuth();

</script>
<template>
  <div class="flex justify-center items-center h-screen text-white text-3xl">
    <h1 v-if="store.token">{{ store.user?.name }}'s Chat</h1>
    <!-- <ul>
    <li v-for="message in messages">{{ message.body }}</li>
  </ul> -->
  </div>
</template>