<script setup lang="ts">
import { computed } from 'vue'
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
  }
})

const handleLogout = () => {
  logout()
  router.push('/').catch(() => {})
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
      </dl>
      <button type="button" class="seller-logout" @click="handleLogout">로그아웃</button>
    </section>
  </PageContainer>
</template>

<style scoped>
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
