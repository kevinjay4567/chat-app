<script setup lang="ts">
import { useAuth } from '@/stores/auth';
import { useMessage } from '@/stores/message';
import { useUser } from '@/stores/user';
import { watchEffect } from 'vue';
import { ref } from 'vue';

const store = useAuth();
const msgStore = useMessage();
const userStore = useUser();
const messages = ref();
const newMsg = ref();
const user_receive = ref();

watchEffect(async () => {
  await msgStore.getMessages();
  messages.value = msgStore.messages;
  await userStore.getUserById(messages.value);
  msgStore.msgBroadcast();
  user_receive.value = userStore.user;
  newMsg.value = msgStore.newMsg;
})
</script>
<template>
  <div v-if="store.token" class="flex flex-col justify-center items-center h-screen text-xl">
    <h1 class="pb-2">{{ store.user?.name }}'s Chat</h1>
    <div class="h-[75%] max-w-[700px] w-[80%] overflow-y-scroll border-t border-l pt-2.5 pl-3">
      <ul>
        <li v-for="(message, index) in messages" class="flex gap-2">
          <h1 class="text-red-400">{{ store.user?.name }}</h1>
          <p v-if="store.user?.id === message.user_id">{{ message.body }} -> {{ user_receive[index].name }}</p>
          <p v-else>{{ message.body }} &lt- {{ message.name_send }}</p>
        </li>
      </ul>
      <ul>
        <li v-for="message in newMsg" class="flex gap-2">
          <h1 class="text-red-400">{{ store.user?.name }}</h1>
          <p v-if="store.user?.name === message.user_send">{{ message.message }} -> {{ message.user_receive }}</p>
          <p v-else>{{ message.message }} &lt- {{ message.user_send }}</p>
        </li>
      </ul>
    </div>

    <input type="text" placeholder="send message..." class="outline-none border-b bg-transparent mt-5 w-[80%] max-w-[700px]" />

  </div>
</template>