<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  id?: string
  title: string
  description: string
  thumbnailUrl: string
  isLive: boolean
  viewerCount: number
  liveStartedAt: Date | string
  isActive?: boolean
}>()

const elapsed = computed(() => {
  const started = new Date(props.liveStartedAt)
  const diffMs = Date.now() - started.getTime()
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)

  const pad = (value: number) => value.toString().padStart(2, '0')

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}`
  }
  return `${pad(minutes)}:${pad(seconds)}`
})

const router = useRouter()

const handleWatchNow = () => {
  if (props.id) {
    router.push(`/live/${props.id}`)
    return
  }
  alert('Live detail page is coming soon.')
}
</script>

<template>
  <article class="card" :class="{ 'card--active': props.isActive }">
    <div class="media">
      <img :src="props.thumbnailUrl" :alt="props.title" />
      <div class="top-badges">
        <span v-if="props.isLive" class="badge badge-live">LIVE</span>
        <span class="badge badge-viewers">시청자 {{ props.viewerCount.toLocaleString() }}명</span>
      </div>
    </div>
    <div class="content">
      <div class="eyebrow-row">
        <p class="eyebrow">현재 방송 중</p>
        <span class="eyebrow-time">{{ elapsed }}</span>
      </div>
      <h3>{{ props.title }}</h3>
      <p class="desc">{{ props.description }}</p>
      <div class="meta-row">
        <button type="button" class="cta" @click="handleWatchNow">보러가기</button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.2s ease;
  display: grid;
  grid-template-columns: minmax(300px, 360px) 1fr;
  column-gap: 2px;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 44px rgba(15, 23, 42, 0.14);
  border-color: rgba(255, 127, 80, 0.4);
}

.card--active {
  border-color: rgba(255, 127, 80, 0.5);
  box-shadow: 0 22px 48px rgba(255, 127, 80, 0.18);
}

.media {
  position: relative;
  background: var(--surface-weak);
}

.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.media:hover img {
  transform: scale(1.03);
}

.badge {
  position: absolute;
  border-radius: 12px;
  padding: 6px 10px;
  font-weight: 800;
  font-size: 0.85rem;
  color: #fff;
  box-shadow: 0 12px 22px rgba(0, 0, 0, 0.18);
}

.badge-live {
  background: #ff4d4f;
}

.top-badges {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.top-badges .badge {
  position: relative;
}

.badge-viewers {
  background: rgba(15, 23, 42, 0.7);
  color: #fff;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 6px 10px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.85rem;
  max-width: calc(100% - 24px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.eyebrow-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.eyebrow-time {
  color: var(--text-soft);
  font-weight: 800;
  white-space: nowrap;
  font-size: 0.95rem;
}

.content {
  padding: 16px 18px 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  word-break: keep-all;
  white-space: normal;
  max-width: 560px;
}

.eyebrow {
  margin: 0;
  color: var(--text-soft);
  font-weight: 800;
  letter-spacing: 0.04em;
}

h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.3px;
}

.desc {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.5;
}

.meta-row {
  margin-top: 6px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 6px;
}

.cta {
  border: none;
  background: var(--primary-color);
  color: #fff;
  font-weight: 800;
  width: min(320px, 100%);
  height: 52px;
  border-radius: 14px;
  font-size: 1.05rem;
  cursor: pointer;
  box-shadow: 0 14px 30px rgba(255, 127, 80, 0.22);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 32px rgba(255, 127, 80, 0.26);
}

@media (max-width: 1080px) {
  .card {
    grid-template-columns: 1fr;
  }
}
</style>
