import { defineStore } from 'pinia'
import axios from '@/utils/axios'
import { ref, type Ref } from 'vue'
import IUser from '@/interfaces/IUser'

export const useUser = defineStore('user', () => {
  const user: Ref<any> = ref([])
  const users: Ref<Array<IUser>> = ref([])

  async function getUserById(messages: Array<any>) {
    messages.forEach(async (message) => {
      await axios.get(`/api/users/${message.user_receive}`).then((res) => {
        user.value.push(res.data)
      })
    })
  }

  async function getAllUsers() {
    await axios.get('/api/users').then((res) => {
      users.value = res.data
    })
  }

  return { user, getUserById, getAllUsers, users }
})
