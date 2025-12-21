<script setup lang="ts">
import { ref } from 'vue'
import PageContainer from '../components/PageContainer.vue'

const periodSales = ref<'daily' | 'monthly' | 'yearly'>('daily')
const periodRevenue = ref<'daily' | 'monthly' | 'yearly'>('daily')
</script>

<template>
  <PageContainer>
    <header class="dashboard-header">
      <div>
        <h2 class="section-title">판매자 대시보드</h2>
        <p class="ds-section-sub">판매 현황과 운영 지표를 한눈에 확인하세요.</p>
      </div>
      <button type="button" class="excel-btn">Excel 추출</button>
    </header>

    <section class="dashboard-grid">
      <div class="dashboard-main">
        <article class="card ds-surface">
          <header class="card-head">
            <div>
              <h3>판매자 상품 판매 현황 (상품 종류)</h3>
              <p class="card-sub">막대 그래프</p>
            </div>
            <div class="segmented" role="tablist" aria-label="기간 선택">
              <button
                  type="button"
                  class="segmented__btn"
                  :class="{ 'segmented__btn--active': periodSales === 'daily' }"
                  @click="periodSales = 'daily'"
              >
                일별
              </button>
              <button
                  type="button"
                  class="segmented__btn"
                  :class="{ 'segmented__btn--active': periodSales === 'monthly' }"
                  @click="periodSales = 'monthly'"
              >
                월별
              </button>
              <button
                  type="button"
                  class="segmented__btn"
                  :class="{ 'segmented__btn--active': periodSales === 'yearly' }"
                  @click="periodSales = 'yearly'"
              >
                연도별
              </button>
            </div>
          </header>
          <div class="chart-placeholder">그래프 영역 (데이터 준비 중)</div>
        </article>

        <article class="card ds-surface">
          <header class="card-head">
            <div>
              <h3>가장 많이 판매된 상품 TOP5</h3>
              <p class="card-sub">최근 판매 기준</p>
            </div>
          </header>
          <ol class="top-list">
            <li class="top-item">
              <span class="rank">01</span>
              <span class="label">상품 이름이 들어갑니다</span>
              <span class="value">-</span>
            </li>
            <li class="top-item">
              <span class="rank">02</span>
              <span class="label">상품 이름이 들어갑니다</span>
              <span class="value">-</span>
            </li>
            <li class="top-item">
              <span class="rank">03</span>
              <span class="label">상품 이름이 들어갑니다</span>
              <span class="value">-</span>
            </li>
            <li class="top-item">
              <span class="rank">04</span>
              <span class="label">상품 이름이 들어갑니다</span>
              <span class="value">-</span>
            </li>
            <li class="top-item">
              <span class="rank">05</span>
              <span class="label">상품 이름이 들어갑니다</span>
              <span class="value">-</span>
            </li>
          </ol>
        </article>

        <article class="card ds-surface">
          <header class="card-head">
            <div>
              <h3>판매자 상품 판매 현황 (매출)</h3>
              <p class="card-sub">막대 그래프</p>
            </div>
            <div class="segmented" role="tablist" aria-label="기간 선택">
              <button
                  type="button"
                  class="segmented__btn"
                  :class="{ 'segmented__btn--active': periodRevenue === 'daily' }"
                  @click="periodRevenue = 'daily'"
              >
                일별
              </button>
              <button
                  type="button"
                  class="segmented__btn"
                  :class="{ 'segmented__btn--active': periodRevenue === 'monthly' }"
                  @click="periodRevenue = 'monthly'"
              >
                월별
              </button>
              <button
                  type="button"
                  class="segmented__btn"
                  :class="{ 'segmented__btn--active': periodRevenue === 'yearly' }"
                  @click="periodRevenue = 'yearly'"
              >
                연도별
              </button>
            </div>
          </header>
          <div class="chart-placeholder">그래프 영역 (데이터 준비 중)</div>
        </article>

        <div class="kpi-grid">
          <article class="kpi-card ds-surface">
            <p class="kpi-label">일일 총 판매량</p>
            <p class="kpi-value">-</p>
            <p class="kpi-sub">오늘 기준</p>
          </article>
          <article class="kpi-card ds-surface">
            <p class="kpi-label">일일 총 판매액</p>
            <p class="kpi-value">-</p>
            <p class="kpi-sub">오늘 기준</p>
          </article>
        </div>
      </div>

      <aside class="dashboard-help ds-surface">
        <h3>대시보드 안내</h3>
        <ul>
          <li>방송 및 상품 판매 현황을 기간별로 확인합니다.</li>
          <li>TOP5 상품은 최근 판매량 기준으로 정렬됩니다.</li>
          <li>일일 판매량/판매액은 당일 집계 기준입니다.</li>
          <li>엑셀 추출로 운영 리포트를 저장할 수 있습니다.</li>
        </ul>
      </aside>
    </section>
  </PageContainer>
</template>

<style scoped>
.dashboard-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}


.excel-btn {
  border: 1px solid var(--border-color);
  background: var(--surface);
  color: var(--text-strong);
  border-radius: 999px;
  padding: 10px 18px;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.excel-btn:hover {
  border-color: var(--primary-color);
  box-shadow: 0 8px 18px rgba(var(--primary-rgb), 0.12);
  transform: translateY(-1px);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 18px;
}

.dashboard-main {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.card {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 220px;
}

.card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.card-head h3 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-strong);
}

.card-sub {
  margin: 6px 0 0;
  color: var(--text-soft);
  font-size: 0.9rem;
}

.segmented {
  display: inline-flex;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--surface-weak);
  padding: 4px;
  gap: 4px;
}

.segmented__btn {
  border: none;
  background: transparent;
  color: var(--text-muted);
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
}

.segmented__btn--active {
  background: var(--surface);
  color: var(--primary-color);
  box-shadow: 0 6px 16px rgba(var(--primary-rgb), 0.12);
}

.chart-placeholder {
  flex: 1;
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  background: var(--surface-weak);
  color: var(--text-muted);
  display: grid;
  place-items: center;
  font-weight: 700;
}

.top-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.top-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--surface-weak);
  color: var(--text-strong);
  font-weight: 600;
}

.rank {
  color: var(--primary-color);
  font-weight: 800;
}

.label {
  color: var(--text-strong);
}

.value {
  color: var(--text-soft);
  font-weight: 700;
}

.kpi-grid {
  grid-column: span 2;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.kpi-card {
  padding: 18px;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
}

.kpi-label {
  margin: 0;
  color: var(--text-muted);
  font-weight: 700;
}

.kpi-value {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--text-strong);
}

.kpi-sub {
  margin: 0;
  color: var(--text-soft);
  font-size: 0.9rem;
}

.dashboard-help {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: fit-content;
}

.dashboard-help h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: var(--text-strong);
}

.dashboard-help ul {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: var(--text-muted);
  font-size: 0.95rem;
}

@media (max-width: 960px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-help {
    order: 2;
  }
}

@media (max-width: 720px) {
  .dashboard-header {
    flex-direction: column;
    align-items: stretch;
  }

  .excel-btn {
    align-self: flex-start;
  }

  .dashboard-main {
    grid-template-columns: 1fr;
  }

  .kpi-grid {
    grid-column: span 1;
    grid-template-columns: 1fr;
  }
}
</style>
