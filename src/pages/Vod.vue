<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageContainer from '../components/PageContainer.vue'
import PageHeader from '../components/PageHeader.vue'
import { allLiveItems } from '../lib/home-data'
import { getLiveStatus } from '../lib/live/utils'

const route = useRoute()
const id = computed(() => {
  const value = route.params.id
  return Array.isArray(value) ? value[0] : value
})

const item = computed(() => {
  if (!id.value) {
    return undefined
  }
  return allLiveItems.find((entry) => entry.id === id.value)
})

const status = computed(() => {
  if (!item.value) {
    return undefined
  }
  return getLiveStatus(item.value, new Date())
})

const formatDateTime = (value: string) => {
  const date = new Date(value)
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const dayLabel = dayNames[date.getDay()]
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}.${month}.${day} (${dayLabel}) ${hours}:${minutes}`
}
</script>

<template>
  <PageContainer>
    <PageHeader title="VOD 다시보기" eyebrow="DESKIT VOD" />

    <div v-if="!item" class="empty-state">
      <p>VOD를 찾을 수 없습니다.</p>
      <RouterLink to="/live" class="link-back">라이브 일정으로 돌아가기</RouterLink>
    </div>

    <div v-else class="vod-layout">
      <div class="vod-player">
        <div class="vod-player__frame">
          <span class="vod-player__label">VOD 플레이어</span>
        </div>
        <a
          v-if="item.vodUrl"
          class="vod-player__button vod-player__button--primary"
          :href="item.vodUrl"
          target="_blank"
          rel="noopener"
        >
          VOD 재생
        </a>
        <button v-else class="vod-player__button" type="button" aria-disabled="true" disabled>
          VOD 준비 중
        </button>
      </div>

      <aside class="vod-info">
        <h3 class="vod-info__title">{{ item.title }}</h3>
        <p v-if="item.description" class="vod-info__desc">{{ item.description }}</p>
        <p v-if="item.sellerName" class="vod-info__seller">{{ item.sellerName }}</p>
        <div class="vod-info__meta">
          <div>
            <span class="vod-info__label">시작</span>
            <span class="vod-info__value">{{ formatDateTime(item.startAt) }}</span>
          </div>
          <div>
            <span class="vod-info__label">종료</span>
            <span class="vod-info__value">{{ formatDateTime(item.endAt) }}</span>
          </div>
        </div>
        <span class="vod-info__status">{{ status }}</span>
      </aside>
    </div>
  </PageContainer>
</template>

<style scoped>
.vod-layout {
  display: grid;
  gap: 24px;
}

.vod-player {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.vod-player__frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #10131b;
  border-radius: 18px;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 700;
}

.vod-player__label {
  opacity: 0.8;
}

.vod-player__button {
  border: 1px solid var(--border-color);
  background: var(--surface);
  color: var(--text-strong);
  font-weight: 800;
  border-radius: 12px;
  padding: 12px 16px;
  cursor: not-allowed;
  text-align: center;
}

.vod-player__button--primary {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
  cursor: pointer;
}

.vod-info {
  border: 1px solid var(--border-color);
  background: var(--surface);
  border-radius: 18px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.vod-info__title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 800;
}

.vod-info__desc {
  margin: 0;
  color: var(--text-muted);
}

.vod-info__seller {
  margin: 0;
  font-weight: 700;
  color: var(--text-strong);
}

.vod-info__meta {
  display: grid;
  gap: 8px;
}

.vod-info__label {
  display: block;
  font-size: 0.85rem;
  color: var(--text-soft);
}

.vod-info__value {
  font-weight: 700;
  color: var(--text-strong);
}

.vod-info__status {
  align-self: flex-start;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--surface-weak);
  color: var(--text-strong);
  font-weight: 700;
  font-size: 0.85rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--text-muted);
}

.link-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: var(--primary-color);
}

@media (min-width: 960px) {
  .vod-layout {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
    align-items: start;
  }
}
</style>
