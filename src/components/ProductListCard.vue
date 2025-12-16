<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { ProductTags } from '../lib/products-data'

const props = defineProps<{
  id: string
  name: string
  imageUrl: string
  price: number
  tags?: ProductTags
  description?: string
}>()

const formatPrice = (value: number) => value.toLocaleString('ko-KR') + '원'

const flatTags = computed(() => {
  if (!props.tags) return []
  const order: (keyof ProductTags)[] = ['space', 'tone', 'situation', 'mood']
  const combined = order.flatMap((key) => props.tags?.[key] ?? [])
  return Array.from(new Set(combined))
})
</script>

<template>
  <RouterLink :to="`/products/${props.id}`" class="card">
    <div class="thumb">
      <img :src="props.imageUrl" :alt="props.name" />
    </div>
    <div class="body">
      <h3>{{ props.name }}</h3>
      <p v-if="props.description" class="desc">{{ props.description }}</p>
      <p class="price">{{ formatPrice(props.price) }}</p>
      <div v-if="flatTags.length" class="tags">
        <span v-for="tag in flatTags" :key="tag" class="tag">#{{ tag }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  height: 100%;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 38px rgba(15, 23, 42, 0.12);
  border-color: rgba(255, 127, 80, 0.4);
}

.thumb {
  aspect-ratio: 4 / 3;
  background: var(--surface-weak);
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.body {
  padding: 14px 15px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

h3 {
  margin: 0;
  font-size: 1.05rem;
  color: var(--text-strong);
}

.desc {
  margin: 2px 0 0;
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.4;
}

.price {
  margin: 6px 0 2px;
  color: #0ea5e9;
  font-weight: 800;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.tag {
  padding: 6px 8px;
  border-radius: 8px;
  background: var(--surface-weak);
  color: var(--text-muted);
  font-weight: 700;
  font-size: 0.9rem;
}
</style>
