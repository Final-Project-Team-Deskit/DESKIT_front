<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageContainer from '../components/PageContainer.vue'
import PageHeader from '../components/PageHeader.vue'
import { liveItems } from '../lib/live/data'
import {
  filterLivesByDay,
  getDayWindow,
  getLiveStatus,
  sortLivesByStartAt,
} from '../lib/live/utils'
import type { LiveItem } from '../lib/live/types'
import { useNow } from '../lib/live/useNow'

const route = useRoute()
const router = useRouter()
const today = new Date()
const { now } = useNow(1000)

const liveId = computed(() => {
  const id = route.params.id
  return Array.isArray(id) ? id[0] : id
})

const dayWindow = computed(() => getDayWindow(today))
const selectedDay = ref(dayWindow.value[3])

const selectedLives = computed(() => {
  return sortLivesByStartAt(filterLivesByDay(liveItems, selectedDay.value))
})

const liveDetail = computed(() => {
  if (!liveId.value) {
    return undefined
  }
  return liveItems.find((item) => item.id === liveId.value)
})

const detailStatus = computed(() => {
  if (!liveDetail.value) {
    return undefined
  }
  return getLiveStatus(liveDetail.value, now.value)
})

const isToday = (day: Date) => {
  return (
    day.getFullYear() === today.getFullYear() &&
    day.getMonth() === today.getMonth() &&
    day.getDate() === today.getDate()
  )
}

const isSelectedDay = (day: Date) => {
  return (
    day.getFullYear() === selectedDay.value.getFullYear() &&
    day.getMonth() === selectedDay.value.getMonth() &&
    day.getDate() === selectedDay.value.getDate()
  )
}

const formatDayLabel = (day: Date) => {
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']
  const label = isToday(day) ? '오늘' : dayNames[day.getDay()]
  const date = `${day.getMonth() + 1}.${day.getDate()}`

  return { label, date }
}

