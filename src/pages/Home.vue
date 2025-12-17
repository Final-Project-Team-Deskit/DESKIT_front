<script setup lang="ts">
import { liveItems, popularProducts, popularSetups } from '../lib/home-data';
import LiveCarousel from '../components/LiveCarousel.vue';
import SetupCarousel from '../components/SetupCarousel.vue';
import ProductCarousel from '../components/ProductCarousel.vue';
</script>

<template>
  <main class="home">
    <div class="hero">
      <div class="hero__content">
        <p class="eyebrow">Set Your Desk</p>
        <h1>데스크 셋업, 라이브로 만나보세요</h1>
        <p class="lede">프로젝트 3팀 화이팅!</p>
      </div>
      <div class="hero__glow"></div>
    </div>

    <div class="page__inner stack">
      <section>
        <div class="section-head">
          <h2 class="section-title">라이브 방송</h2>
          <p class="section-sub">지금 진행 중인 라이브를 만나보세요.</p>
        </div>
        <LiveCarousel :items="liveItems" />
      </section>

      <section>
        <div class="section-head">
          <h2 class="section-title">인기 셋업</h2>
          <p class="section-sub">다양한 스타일의 데스크 셋업을 둘러보세요.</p>
        </div>
        <SetupCarousel :items="popularSetups" />
      </section>

      <section>
        <div class="section-head">
          <h2 class="section-title">인기 상품</h2>
          <p class="section-sub">데스크 완성을 위한 추천 아이템.</p>
        </div>
        <ProductCarousel :items="popularProducts" />
      </section>
    </div>
  </main>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 28px;
  overflow-x: clip;
}

.hero {
  position: relative;
  padding: 72px 20px 28px;
  background: radial-gradient(
      circle at 16% 12%,
      rgba(210, 220, 182, 0.14),
      transparent 36%
    ),
    radial-gradient(
      circle at 84% 10%,
      rgba(161, 188, 152, 0.12),
      transparent 34%
    ),
    linear-gradient(
      180deg,
      rgba(247, 248, 243, 0.85) 0%,
      #ffffff 62%,
      rgba(247, 248, 243, 0.9) 100%
    );
}

.hero::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: rgba(15, 23, 42, 0.06);
  pointer-events: none;
}

.hero__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 22% 14%,
      rgba(210, 220, 182, 0.12),
      transparent 42%
    ),
    radial-gradient(
      circle at 78% 12%,
      rgba(161, 188, 152, 0.1),
      transparent 38%
    );
  opacity: 0.45;
  pointer-events: none;
}

.hero__content {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 22px 22px;
  z-index: 1;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--text-soft);
  font-weight: 800;
  letter-spacing: 0.12em;
  font-size: 0.9rem;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.6px;
  color: var(--text-strong);
}

.lede {
  margin: 8px 0 0;
  color: var(--text-muted);
  font-size: 1.05rem;
}

.hero-cta {
  margin: 10px 0 0;
  color: var(--live-color);
  font-weight: 800;
  font-size: 0.98rem;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 34px;
}

.page__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
  width: 100%;
  box-sizing: border-box;
}

.section-head {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
}

.section-sub {
  margin: 0;
  color: var(--text-muted);
}

@media (min-width: 960px) {
  h1 {
    font-size: 2.4rem;
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 52px 16px 20px;
  }

  .hero__content {
    padding: 20px 16px 16px;
  }

  .page__inner {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
