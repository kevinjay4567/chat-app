<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@/stores/auth'
import { useRouter } from 'vue-router';

const store = useAuth();
const email = ref('');
const password = ref('');
const router = useRouter();

async function login() {
  await store.login(email.value, password.value)
  router.push('/')
}
</script>
<template>
  <form @submit.prevent="login()" class="bg-[#2f2f2f] p-8 rounded-xl">
    <div class="mb-6">
      <label for="email" class="block mb-2 text-sm font-medium">Your email</label>
      <input type="email" id="email" v-model="email"
        class="border-b border-gray-600 block w-full py-1.5 bg-transparent dark:placeholder-gray-400 focus:outline-none focus:border-[#42b883]"
        placeholder="example@mail.com" required>
    </div>
    <div class="mb-6">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
      <input type="password" id="password" v-model="password"
        class="bg-transparent border-b border-gray-600 block w-full py-1.5 focus:outline-none focus:border-[#42b883]"
        required>
    </div>
    <button
      class="text-white bg-[#42b883] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center focus:bg-green-700">Submit</button>
  </form>
</template>