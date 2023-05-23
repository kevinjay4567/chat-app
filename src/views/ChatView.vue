<script setup lang="ts">
import { useAuth } from '@/stores/auth';
import { useMessage } from '@/stores/message';
import { ref, type Ref, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import ChatBubble from '@/components/ChatBubble.vue';

const store = useAuth();
const msgStore = useMessage();
const messages = ref();
const msg = ref();
const isLoading = ref(false);
const route = useRoute();

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
})
</script>
<template>
  <div v-if="store.token" class="flex flex-col justify-center items-center h-screen text-xl">
    <div class="h-[75%] max-w-[700px] w-[80%] overflow-y-scroll pt-2.5 pl-3 shadow-inner shadow-orange-800/20">

      <ul class="flex flex-col gap-2">
        <li v-for="message in messages" class="flex flex-col p-1">
          <ChatBubble :message="message.body" :bool="message.user_id === store.user?.id" />
        </li>
      </ul>
    </div>

    <div class="flex gap-3 pt-5">
      <input type="text" placeholder="send message..."
        class="outline-none border-b bg-transparent mt-5 w-[80%] max-w-[700px]" v-model="msg" />

      <button @click="sendMsg" class="bg-orange-600 px-5 rounded-lg">
        <span class="text-lg">Send</span>
      </button>
    </div>

  </div>
</template>