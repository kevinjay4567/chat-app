import { defineStore } from "pinia";
import axios from "axios";
import { ref, type Ref } from "vue";
import Pusher from 'pusher-js'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export const useMessage = defineStore('message', () => {
  const messages = ref(null);
  const newMsg = ref([]);
  const pusher = ref(new Pusher('971a03571bef0feffa2c', {
    cluster: 'us2'
  }));
  const channel = ref(pusher.value.subscribe('send-message'));

  async function getMessages() {
    await axios.get('/api/messages')
      .then(res => {
        messages.value = res.data;
      })
  }

  async function msgBroadcast() {
    await axios.get('/api/messages')
    .then(res => {
      messages.value = res.data;
    })
    channel.value.bind('message-event', function (data: any) {
      newMsg.value.push(data);
    })
  }

  return { getMessages, messages, msgBroadcast, newMsg }
})