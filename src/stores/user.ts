import { defineStore } from "pinia";
import axios from "@/utils/axios";
import { ref, type Ref } from "vue";

export const useUser = defineStore('user', () => {
  const user: Ref<any> = ref([]);

  async function getUserById(messages: Array<any>) {
    messages.forEach(async message => {
     await axios.get(`/api/users/${message.user_receive}`) 
     .then(res => {
      user.value.push(res.data)
     })
    });
  }

  return { user, getUserById }
})