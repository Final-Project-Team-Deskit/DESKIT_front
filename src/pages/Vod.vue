<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = computed(() => {
  const value = route.params.id
  return Array.isArray(value) ? value[0] : value
})
</script>

<template>
  <main class="page">
    <div class="page__inner">
      <h2 class="section-title">VOD 다시보기</h2>
      <p>VOD ID: {{ id }}</p>
    </div>
  </main>
</template>
