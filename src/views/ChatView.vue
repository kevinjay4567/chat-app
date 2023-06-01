<script setup lang="ts">
import { useAuth } from '@/stores/auth'
import { useMessage } from '@/stores/message'
import { ref, type Ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ChatBubble from '@/components/ChatBubble.vue'
import type IMessage from '@/interfaces/IMessage'

const store = useAuth()
const msgStore = useMessage()
const messages: Ref<Array<IMessage>> = ref([])
const msg = ref()
const isLoading = ref(false)
const route = useRoute()

async function sendMsg() {
  isLoading.value = true
  await msgStore.sendMessage(msg.value, store.token, route.params.id)
  msg.value = ''
  isLoading.value = false
}

onMounted(async () => {
  await msgStore.getMessages(route.params.id, store.token)
})

watchEffect(async () => {
  messages.value = msgStore.messages
})
</script>
<template>
  <div v-if="store.token" class="flex flex-col justify-center items-center h-screen text-xl">
    <div
      class="h-[75%] max-w-[700px] w-[80%] overflow-y-scroll pt-2.5 pl-3 shadow-inner shadow-orange-800/20"
    >
      <ul class="flex flex-col gap-2">
        <li v-for="message in messages" class="flex flex-col p-1" :key="message.id">
          <ChatBubble :message="message.body" :bool="message.user_receive.id === store.user?.id" />
        </li>
      </ul>
    </div>

    <div class="flex gap-3 pt-5 w-full justify-center">
      <textarea
        type="text"
        placeholder="send message..."
        class="outline-none border border-gray-500 bg-transparent mt-5 w-[70%] max-w-[600px] resize-none rounded-lg"
        v-model="msg"
      />

      <button @click="sendMsg" class="bg-orange-600 rounded-lg self-center mt-4 p-3 text-center">
        <span class="text-sm">Send</span>
      </button>
    </div>
  </div>
</template>
