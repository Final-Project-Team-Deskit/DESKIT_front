<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  items: { label: string; to: string }[]
}>()
</script>

<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <RouterLink
      v-for="(item, index) in items"
      :key="item.to + index"
      :to="item.to"
      class="crumb"
    >
      <span>{{ item.label }}</span>
      <span v-if="index < items.length - 1" class="separator">/</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.95rem;
}

.crumb {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
  transition: color 0.2s ease;
}

.crumb:hover {
  color: var(--text-strong);
}

.separator {
  color: var(--border-color);
}
</style>
