import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { pusher } from "@/utils/pusher";
import axios from '@/utils/axios'
import type IMessage from "@/interfaces/IMessage";

export const useMessage = defineStore('message', () => {
  const messages: Ref<Array<IMessage>> = ref([]);

  async function getMessages(id: string | string[], token: string) {
    await axios.get('/sanctum/csrf-cookie').then(() => {
      axios.post('/api/messages', {
        friend: Number(id),
      },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then(res => {
          messages.value = res.data;
        })
    })
  }

  async function sendMessage(msg: string, token: string, friend: string | string[]) {
    if (pusher) {
      pusher.unsubscribe('send-message');
    }

    await axios.get('/sanctum/csrf-cookie').then(() => {
      axios.post('/api/send', {
        body: msg,
        user_receive: Number(friend)
      },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
    })
    let channel = pusher.subscribe('send-message');

    channel.bind('message-event', function (data: IMessage) {
      messages.value.push(data);
    })

  }

  return { getMessages, messages, sendMessage }
})