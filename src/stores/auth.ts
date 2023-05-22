import { defineStore } from "pinia";
import axios from "@/utils/axios";
import { ref, type Ref } from "vue";
import type IUser from "@/interfaces/IUser";

export const useAuth = defineStore('auth', () => {
  const user: Ref<IUser | null> = ref(null);
  const token = ref('');

  async function login(email: string, password: string) {
    await axios.post('/api/login', {
      email: email,
      password: password
    }).then(res => {
      token.value = res.data.token
      user.value = res.data.user
    })
  }

  async function logout() {
    await axios.get('/sanctum/csrf-cookie').then(() => {
      axios.post('/api/logout', {}, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token.value}`,
        }
      }).then(res => {
        console.log(res.data)
      })
    })

    localStorage.clear();
    token.value = '';
    user.value = null;
  }

  return { user, token, login, logout }

},
  {
    persist: {
      paths: ['user', 'token']
    }

  })
