<script setup lang="ts">
import { ref, watchEffect } from 'vue';
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
  <div class="flex justify-center items-center h-[80vh]">
    <form @submit.prevent="login()" class="bg-[#2f2f2f] p-8 rounded-xl">
      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email" id="email" v-model="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="example@mail.com" required>
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input type="password" id="password" v-model="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required>
      </div>
      <button
        class="text-white bg-[#42b883] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800">Submit</button>
    </form>

  </div>
</template>
<style>
.login-form {
  display: flex;
  flex-direction: column;
}
</style>
