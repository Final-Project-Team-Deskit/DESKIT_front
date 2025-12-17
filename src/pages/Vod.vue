<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageContainer from '../components/PageContainer.vue'
import PageHeader from '../components/PageHeader.vue'
import { liveItems } from '../lib/live/data'
import { getLiveStatus } from '../lib/live/utils'
import { useNow } from '../lib/live/useNow'
import { getProductsForLive, type LiveProductItem } from '../lib/live/detail'

const route = useRoute()
const router = useRouter()
const { now } = useNow(1000)

const vodId = computed(() => {
  const value = route.params.id
  return Array.isArray(value) ? value[0] : value
})

const vodItem = computed(() => {
  if (!vodId.value) {
    return undefined
  }
  return liveItems.find((entry) => entry.id === vodId.value)
})

const status = computed(() => {
  if (!vodItem.value) {
    return undefined
  }
  return getLiveStatus(vodItem.value, now.value)
})

const statusLabel = computed(() => {
  if (status.value === 'LIVE') {
    return 'LIVE'
  }
  if (status.value === 'UPCOMING') {
    return '예정'
  }
  return 'VOD'
})

const statusBadgeClass = computed(() => {
  if (status.value === 'LIVE') {
    return 'status-badge--live'
  }
  if (status.value === 'UPCOMING') {
    return 'status-badge--upcoming'
  }
  return 'status-badge--vod'
})

const products = computed<LiveProductItem[]>(() => {
  if (!vodItem.value) {
    return []
  }
  return getProductsForLive(vodItem.value.id)
})

const formatPrice = (price: number) => {
  return `${price.toLocaleString('ko-KR')}원`
}

const formatSchedule = (startAt: string, endAt: string) => {
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']
  const start = new Date(startAt)
  const end = new Date(endAt)
  const year = start.getFullYear()
  const month = String(start.getMonth() + 1).padStart(2, '0')
  const day = String(start.getDate()).padStart(2, '0')
  const dayLabel = dayNames[start.getDay()]
  const startHours = String(start.getHours()).padStart(2, '0')
  const startMinutes = String(start.getMinutes()).padStart(2, '0')
  const endHours = String(end.getHours()).padStart(2, '0')
  const endMinutes = String(end.getMinutes()).padStart(2, '0')
  return `${year}.${month}.${day} (${dayLabel}) ${startHours}:${startMinutes} ~ ${endHours}:${endMinutes}`
}

const isEmbedUrl = (url: string) => {
  return url.includes('youtube.com/embed') || url.includes('player.vimeo.com')
}

const handleProductClick = (productId: string) => {
  router.push({ name: 'product-detail', params: { id: productId } })
}

watch(
  [status, vodItem],
  ([nextStatus, nextItem]) => {
    if (nextStatus === 'LIVE' && nextItem) {
      router.replace({ name: 'live-detail', params: { id: nextItem.id } })
    }
  },
  { immediate: true },
)
</script>

