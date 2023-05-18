<script setup lang="ts">
import { ref } from 'vue';

const data = ref(null);
const error = ref(null);

fetch('http://localhost:8000/api/users')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .then((err) => (error.value = err))

</script>

<template>
  <h1>Users: </h1>
  <ul>
    <li v-for="user in data"><RouterLink :to="`chat/${user.id}`">{{ user.name }} - {{ user.email }}</RouterLink></li>
  </ul>
</template>
