<script setup lang="ts">
import { liveItems, popularProducts, popularSetups } from '../lib/home-data'
import LiveCarousel from '../components/LiveCarousel.vue'
import SetupCarousel from '../components/SetupCarousel.vue'
import ProductCarousel from '../components/ProductCarousel.vue'
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
}

.hero {
  position: relative;
  padding: 46px 20px 14px;
}

.hero__content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 18px 0;
}

.hero__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 20%, rgba(255, 127, 80, 0.18), transparent 36%),
    radial-gradient(circle at 80% 10%, rgba(14, 165, 233, 0.16), transparent 35%);
  opacity: 0.7;
  pointer-events: none;
}

.eyebrow {
  margin: 0 0 6px;
  color: var(--text-soft);
  font-weight: 800;
  letter-spacing: 0.08em;
}

h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.6px;
}

.lede {
  margin: 8px 0 0;
  color: var(--text-muted);
  font-size: 1.05rem;
}

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

@media (min-width: 960px) {
  h1 {
    font-size: 2.4rem;
  }
}
</style>
