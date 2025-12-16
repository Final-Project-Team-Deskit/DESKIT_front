<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { productsData } from '../lib/products-data'
import type { ProductTags } from '../lib/products-data'

const route = useRoute()
const productId = computed(() => (Array.isArray(route.params.id) ? route.params.id[0] : route.params.id))

const product = computed(() => productsData.find((item) => item.id === productId.value))

type TagCategoryKey = keyof ProductTags

const tagCategories: { key: TagCategoryKey; label: string }[] = [
  { key: 'space', label: '공간' },
  { key: 'tone', label: '톤' },
  { key: 'situation', label: '상황' },
  { key: 'mood', label: '무드' },
]

const getTagsByCategory = (category: TagCategoryKey) => product.value?.tags[category] ?? []

const tagGroups = computed(() =>
  tagCategories
    .map((category) => ({
      ...category,
      tags: getTagsByCategory(category.key),
    }))
    .filter((group) => group.tags.length),
)
</script>

<template>
  <main class="page">
    <div class="page__inner detail">
      <RouterLink to="/products" class="back">← 상품 목록으로</RouterLink>

      <div v-if="product" class="card">
        <div class="thumb">
          <img :src="product.imageUrl" :alt="product.name" />
        </div>
        <div class="content">
          <p class="eyebrow">DESKIT PRODUCT</p>
          <h1>{{ product.name }}</h1>
          <p class="price">{{ product.price.toLocaleString('ko-KR') }}원</p>
          <p class="desc" v-if="product.description">{{ product.description }}</p>
          <div class="tags">
            <div v-for="group in tagGroups" :key="group.key" class="tag-group">
              <span class="tag-label">{{ group.label }}</span>
              <span v-for="tag in group.tags" :key="tag" class="tag">#{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty">
        <p>상품을 찾을 수 없습니다.</p>
        <RouterLink to="/products" class="back-link">상품 목록으로 돌아가기</RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.detail {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.back {
  color: var(--text-muted);
  font-weight: 700;
}

.card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
}

.thumb {
  background: var(--surface-weak);
  min-height: 260px;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.eyebrow {
  margin: 0;
  color: var(--text-soft);
  font-weight: 800;
  letter-spacing: 0.04em;
}

h1 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 800;
}

.price {
  margin: 0;
  color: #0ea5e9;
  font-weight: 800;
  font-size: 1.2rem;
}

.desc {
  margin: 4px 0 0;
  color: var(--text-muted);
  line-height: 1.5;
}

.tags {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.tag-label {
  font-weight: 800;
  color: var(--text-soft);
  margin-right: 4px;
}

.tag {
  padding: 6px 8px;
  background: var(--surface-weak);
  border-radius: 8px;
  color: var(--text-muted);
  font-weight: 700;
  font-size: 0.9rem;
}

.empty {
  padding: 24px;
  border-radius: 14px;
  background: #fff;
  border: 1px dashed var(--border-color);
  text-align: center;
  color: var(--text-muted);
}

.back-link {
  display: inline-block;
  margin-top: 8px;
  font-weight: 700;
  color: var(--primary-color);
}
</style>
