<script setup lang="ts">
import { computed, ref } from 'vue'
import { setupsData } from '../lib/setups-data'
import SetupCard from '../components/SetupCard.vue'

const sortBy = ref('popular')

const sortedSetups = computed(() => {
  const list = [...setupsData]
  switch (sortBy.value) {
    case 'newest':
      return list.sort((a, b) => new Date(b.created_dt).getTime() - new Date(a.created_dt).getTime())
    case 'items':
      return list.sort((a, b) => b.product_ids.length - a.product_ids.length)
    case 'popular':
    default:
      return list
  }
})
</script>

<template>
  <main class="page setup-list">
    <div class="page__inner">
      <header class="header">
        <div>
          <h1 class="title">셋업 모음</h1>
          <p class="subtitle">인기 데스크 셋업을 둘러보고 마음에 드는 구성을 찾아보세요.</p>
        </div>
        <div class="controls">
          <label for="setup-sort" class="sort-label">정렬</label>
          <select id="setup-sort" v-model="sortBy" class="sort-select">
            <option value="popular">인기순</option>
            <option value="newest">최신순</option>
            <option value="items">상품 많이 포함</option>
          </select>
        </div>
      </header>

      <section class="grid">
        <SetupCard
          v-for="setup in sortedSetups"
          :key="setup.setup_id"
          :id="String(setup.setup_id)"
          :title="setup.title"
          :description="setup.short_desc"
          :image-url="setup.imageUrl"
        />
      </section>
    </div>
  </main>
</template>

<style scoped>
.setup-list {
  padding: 16px 0 32px;
}

.page__inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.eyebrow {
  margin: 0;
  color: var(--text-soft);
  font-weight: 800;
  letter-spacing: 0.04em;
}

.title {
  margin: 6px 0 6px;
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: -0.3px;
}

.subtitle {
  margin: 0;
  color: var(--text-muted);
  font-size: 1rem;
}

.controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-label {
  color: var(--text-muted);
  font-weight: 700;
}

.sort-select {
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: #fff;
  font-weight: 700;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

@media (max-width: 640px) {
  .page__inner {
    padding: 0 16px;
  }

  .header {
    align-items: flex-start;
  }
}
</style>
