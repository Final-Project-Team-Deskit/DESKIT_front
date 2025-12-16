<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)

const navLinks = [
  { label: '상품', to: '/products' },
  { label: '셋업', to: '/setup' },
  { label: '라이브', to: '/live' },
]

const actionLinks = [
  { label: '장바구니', to: '/cart', icon: 'cart' },
  { label: '마이페이지', to: '/account', icon: 'user' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 8
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const isLiveActive = computed(() => route.path.startsWith('/live'))
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="container">
      <div class="left">
        <RouterLink to="/" class="brand">
          <img class="brand__logo" src="/DESKIT.png" alt="DESKIT" />
        </RouterLink>

        <nav class="nav">
          <RouterLink
            v-for="item in navLinks"
            :key="item.to"
            :to="item.to"
            :class="[
              'nav-link',
              {
                'nav-link--live': item.to === '/live',
                'nav-link--live-active': item.to === '/live' && isLiveActive,
              },
            ]"
            active-class="nav-link--active"
          >
            {{ item.label }}
            <span v-if="item.to === '/live'" class="live-pill">LIVE</span>
          </RouterLink>
        </nav>
      </div>

      <div class="right">
        <div class="search">
          <svg class="search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 4a7 7 0 015.657 11.045l3.149 3.148-1.414 1.414-3.148-3.149A7 7 0 1111 4z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <input class="search__input" type="search" placeholder="상품 또는 셋업 검색" />
        </div>
        <div class="actions">
          <RouterLink
            v-for="action in actionLinks"
            :key="action.to"
            :to="action.to"
            class="action-link"
          >
            <svg v-if="action.icon === 'cart'" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6h15l-1.5 9h-12L5 4H3"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle cx="9" cy="19" r="1.2" fill="currentColor" />
              <circle cx="17" cy="19" r="1.2" fill="currentColor" />
            </svg>
            <svg v-else-if="action.icon === 'user'" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 12a4 4 0 100-8 4 4 0 000 8z"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 20c.6-3 3.5-5 7-5s6.4 2 7 5"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>{{ action.label }}</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 10px 20px;
  flex-wrap: nowrap;
}

.header--scrolled {
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.12);
  border-color: rgba(15, 23, 42, 0.06);
}

.left {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-shrink: 1;
  min-width: 0;
}

.brand {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.brand__logo {
  height: 32px;
  width: auto;
  display: block;
  transition: opacity 0.18s ease;
}

.brand:hover .brand__logo {
  opacity: 0.85;
}

.nav {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.nav-link {
  padding: 8px 12px;
  border-radius: 10px;
  font-weight: 700;
  color: var(--text-muted);
  position: relative;
  transition: color 0.22s ease, background 0.22s ease, opacity 0.22s ease;
}

.nav-link:hover {
  color: var(--text-strong);
  background: rgba(255, 127, 80, 0.05);
}

.nav-link--active {
  color: var(--primary-color);
  background: rgba(255, 127, 80, 0.12);
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 6px;
  height: 2px;
  border-radius: 999px;
  background: var(--primary-color);
  transform: scaleX(0);
  transform-origin: center;
  opacity: 0;
  transition: transform 0.22s ease, opacity 0.22s ease;
}

.nav-link--active::after,
.nav-link:hover::after {
  transform: scaleX(1);
  opacity: 1;
}

.nav-link--live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.nav-link--live .live-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #fff;
  background: linear-gradient(135deg, #ef4444, #f59e0b);
  box-shadow: 0 6px 14px rgba(239, 68, 68, 0.3);
}

.nav-link--live-active {
  color: var(--primary-color);
  background: rgba(255, 127, 80, 0.14);
  box-shadow: 0 10px 24px rgba(255, 127, 80, 0.14);
}

.right {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  justify-content: flex-end;
  min-width: 0;
}

.search {
  position: relative;
  width: clamp(220px, 28vw, 420px);
  flex: 0 1 auto;
}

.search__input {
  width: 100%;
  padding: 9px 12px 9px 34px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: #fff;
  font-weight: 600;
  color: var(--text-strong);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search__input::placeholder {
  color: var(--text-soft);
}

.search__input:focus {
  outline: none;
  border-color: rgba(255, 127, 80, 0.6);
  box-shadow: 0 10px 24px rgba(255, 127, 80, 0.12);
}

.search__icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-soft);
  pointer-events: none;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.action-link {
  padding: 8px 10px;
  border-radius: 10px;
  color: var(--text-muted);
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.action-link:hover {
  color: var(--text-strong);
  background: var(--surface-weak);
  transform: translateY(-1px);
}

@media (max-width: 900px) {
  .container {
    gap: 12px;
  }

  .search {
    min-width: 0;
    flex: 1;
  }
}

@media (max-width: 640px) {
  .container {
    padding: 10px 14px;
  }

  .brand__accent {
    display: none;
  }

  .search {
    display: none;
  }

  .actions {
    gap: 6px;
  }

  .action-link {
    padding: 6px 8px;
    font-size: 0.95rem;
  }
}
</style>
