<script setup lang="ts">
import { useFriend } from '@/stores/friend'
import { useAuth } from '@/stores/auth'
import { watchEffect, onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import type IUser from '@/interfaces/IUser'

const friendStore = useFriend()
const authStore = useAuth()
const friends: Ref<Array<IUser>> = ref([])

onMounted(async () => {
  await friendStore.getFriends(authStore.token)
})

watchEffect(() => {
  friends.value = friendStore.friends
})
</script>
<template>
  <h1>{{ authStore.user?.name }} Friends:</h1>
  <ul>
    <li v-for="friend in friends" :key="friend.id">
      <RouterLink
        v-if="friend.id === authStore.user?.id"
        :to="{ name: 'privateChat', params: { id: friend.id } }"
      >
        {{ friend.name }}
      </RouterLink>
      <RouterLink v-else :to="{ name: 'privateChat', params: { id: friend.id } }">
        {{ friend.name }}
      </RouterLink>
    </li>
  </ul>
</template>