<template>
  <PageContainer>
    <PageHeader title="VOD 다시보기" eyebrow="DESKIT VOD" />

    <div v-if="!vodItem" class="empty-state">
      <p>VOD를 찾을 수 없습니다.</p>
      <RouterLink to="/live" class="link-back">라이브 일정으로 돌아가기</RouterLink>
    </div>

    <section v-else class="vod-grid">
      <aside class="panel panel--products">
        <div class="panel__header">
          <h3 class="panel__title">라이브 상품</h3>
          <span class="panel__count">{{ products.length }}개</span>
        </div>
        <div v-if="!products.length" class="panel__empty">상품이 없습니다.</div>
        <div v-else class="product-list">
          <button
            v-for="product in products"
            :key="product.id"
            type="button"
            class="product-card"
            :class="{ 'product-card--sold-out': product.isSoldOut }"
            @click="handleProductClick(product.id)"
          >
            <img class="product-card__thumb" :src="product.imageUrl" :alt="product.name" />
            <div class="product-card__info">
              <p class="product-card__name">{{ product.name }}</p>
              <p class="product-card__price">{{ formatPrice(product.price) }}</p>
              <span v-if="product.isSoldOut" class="product-card__badge">품절</span>
            </div>
          </button>
        </div>
      </aside>

      <section class="panel panel--player">
        <div class="player-meta">
          <div class="status-row">
            <span class="status-badge" :class="statusBadgeClass">{{ statusLabel }}</span>
            <span v-if="vodItem" class="status-schedule">
              {{ formatSchedule(vodItem.startAt, vodItem.endAt) }}
            </span>
          </div>
          <h3 class="player-title">{{ vodItem.title }}</h3>
          <p v-if="vodItem.sellerName" class="player-seller">{{ vodItem.sellerName }}</p>
          <p v-if="vodItem.description" class="player-desc">{{ vodItem.description }}</p>
        </div>

        <div class="player-frame">
          <span v-if="status === 'UPCOMING'" class="player-frame__label">아직 시작 전입니다</span>
          <iframe
            v-else-if="vodItem.vodUrl && isEmbedUrl(vodItem.vodUrl)"
            class="player-embed"
            :src="vodItem.vodUrl"
            title="VOD 플레이어"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
          <video v-else-if="vodItem.vodUrl" class="player-video" :src="vodItem.vodUrl" controls />
          <span v-else class="player-frame__label">VOD 준비 중</span>
        </div>
      </section>
    </section>
  </PageContainer>
</template>

<style scoped>
.vod-grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 18px;
  align-items: start;
}

.panel {
  border: 1px solid var(--border-color);
  background: var(--surface);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel__title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-strong);
}

.panel__count {
  font-weight: 700;
  color: var(--text-soft);
}

.panel__empty {
  color: var(--text-muted);
  padding: 10px 0;
}

.panel--products {
  max-height: clamp(360px, 70vh, 720px);
  overflow: hidden;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  padding-right: 4px;
}

.product-card {
  border: 1px solid var(--border-color);
  background: var(--surface);
  border-radius: 14px;
  padding: 10px;
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 12px;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.product-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 10px 22px rgba(119, 136, 115, 0.12);
  transform: translateY(-1px);
}

.product-card--sold-out {
  opacity: 0.7;
}

.product-card__thumb {
  width: 64px;
  height: 64px;
  border-radius: 10px;
  object-fit: cover;
}

.product-card__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-card__name {
  margin: 0;
  font-weight: 700;
  color: var(--text-strong);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-card__price {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.product-card__badge {
  align-self: flex-start;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--surface-weak);
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 700;
}

.panel--player {
  gap: 16px;
}

.player-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.status-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 0.85rem;
  background: var(--surface-weak);
  color: var(--text-strong);
}

.status-badge--live {
  background: var(--live-color-soft);
  color: var(--live-color);
}

.status-badge--upcoming {
  background: var(--hover-bg);
  color: var(--primary-color);
}

.status-badge--vod {
  background: var(--border-color);
  color: var(--text-muted);
}

.status-schedule {
  color: var(--text-muted);
  font-weight: 700;
}

.player-title {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 800;
}

.player-seller {
  margin: 0;
  font-weight: 700;
  color: var(--text-strong);
}

.player-desc {
  margin: 0;
  color: var(--text-muted);
}

.player-frame {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #10131b;
  border-radius: 16px;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 700;
  overflow: hidden;
}

.player-frame__label {
  opacity: 0.8;
}

.player-embed,
.player-video {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
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
  .vod-grid {
    grid-template-columns: 340px 1fr;
    align-items: start;
  }
}

@media (max-width: 1080px) {
  .vod-grid {
    grid-template-columns: 1fr;
  }

  .panel--player {
    order: 1;
  }

  .panel--products {
    order: 2;
  }
}

@media (max-width: 640px) {
  .product-card {
    grid-template-columns: 1fr;
  }

  .product-card__thumb {
    width: 100%;
    height: 160px;
  }
}
</style>
