<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import PageContainer from '../../components/PageContainer.vue'
import PageHeader from '../../components/PageHeader.vue'
import { getAuthUser, logout } from '../../lib/auth'

const router = useRouter()

const display = computed(() => {
  const user = getAuthUser()
  return {
    name: user?.name || '판매자',
    email: user?.email || '',
    signupType: user?.signupType || '',
    memberCategory: user?.memberCategory || '판매자',
    sellerRole: user?.sellerRole || '오너',
  }
})

const handleLogout = () => {
  logout()
  router.push('/').catch(() => {})
}

const managers = ref([
  {
    id: 'manager-1',
    name: '김지우',
    email: 'jiwoo.manager@test.com',
    role: '매니저',
  },
  {
    id: 'manager-2',
    name: '박서준',
    email: 'seojun.manager@test.com',
    role: '부매니저',
  },
])

const showManagerModal = ref(false)

const openManagerModal = () => {
  showManagerModal.value = true
}

const closeManagerModal = () => {
  showManagerModal.value = false
}
</script>

<template>
  <PageContainer>
    <PageHeader eyebrow="DESKIT" title="판매자 마이페이지" />
    <section class="seller-card ds-surface">
      <div class="seller-card__top">
        <div class="seller-avatar" aria-hidden="true">S</div>
        <div class="seller-meta">
          <p class="seller-name">{{ display.name }}</p>
          <p class="seller-email">{{ display.email }}</p>
        </div>
      </div>
      <dl class="seller-info">
        <div class="seller-info__row">
          <dt>가입 유형</dt>
          <dd>{{ display.signupType }}</dd>
        </div>
        <div class="seller-info__row">
          <dt>회원 분류</dt>
          <dd>{{ display.memberCategory }}</dd>
        </div>
        <div class="seller-info__row">
          <dt>판매자 역할</dt>
          <dd>{{ display.sellerRole }}</dd>
        </div>
      </dl>
      <button type="button" class="seller-logout" @click="handleLogout">로그아웃</button>
    </section>
    <section class="manager-card ds-surface">
      <div class="manager-head">
        <button type="button" class="manager-add" @click="openManagerModal">매니저 등록</button>
      </div>
      <div class="manager-body">
        <div class="manager-list">
          <p class="manager-title">등록된 매니저</p>
          <ul v-if="managers.length" class="manager-items">
            <li v-for="manager in managers" :key="manager.id" class="manager-item">
              <div class="manager-meta">
                <span class="manager-name">{{ manager.name }}</span>
                <span class="manager-role">{{ manager.role }}</span>
              </div>
              <span class="manager-email">{{ manager.email }}</span>
            </li>
          </ul>
          <p v-else class="manager-empty">등록된 매니저가 없습니다.</p>
        </div>
      </div>
    </section>

    <div v-if="showManagerModal" class="manager-modal" role="dialog" aria-modal="true" aria-label="매니저 등록">
      <div class="manager-modal__backdrop" @click="closeManagerModal"></div>
      <div class="manager-modal__card ds-surface">
        <div class="manager-modal__head">
          <div>
            <h3>매니저 등록</h3>
            <p>소셜 로그인으로 매니저 계정을 연결하세요.</p>
          </div>
          <button type="button" class="modal-close" @click="closeManagerModal" aria-label="닫기">✕</button>
        </div>
        <div class="social-list">
          <button type="button" class="social-btn kakao">
            <span class="brand-ico" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4c-4.7 0-8.5 2.9-8.5 6.6 0 2.4 1.6 4.5 4 5.7l-1 3.6c-.1.4.3.7.6.5l4.2-2.8c.2 0 .5.1.7.1 4.7 0 8.5-2.9 8.5-6.6S16.7 4 12 4z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span class="btn-text">카카오로 시작하기</span>
          </button>

          <button type="button" class="social-btn naver">
            <span class="brand-ico" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M7 6h4.2l5.8 8.2V6H21v12h-4.2L11 9.8V18H7V6z" fill="currentColor" />
              </svg>
            </span>
            <span class="btn-text">네이버로 시작하기</span>
          </button>

          <button type="button" class="social-btn google">
            <span class="brand-ico google" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21.6 12.3c0-.7-.1-1.2-.2-1.8H12v3.4h5.4c-.1.9-.7 2.2-2 3.1v2.2h3.2c1.9-1.7 3-4.3 3-7.9z"
                  fill="currentColor"
                />
                <path
                  d="M12 22c2.7 0 5-.9 6.6-2.5l-3.2-2.2c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.7-5.6-4.1H3v2.3C4.7 19.8 8.1 22 12 22z"
                  fill="currentColor"
                  opacity=".6"
                />
                <path
                  d="M6.4 14.1c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8V8.2H3C2.4 9.4 2 10.7 2 12.3c0 1.6.4 2.9 1 4.1l3.4-2.3z"
                  fill="currentColor"
                  opacity=".4"
                />
                <path
                  d="M12 6.7c1.9 0 3.2.8 3.9 1.5l2.9-2.8C17 3.8 14.7 2.7 12 2.7 8.1 2.7 4.7 4.9 3 8.2l3.4 2.3c.8-2.4 3-3.8 5.6-3.8z"
                  fill="currentColor"
                  opacity=".8"
                />
              </svg>
            </span>
            <span class="btn-text">구글로 시작하기</span>
          </button>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<style scoped>