const formatTime = (value: string) => {
  const time = new Date(value)
  const hours = time.getHours().toString().padStart(2, '0')
  const minutes = time.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

const getStatus = (item: LiveItem) => {
  return getLiveStatus(item, now.value)
}

const selectDay = (day: Date) => {
  selectedDay.value = day
}

const handleAction = (item: LiveItem) => {
  const status = getStatus(item)
  if (status === 'LIVE') {
    router.push({ name: 'live-detail', params: { id: item.id } })
    return
  }
  if (status === 'ENDED') {
    router.push({ name: 'vod', params: { id: item.id } })
  }
}

const handleDetailAction = () => {
  if (!liveDetail.value || !detailStatus.value) {
    return
  }
  if (detailStatus.value === 'LIVE') {
    router.push({ name: 'live-detail', params: { id: liveDetail.value.id } })
    return
  }
  if (detailStatus.value === 'ENDED') {
    router.push({ name: 'vod', params: { id: liveDetail.value.id } })
  }
}
</script>

<template>
  <PageContainer>
    <PageHeader :title="liveId ? '라이브 상세' : '라이브 일정'" eyebrow="DESKIT LIVE" />

    <template v-if="liveId">
      <div v-if="liveDetail" class="live-detail">
        <img
          class="live-detail__thumb"
          :src="liveDetail.thumbnailUrl"
          :alt="liveDetail.title"
        />
        <div class="live-detail__body">
          <h3 class="live-detail__title">{{ liveDetail.title }}</h3>
          <p class="live-detail__desc">{{ liveDetail.description }}</p>
          <p class="live-detail__status">상태: {{ detailStatus }}</p>
          <button
            v-if="detailStatus === 'LIVE'"
            type="button"
            class="live-detail__cta"
            @click="handleDetailAction"
          >
            입장하기
          </button>
          <button
            v-else-if="detailStatus === 'ENDED'"
            type="button"
            class="live-detail__cta"
            @click="handleDetailAction"
          >
            VOD 다시보기
          </button>
          <span v-else class="live-detail__upcoming">예정</span>
        </div>
      </div>
      <p v-else class="empty-state">해당 라이브를 찾을 수 없습니다.</p>
    </template>

    <template v-else>
      <div class="date-strip">
        <button
          v-for="day in dayWindow"
          :key="day.toISOString()"
          type="button"
          class="date-pill"
          :class="{ 'date-pill--active': isSelectedDay(day) }"
          @click="selectDay(day)"
        >
          <span class="date-pill__label">{{ formatDayLabel(day).label }}</span>
          <span class="date-pill__date">{{ formatDayLabel(day).date }}</span>
        </button>
      </div>

      <div class="live-list">
        <div v-if="!selectedLives.length" class="empty-state">
          선택한 날짜에 예정된 라이브가 없습니다.
        </div>
        <div v-else class="live-list__items">
          <article v-for="item in selectedLives" :key="item.id" class="live-row">
            <div class="live-row__time">{{ formatTime(item.startAt) }}</div>
            <div class="live-row__card">
              <img class="live-row__thumb" :src="item.thumbnailUrl" :alt="item.title" />
              <div class="live-row__meta">
                <h3 class="live-row__title">{{ item.title }}</h3>
                <p v-if="item.sellerName" class="live-row__seller">{{ item.sellerName }}</p>
              </div>
              <button
                type="button"
                class="live-row__cta"
                :disabled="getStatus(item) === 'UPCOMING'"
                :aria-disabled="getStatus(item) === 'UPCOMING'"
                @click="handleAction(item)"
              >
                <span v-if="getStatus(item) === 'LIVE'">입장하기</span>
                <span v-else-if="getStatus(item) === 'ENDED'">VOD 다시보기</span>
                <span v-else>예정</span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </template>
  </PageContainer>
</template>

<style scoped>
.date-strip {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 6px 2px 18px;
  margin-bottom: 18px;
}

.date-pill {
  border: 1px solid var(--border-color);
  background: var(--surface);
  border-radius: 12px;
  padding: 10px 12px;
  min-width: 76px;
  display: grid;
  gap: 4px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.date-pill__label {
  font-weight: 800;
  font-size: 0.9rem;
  color: var(--text-strong);
}

.date-pill__date {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.date-pill--active {
  border-color: var(--primary-color);
  box-shadow: 0 10px 22px rgba(119, 136, 115, 0.12);
  transform: translateY(-1px);
}

.live-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.live-list__items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.live-row {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 12px;
  align-items: center;
}

.live-row__time {
  font-weight: 800;
  color: var(--text-strong);
}

.live-row__card {
  display: grid;
  grid-template-columns: 88px 1fr auto;
  gap: 12px;
  align-items: center;
  border: 1px solid var(--border-color);
  background: var(--surface);
  border-radius: 16px;
  padding: 10px 12px;
}

.live-row__thumb {
  width: 88px;
  height: 64px;
  border-radius: 12px;
  object-fit: cover;
}

.live-row__meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.live-row__title {
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
}

.live-row__seller {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.live-row__cta {
  border: none;
  background: var(--primary-color);
  color: #fff;
  font-weight: 800;
  border-radius: 12px;
  padding: 10px 14px;
  cursor: pointer;
}

.live-row__cta:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.live-detail {
  display: grid;
  grid-template-columns: minmax(220px, 320px) 1fr;
  gap: 20px;
  align-items: center;
}

.live-detail__thumb {
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
}

.live-detail__body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.live-detail__title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 800;
}

.live-detail__desc {
  margin: 0;
  color: var(--text-muted);
}

.live-detail__status {
  margin: 0;
  font-weight: 700;
  color: var(--text-soft);
}

.live-detail__cta {
  border: none;
  background: var(--primary-color);
  color: #fff;
  font-weight: 800;
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
}

.live-detail__upcoming {
  font-weight: 700;
  color: var(--text-muted);
}

.empty-state {
  padding: 24px 0;
  color: var(--text-muted);
}

@media (max-width: 720px) {
  .live-row {
    grid-template-columns: 1fr;
  }

  .live-row__time {
    order: -1;
  }

  .live-row__card {
    grid-template-columns: 1fr;
    text-align: left;
  }

  .live-row__thumb {
    width: 100%;
    height: 160px;
  }

  .live-detail {
    grid-template-columns: 1fr;
  }
}
</style>
