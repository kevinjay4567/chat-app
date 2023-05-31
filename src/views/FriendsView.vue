<script setup lang="ts">
import { useFriend } from '@/stores/friend'
import { useAuth } from '@/stores/auth'
import { useUser } from '@/stores/user'
import { watchEffect, onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import type IUser from '@/interfaces/IUser'

const friendStore = useFriend()
const authStore = useAuth()
const friends: Ref<Array<IUser>> = ref([])
const search = ref('')
const userStore = useUser()

onMounted(async () => {
  await friendStore.getFriends(authStore.token)
  await userStore.getAllUsers()
})

watchEffect(() => {
  friends.value = friendStore.friends
  search.value
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
  <input type="text" name="search" v-model="search" class="text-black" />
  <ul>
    <li v-for="user in userStore.users">
      <span v-if="search[0] === user.name[0]">{{ user.id }} - {{ user.name }}</span>
    </li>
  </ul>
</template>
