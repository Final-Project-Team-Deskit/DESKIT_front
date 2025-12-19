<script setup lang="ts">
import { liveItems, popularProducts, popularSetups } from '../lib/home-data'
import LiveCarousel from '../components/LiveCarousel.vue'
import SetupCarousel from '../components/SetupCarousel.vue'
import ProductCarousel from '../components/ProductCarousel.vue'
import PageContainer from '../components/PageContainer.vue'
</script>

<template>
  <div class="home">
    <!-- Hero: full-bleed (NOT inside PageContainer) -->
    <section class="hero">
      <div class="hero__inner">
        <p class="hero__eyebrow">DESKIT</p>
        <h1 class="hero__title">나만의 데스크를 완성하는 방법</h1>
        <p class="hero__lede">라이브 · 셋업 · 아이템을 한 번에 둘러보세요.</p>
      </div>
      <div class="hero__glow" aria-hidden="true"></div>
    </section>

    <!-- Content: standardized 1200 layout -->
    <PageContainer>
      <div class="stack">
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
    </PageContainer>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
}

/* Full-bleed hero */
.hero {
  position: relative;
  overflow: hidden;
  padding: 34px 0 26px;
  margin-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  background: linear-gradient(
      135deg,
      rgba(17, 24, 39, 0.06),
      rgba(34, 197, 94, 0.06)
  );
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.55);
}

.hero__inner {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero__glow {
  position: absolute;
  width: 520px;
  height: 520px;
  right: -180px;
  top: -260px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.14), transparent 60%);
  opacity: 0.7;
  pointer-events: none;
}

.hero__eyebrow {
  margin: 0;
  font-weight: 900;
  letter-spacing: 0.12em;
  font-size: 12px;
  color: var(--text-muted);
}

.hero__title {
  margin: 10px 0 0;
  font-weight: 950;
  letter-spacing: -0.6px;
  color: var(--text-strong);
  font-size: 28px;
  line-height: 1.2;
}

.hero__lede {
  margin: 10px 0 0;
  color: var(--text-muted);
  font-weight: 700;
}

/* Content */
.stack {
  display: flex;
  flex-direction: column;
  gap: 34px;
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

@media (max-width: 640px) {
  .hero__inner {
    padding: 0 16px;
  }
  .hero {
    padding: 28px 0 20px;
  }
  .hero__title {
    font-size: 22px;
  }
}
</style>