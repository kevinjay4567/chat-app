<script setup lang="ts">
import { useAuth } from '@/stores/auth';
import { useMessage } from '@/stores/message';
import { useUser } from '@/stores/user';
import { useFriend } from '@/stores/friend';
import { ref, type Ref, onMounted, watchEffect } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import ChatBubble from '@/components/ChatBubble.vue';

const store = useAuth();
const friendStore = useFriend();
const msgStore = useMessage();
const userStore = useUser();
const messages = ref();
const newMsg = ref();
const user_receive: Ref<Array<any>> = ref([]);
const msg = ref();
const isLoading = ref(false);
const route = useRoute();

onBeforeRouteLeave((to, from, next) => {
  newMsg.value = [];
  msgStore.newMsg = [];
  next()
})

async function sendMsg() {
  isLoading.value = true;
  await msgStore.sendMessage(msg.value, store.token, route.params.id);
  msg.value = '';
  isLoading.value = false;
}

onMounted(async () => {
  await msgStore.getMessages(route.params.id, store.token);
})

watchEffect(async () => {
  messages.value = msgStore.messages;
  user_receive.value = userStore.user;
  newMsg.value = msgStore.newMsg;
})
</script>
<template>
  <div v-if="store.token" class="flex flex-col justify-center items-center h-screen text-xl">
    <div class="h-[75%] max-w-[700px] w-[80%] overflow-y-scroll border-t border-l pt-2.5 pl-3">
      <ul class="flex flex-col gap-2">
        <li v-for="message in messages" class="flex flex-col p-1">
          <ChatBubble :message="message.body" :bool="message.user_id === store.user?.id" />
        </li>
      </ul>
      <ul>
        <li v-for="message in newMsg" class="flex gap-2">
          <p v-if="store.user?.id === message.user_send">{{ message.message }}</p>
          <p v-else-if="store.user?.id === message.user_receive">{{ message.message }}</p>
        </li>
      </ul>
    </div>

    <div class="flex gap-3">
      <input type="text" placeholder="send message..."
        class="outline-none border-b bg-transparent mt-5 w-[80%] max-w-[700px]" v-model="msg" />

      <button @click="sendMsg" class="bg-orange-400 px-3 rounded-lg">
        <span class="text-lg">Send</span>
      </button>
    </div>

  </div>
</template>