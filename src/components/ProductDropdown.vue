<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const items = [
  { label: '가구', to: '/products?category=furniture' },
  { label: '컴퓨터', to: '/products?category=computer' },
  { label: '악세서리', to: '/products?category=accessory' },
]

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

const toggle = () => {
  isOpen.value = !isOpen.value
}

const handleDocumentClick = (event: MouseEvent) => {
  if (!dropdownRef.value) return
  if (!dropdownRef.value.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <div
    ref="dropdownRef"
    class="dropdown"
    @mouseenter="open"
    @mouseleave="close"
  >
    <button
      type="button"
      class="trigger"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      상품
      <span aria-hidden="true" class="chevron" />
    </button>
    <div class="menu" :class="{ 'menu--open': isOpen }">
      <RouterLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="menu-item"
        @click="close"
      >
        {{ item.label }}
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 100%;
}

.trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding: 10px 16px;
  border-radius: 12px;
  font-weight: 700;
  color: var(--text-muted);
  cursor: pointer;
  border: 1px solid transparent;
  background: transparent;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.dropdown:hover .trigger,
.trigger:focus-visible {
  color: var(--text-strong);
  background: var(--surface-weak);
  border-color: var(--border-color);
}

.chevron {
  width: 8px;
  height: 8px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid currentColor;
  margin-top: 2px;
}

.menu {
  position: absolute;
  top: 110%;
  left: 0;
  min-width: 200px;
  background: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.12);
  padding: 8px 0;
  display: none;
  z-index: 20;
}

.dropdown:hover .menu,
.menu.menu--open {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-item {
  display: block;
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  color: var(--text-muted);
  font-weight: 600;
  transition: color 0.2s ease, background 0.2s ease;
}

.menu-item:hover,
.menu-item:focus-visible {
  color: var(--text-strong);
  background: var(--surface-weak);
}
</style>
