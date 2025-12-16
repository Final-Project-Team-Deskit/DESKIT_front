<template>
  <section class="banner">
    <div>
      <p class="eyebrow">DESKIT PICK</p>
      <h3>프리미엄 데스크 셋업 위크</h3>
      <p class="desc">지금 바로 최대 30% 할인으로 완벽한 작업 공간을 완성하세요.</p>
    </div>
    <button type="button" class="cta">기획전 보기</button>
  </section>
</template>

<style scoped>
.banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 20px;
  border-radius: 16px;
  background: linear-gradient(120deg, rgba(255, 127, 80, 0.12), rgba(255, 127, 80, 0.04));
  border: 1px solid rgba(255, 127, 80, 0.25);
  box-shadow: 0 16px 40px rgba(255, 127, 80, 0.12);
  backdrop-filter: blur(4px);
}

.eyebrow {
  margin: 0 0 6px;
  font-weight: 800;
  font-size: 0.9rem;
  color: var(--primary-color);
}

h3 {
  margin: 0 0 6px;
  font-size: 1.2rem;
  color: var(--text-strong);
  letter-spacing: -0.2px;
}

.desc {
  margin: 0;
  color: var(--text-muted);
}

.cta {
  border: none;
  background: var(--primary-color);
  color: #fff;
  font-weight: 800;
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 14px 30px rgba(255, 127, 80, 0.22);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 32px rgba(255, 127, 80, 0.26);
}

@media (max-width: 640px) {
  .banner {
    flex-direction: column;
    align-items: flex-start;
  }

  .cta {
    width: 100%;
    text-align: center;
  }
}
</style>
