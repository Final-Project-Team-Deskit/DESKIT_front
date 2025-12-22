<script setup lang="ts">
import PageContainer from '../../components/PageContainer.vue'
</script>

<template>
  <PageContainer>
    <header class="live-header">
      <div class="live-header__spacer" aria-hidden="true"></div>
      <div class="live-tabs" role="tablist" aria-label="방송 상태">
        <button type="button" class="live-tab live-tab--active" aria-label="전체 탭">전체</button>
        <button type="button" class="live-tab" aria-label="예약 탭">예약</button>
        <button type="button" class="live-tab" aria-label="방송 중 탭">방송 중</button>
        <button type="button" class="live-tab" aria-label="VOD 탭">VOD</button>
      </div>
      <button type="button" class="live-create-btn" aria-label="방송 등록">방송 등록</button>
    </header>

    <section class="live-section">
      <div class="live-section__head">
        <h3>방송 중</h3>
        <p class="ds-section-sub">현재 진행 중인 라이브 방송입니다.</p>
      </div>
      <div class="live-carousel" aria-label="방송 중 목록">
        <article class="live-card ds-surface">
          <p class="live-card__title">등록된 방송이 없습니다.</p>
          <p class="live-card__meta">새 방송을 등록해보세요.</p>
        </article>
      </div>
    </section>

    <section class="live-section">
      <div class="live-section__head">
        <h3>예약 방송</h3>
        <p class="ds-section-sub">예정된 라이브 스케줄을 관리하세요.</p>
      </div>
      <div class="live-carousel" aria-label="예약 방송 목록">
        <article class="live-card ds-surface">
          <p class="live-card__title">등록된 방송이 없습니다.</p>
          <p class="live-card__meta">예약 방송을 추가해보세요.</p>
        </article>
      </div>
    </section>

    <section class="live-section">
      <div class="live-section__head">
        <h3>VOD</h3>
        <p class="ds-section-sub">방송 다시보기 콘텐츠를 확인합니다.</p>
      </div>
      <div class="live-carousel" aria-label="VOD 목록">
        <article class="live-card ds-surface">
          <p class="live-card__title">등록된 VOD가 없습니다.</p>
          <p class="live-card__meta">방송이 종료되면 자동 등록됩니다.</p>
        </article>
      </div>
    </section>
  </PageContainer>
</template>

<style scoped>
.live-header {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 16px;
}

.live-tabs {
  display: inline-flex;
  gap: 8px;
  padding: 6px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--surface-weak);
}

.live-tab {
  border: none;
  background: transparent;
  color: var(--text-muted);
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 800;
  cursor: pointer;
}

.live-tab--active {
  background: var(--surface);
  color: var(--text-strong);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
}

.live-tab:focus-visible,
.live-create-btn:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.live-create-btn {
  border: 1px solid var(--border-color);
  background: var(--surface);
  color: var(--text-strong);
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 800;
  cursor: pointer;
}

.live-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.live-section__head h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-strong);
}

.live-carousel {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(220px, 1fr);
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
  scroll-snap-type: x mandatory;
}

.live-carousel > * {
  scroll-snap-align: start;
}

.live-card {
  padding: 18px;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
}

.live-card__title {
  margin: 0;
  font-weight: 800;
  color: var(--text-strong);
}

.live-card__meta {
  margin: 0;
  color: var(--text-muted);
  font-weight: 700;
  font-size: 0.9rem;
}

@media (max-width: 720px) {
  .live-header {
    grid-template-columns: 1fr;
    justify-items: stretch;
    gap: 12px;
  }

  .live-header__spacer {
    display: none;
  }

  .live-tabs {
    justify-content: center;
    flex-wrap: wrap;
  }

  .live-create-btn {
    justify-self: flex-end;
  }

  .live-carousel {
    grid-auto-columns: minmax(200px, 1fr);
  }
}
</style>
