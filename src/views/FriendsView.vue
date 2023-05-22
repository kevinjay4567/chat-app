<script setup lang="ts">
import { useFriend } from '@/stores/friend';
import { useAuth } from '@/stores/auth';
import { watchEffect, onMounted, ref } from 'vue';

const friendStore = useFriend();
const authStore = useAuth();
const friends = ref();

onMounted(async () => {
  await friendStore.getFriends(authStore.token);
})

watchEffect(() => {
  friends.value = friendStore.friends;
})
</script>
<template>
  <h1> {{ authStore.user?.name }} Friends: </h1>
  <ul>
    <li v-for="friend in friends">
      <RouterLink v-if="friend.user_id === authStore.user?.id"
        :to="{ name: 'privateChat', params: { id: friend.friend_id } }"> {{ friend.friend_name }} </RouterLink>
      <RouterLink v-else :to="{ name: 'privateChat', params: { id: friend.user_id } }">
        {{ friend.user_name }}
      </RouterLink>
    </li>
  </ul>
</template>