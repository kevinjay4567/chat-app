import { defineStore } from "pinia";
import axios from "axios";
import { ref, type Ref } from "vue";
import type { T } from "vitest/dist/types-ad1c3f45.js";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export const useUser = defineStore('user', () => {
  const user = ref([]);

  async function getUserById(messages: Array<Object>) {
    messages.forEach(async message => {
     await axios.get(`/api/users/${message.user_receive}`) 
     .then(res => {
      user.value.push(res.data)
     })
    });
  }

  return { user, getUserById }
})