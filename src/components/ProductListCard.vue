<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { ProductTags } from '../lib/products-data'

const props = defineProps<{
  id: string
  name: string
  imageUrl: string
  price: number
  originalPrice?: number
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

const discountRate = computed(() => {
  if (!props.originalPrice || props.originalPrice <= props.price) return 0
  return Math.round((1 - props.price / props.originalPrice) * 100)
})
</script>

<template>
  <RouterLink :to="`/products/${props.id}`" class="card">
    <div class="thumb">
      <img :src="props.imageUrl" :alt="props.name" />
      <span v-if="discountRate > 0" class="badge">-{{ discountRate }}%</span>
    </div>
    <div class="body">
      <h3>{{ props.name }}</h3>
      <p v-if="props.description" class="desc">{{ props.description }}</p>
      <div class="price-row">
        <p class="price">{{ formatPrice(props.price) }}</p>
        <p v-if="discountRate > 0 && props.originalPrice" class="original">{{ formatPrice(props.originalPrice) }}</p>
      </div>
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
  position: relative;
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

.price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.original {
  margin: 0;
  color: var(--text-soft);
  font-size: 0.95rem;
  text-decoration: line-through;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--primary-color);
  color: #fff;
  padding: 6px 10px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.85rem;
  box-shadow: 0 10px 18px rgba(255, 127, 80, 0.3);
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
