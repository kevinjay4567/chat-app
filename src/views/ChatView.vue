<template>
  <h1 v-if="user">{{ user.name }} messages: </h1>
  <ul>
    <li v-for="message in messages">{{ message.body }}</li>
  </ul>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const user = ref(null);
const messages = ref(null);
const route = useRoute();

fetch('http://localhost:8000/api/messages/' + route.params.id)
  .then(res => res.json())
  .then(json => messages.value = json)

fetch('http://localhost:8000/api/users/' + route.params.id)
  .then(res => res.json())
  .then(json => user.value = json) 

</script>
