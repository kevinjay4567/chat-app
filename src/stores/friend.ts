import { defineStore } from 'pinia'
import axios from '@/utils/axios'
import { ref, type Ref } from 'vue'
import type IUser from '@/interfaces/IUser'

export const useFriend = defineStore(
  'friend',
  () => {
    const friends: Ref<Array<IUser>> = ref([])

    async function getFriends(token: string) {
      await axios.get('/sanctum/csrf-cookie').then(() => {
        axios
          .get('/api/friends', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
          .then((res) => {
            friends.value = res.data
          })
      })
    }

    return { friends, getFriends }
  },
  {
    persist: {
      paths: ['friends']
    }
  }
)
