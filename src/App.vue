<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from '@/stores/auth'

const store = useAuth();
</script>

<template>
  <div class="h-screen bg-[#1a1a1a]">
    <header>
      <div>
        <nav>
          <div class="flex justify-end gap-6 mr-5 pt-5" v-if="!store.user">
            <RouterLink to="/register">Register</RouterLink>
            <RouterLink to="/login">Login</RouterLink>
          </div>

        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>
<style scoped>
.router-link-active {
  color: #42b883;
}
</style>