.manager-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 18px;
}

.manager-head {
  display: flex;
  justify-content: flex-end;
}

.manager-add {
  border: 1px solid var(--border-color);
  background: var(--surface);
  color: var(--text-strong);
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 800;
  cursor: pointer;
}

.manager-body {
  display: flex;
}

.manager-list {
  min-width: 0;
}

.manager-title {
  margin: 0 0 10px;
  font-weight: 800;
  color: var(--text-strong);
}

.manager-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.manager-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--surface);
}

.manager-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  color: var(--text-strong);
}

.manager-name {
  font-weight: 900;
}

.manager-role {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 700;
}

.manager-email {
  color: var(--text-muted);
  font-weight: 700;
  font-size: 0.9rem;
}

.manager-empty {
  margin: 0;
  color: var(--text-muted);
  font-weight: 700;
  font-size: 0.9rem;
}

.manager-modal {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  padding: 24px;
}

.manager-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
}

.manager-modal__card {
  position: relative;
  z-index: 1;
  width: min(520px, 100%);
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.manager-modal__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.manager-modal__head h3 {
  margin: 0 0 6px;
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--text-strong);
}

.manager-modal__head p {
  margin: 0;
  color: var(--text-muted);
  font-weight: 700;
  font-size: 0.9rem;
}

.modal-close {
  border: 1px solid var(--border-color);
  background: var(--surface);
  color: var(--text-strong);
  border-radius: 10px;
  padding: 6px 10px;
  font-weight: 900;
  cursor: pointer;
}

.social-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.social-btn {
  width: 100%;
  border-radius: 12px;
  padding: 12px;
  border: 1px solid var(--border-color);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 900;
  cursor: pointer;
  background: var(--surface);
}

.brand-ico {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
}

.social-btn.kakao {
  background: #fee500;
  color: #1f2937;
  border-color: transparent;
}

.social-btn.kakao .brand-ico {
  background: rgba(15, 23, 42, 0.08);
}

.social-btn.naver {
  background: #2db400;
  color: #fff;
  border-color: transparent;
}

.social-btn.naver .brand-ico {
  background: rgba(255, 255, 255, 0.2);
}

.social-btn.google {
  background: #fff;
  color: var(--text-strong);
}

.social-btn.google .brand-ico {
  background: var(--surface-weak);
}

.seller-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.seller-card__top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.seller-avatar {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--surface-weak);
  color: var(--text-strong);
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.seller-name {
  margin: 0;
  color: var(--text-strong);
  font-weight: 900;
  font-size: 16px;
}

.seller-email {
  margin: 4px 0 0;
  color: var(--text-muted);
  font-weight: 700;
  font-size: 13px;
}

.seller-info {
  margin: 0;
  display: grid;
  gap: 10px;
}

.seller-info__row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
}

.seller-info__row dt {
  margin: 0;
  color: var(--text-muted);
  font-weight: 700;
}

.seller-info__row dd {
  margin: 0;
  color: var(--text-strong);
  font-weight: 800;
}

.seller-logout {
  align-self: flex-start;
  border: 1px solid var(--border-color);
  background: var(--surface);
  color: var(--text-strong);
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 800;
  cursor: pointer;
}

.seller-logout:hover,
.seller-logout:focus-visible {
  border-color: var(--text-strong);
  outline: none;
}
</style>
