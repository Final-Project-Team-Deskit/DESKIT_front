<script setup lang="ts">
type TagCategoryKey = 'space' | 'tone' | 'situation' | 'mood'

type TagCategoryMap = Record<TagCategoryKey, string[]>

const props = defineProps<{
  availableTags: TagCategoryMap
  modelValue: TagCategoryMap
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: TagCategoryMap): void
}>()

const categories: { key: TagCategoryKey; label: string }[] = [
  { key: 'space', label: '공간' },
  { key: 'tone', label: '톤' },
  { key: 'situation', label: '상황' },
  { key: 'mood', label: '무드' },
]

const toggle = (category: TagCategoryKey, tag: string) => {
  const current = props.modelValue[category]
  const nextCategoryTags = current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]
  emit('update:modelValue', { ...props.modelValue, [category]: nextCategoryTags })
}

const clearAll = () => {
  emit('update:modelValue', {
    space: [],
    tone: [],
    situation: [],
    mood: [],
  })
}

const isSelected = (category: TagCategoryKey, tag: string) => props.modelValue[category].includes(tag)
</script>

<template>
  <div class="filter">
    <div class="filter__header">
      <span class="filter__title">태그 그룹</span>
      <button class="clear" type="button" @click="clearAll">전체 해제</button>
    </div>
    <div class="groups">
      <section v-for="category in categories" :key="category.key" class="group">
        <header class="group__header">{{ category.label }}</header>
        <div class="chips">
          <button
            v-for="tag in props.availableTags[category.key]"
            :key="tag"
            type="button"
            :class="['chip', { 'chip--active': isSelected(category.key, tag) }]"
            @click="toggle(category.key, tag)"
          >
            {{ tag }}
          </button>
          <p v-if="!props.availableTags[category.key]?.length" class="empty">태그 없음</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filter__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.filter__title {
  color: var(--text-soft);
  font-weight: 800;
  letter-spacing: 0.01em;
}

.clear {
  border: 1px solid var(--border-color);
  background: #fff;
  color: var(--text-muted);
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.clear:hover {
  color: var(--text-strong);
  border-color: rgba(255, 127, 80, 0.5);
  background: rgba(255, 127, 80, 0.06);
}

.groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.group__header {
  font-weight: 800;
  color: var(--text-strong);
  letter-spacing: 0.01em;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  border: 1px solid var(--border-color);
  background: #fff;
  color: var(--text-muted);
  padding: 9px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}

.chip:hover {
  color: var(--text-strong);
  border-color: rgba(255, 127, 80, 0.4);
  background: rgba(255, 127, 80, 0.08);
}

.chip--active {
  background: rgba(255, 127, 80, 0.12);
  color: var(--primary-color);
  border-color: rgba(255, 127, 80, 0.6);
  box-shadow: 0 8px 20px rgba(255, 127, 80, 0.15);
}

.empty {
  margin: 0;
  color: var(--text-muted);
  font-weight: 600;
}

@media (max-width: 600px) {
  .groups {
    grid-template-columns: 1fr;
  }
}
</style>
