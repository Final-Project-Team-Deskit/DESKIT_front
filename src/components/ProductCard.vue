<script setup lang="ts">
const props = defineProps<{
  id?: string
  name: string
  imageUrl: string
  price: number
  discountRate?: number
}>()

const formatPrice = (value: number) => {
  return value.toLocaleString('ko-KR') + '원'
}
</script>

<template>
  <article class="card">
    <div class="thumb">
      <img :src="props.imageUrl" :alt="props.name" />
      <span v-if="props.discountRate" class="badge">-{{ props.discountRate }}%</span>
    </div>
    <div class="body">
      <h3>{{ props.name }}</h3>
      <p class="price">{{ formatPrice(props.price) }}</p>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 380px;
  background: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.1);
}

.thumb {
  position: relative;
  aspect-ratio: 16 / 10;
  background: var(--surface-weak);
  width: 100%;
  overflow: hidden;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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

.body {
  padding: 12px 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

h3 {
  margin: 0;
  font-size: 1.05rem;
  color: var(--text-strong);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price {
  margin: 0;
  color: #0ea5e9;
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
