<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PageContainer from '../../components/PageContainer.vue'
import PageHeader from '../../components/PageHeader.vue'

const router = useRouter()
const DRAFT_KEY = 'deskit_seller_broadcast_draft_v1'

const cueTitle = ref('')
const cueNotes = ref('')

const loadDraft = () => {
  const raw = localStorage.getItem(DRAFT_KEY)
  if (!raw) return
  try {
    const parsed = JSON.parse(raw)
    cueTitle.value = typeof parsed?.cueTitle === 'string' ? parsed.cueTitle : ''
    cueNotes.value = typeof parsed?.cueNotes === 'string' ? parsed.cueNotes : ''
  } catch {
    return
  }
}

const saveDraft = () => {
  const next = {
    cueTitle: cueTitle.value.trim(),
    cueNotes: cueNotes.value.trim(),
  }
  localStorage.setItem(DRAFT_KEY, JSON.stringify(next))
}

const goNext = () => {
  saveDraft()
  router.push('/seller/live/create/basic').catch(() => {})
}

onMounted(() => {
  loadDraft()
})
</script>

<template>
  <PageContainer>
    <PageHeader eyebrow="DESKIT" title="방송 등록 - 큐 카드 작성" />
    <section class="create-card ds-surface">
      <label class="field">
        <span class="field__label">큐 카드 제목</span>
        <input v-model="cueTitle" type="text" placeholder="예: 오프닝 멘트" />
      </label>
      <label class="field">
        <span class="field__label">큐 카드 메모</span>
        <textarea v-model="cueNotes" rows="5" placeholder="방송 흐름을 간단히 적어주세요."></textarea>
      </label>
      <div class="actions">
        <button type="button" class="btn primary" @click="goNext">다음 단계</button>
      </div>
    </section>
  </PageContainer>
</template>

<style scoped>
.create-card {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field__label {
  font-weight: 800;
  color: var(--text-strong);
}

input,
textarea {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 10px 12px;
  font-weight: 700;
  color: var(--text-strong);
  background: var(--surface);
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.btn {
  border-radius: 999px;
  padding: 10px 18px;
  font-weight: 900;
  border: 1px solid var(--border-color);
  background: var(--surface);
  color: var(--text-strong);
  cursor: pointer;
}

.btn.primary {
  border-color: var(--primary-color);
  color: var(--primary-color);
}
</style>
