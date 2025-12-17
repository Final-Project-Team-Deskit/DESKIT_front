<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  maxWidth?: number
}>()

const max = computed(() => `${props.maxWidth ?? 1200}px`)
</script>

<template>
  <main class="page">
    <div class="page__inner" :style="{ '--max': max }">
      <slot />
    </div>
  </main>
</template>

<style scoped>
.page {
  padding: 20px 0 72px;
}

.page__inner {
  --max: 1200px;
  max-width: var(--max, 1200px);
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

@media (max-width: 640px) {
  .page {
    padding: 16px 0 60px;
  }

  .page__inner {
    padding: 0 16px;
    gap: 12px;
  }
}
</style>
