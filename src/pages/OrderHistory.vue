<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PageContainer from '../components/PageContainer.vue'
import PageHeader from '../components/PageHeader.vue'
import { loadOrders, updateOrder, type OrderReceipt } from '../lib/order/order-storage'

const orders = ref<OrderReceipt[]>([])
const isModalOpen = ref(false)
const selectedOrderId = ref<string | null>(null)
const cancelReason = ref('')
const cancelError = ref('')

const statusLabel = (status?: OrderReceipt['status']) => {
  const map: Record<string, string> = {
    CREATED: '주문 생성',
    PAID: '결제 완료',
    CANCEL_REQUESTED: '취소 요청',
    CANCELED: '취소',
    REFUND_REJECTED: '환불 거절',
    REFUNDED: '환불 완료',
  }
  return map[status ?? 'PAID'] ?? '결제 완료'
}

const totalCount = computed(() => orders.value.length)

const load = () => {
  orders.value = loadOrders()
}

const formatDate = (value: string) => {
  const d = new Date(value)
  const yy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yy}.${mm}.${dd}`
}

const formatPrice = (value: number) => `${value.toLocaleString('ko-KR')}원`

const titleOf = (order: OrderReceipt) => {
  const base = order.items[0]?.name ?? '상품'
  if (order.items.length > 1) return `${base} 외 ${order.items.length - 1}건`
  return base
}

const quantityOf = (order: OrderReceipt) =>
  order.items.reduce((sum, item) => sum + item.quantity, 0)

const canCancel = (status?: OrderReceipt['status']) =>
  (status ?? 'PAID') === 'PAID' || (status ?? 'PAID') === 'CREATED'
const isCancelRequested = (status?: OrderReceipt['status']) =>
  (status ?? 'PAID') === 'CANCEL_REQUESTED'

const openModal = (orderId: string) => {
  selectedOrderId.value = orderId
  cancelReason.value = ''
  cancelError.value = ''
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedOrderId.value = null
  cancelReason.value = ''
  cancelError.value = ''
}

const submitCancel = () => {
  if (!selectedOrderId.value) return
  if (!cancelReason.value.trim()) {
    cancelError.value = '취소 사유를 입력해주세요.'
    return
  }
  updateOrder(selectedOrderId.value, {
    status: 'CANCEL_REQUESTED',
    cancelReason: cancelReason.value.trim(),
  })
  load()
  closeModal()
}

const onStorage = () => load()

onMounted(() => {
  load()
  window.addEventListener('storage', onStorage)
  window.addEventListener('deskit-order-updated', onStorage)
})

onBeforeUnmount(() => {
  window.removeEventListener('storage', onStorage)
  window.removeEventListener('deskit-order-updated', onStorage)
})
</script>

<template>
  <PageContainer>
    <PageHeader eyebrow="DESKIT" title="주문내역" />
    <p class="count">나의 주문 내역 ({{ totalCount }})</p>

    <div v-if="!orders.length" class="history-empty">
      <p>주문 내역이 없습니다.</p>
      <RouterLink to="/products" class="link">상품 보러가기</RouterLink>
    </div>

    <section v-else class="history-list">
      <article v-for="order in orders" :key="order.orderId" class="history-card">
        <div class="card-grid">
          <div class="info">
            <div class="info__row">
              <h3 class="title">{{ titleOf(order) }}</h3>
              <span class="date">{{ formatDate(order.createdAt) }}</span>
            </div>
            <div class="chips">
              <span class="chip">총 금액 · {{ formatPrice(order.totals.total) }}</span>
              <span class="chip">수량 · {{ quantityOf(order) }}개</span>
              <span class="chip chip--orderid">주문번호 · {{ order.orderId }}</span>
            </div>
            <details v-if="isCancelRequested(order.status)" class="reason-box">
              <summary>취소 사유 보기</summary>
              <p class="reason-text">
                {{ order.cancelReason?.trim() ? order.cancelReason : '사유가 입력되지 않았습니다.' }}
              </p>
            </details>
            <details class="items-dropdown">
              <summary>주문 상품 보기 ({{ order.items.length }})</summary>
              <div class="items-list">
                <div class="items-header">
                  <span>상품</span>
                  <span>구매가(합계)</span>
                </div>
                <div
                  v-for="(item, idx) in order.items"
                  :key="item.productId ? String(item.productId) : `${idx}-${item.name}`"
                  class="item-row"
                >
                  <RouterLink
                    v-if="item.productId"
                    :to="`/products/${item.productId}`"
                    class="item-link"
                  >
                    {{ item.name }}
                    <span v-if="item.quantity > 1" class="item-qty">×{{ item.quantity }}</span>
                  </RouterLink>
                  <span v-else class="item-name">
                    {{ item.name }}
                    <span v-if="item.quantity > 1" class="item-qty">×{{ item.quantity }}</span>
                  </span>
                  <span class="item-price">
                    {{ (item.price * item.quantity).toLocaleString('ko-KR') }}원
                  </span>
                </div>
              </div>
            </details>
          </div>
          <div class="actions">
            <span class="status-pill" :data-status="order.status ?? 'PAID'">
              {{ statusLabel(order.status) }}
            </span>
            <button
              v-if="canCancel(order.status) && !isCancelRequested(order.status)"
              type="button"
              class="btn cancel"
              @click="openModal(order.orderId)"
            >
              취소 요청
            </button>
            <button
              v-else-if="isCancelRequested(order.status)"
              type="button"
              class="btn disabled"
              disabled
            >
              취소 요청됨
            </button>
          </div>
        </div>
      </article>
    </section>

    <transition name="fade">
      <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <h3 class="modal__title">주문 취소</h3>
          <p class="modal__subtitle">취소 사유를 입력해주세요.</p>
          <div v-if="selectedOrderId" class="modal__summary">
            <p>주문번호: {{ selectedOrderId }}</p>
            <p>
              {{
                titleOf(orders.find((o) => o.orderId === selectedOrderId) || {
                  items: [{ name: '상품' }],
                } as OrderReceipt)
              }}
            </p>
          </div>
          <label class="field">
            <span class="field__label">취소 사유</span>
            <textarea v-model="cancelReason" rows="3" placeholder="취소 사유를 입력해주세요" />
            <p v-if="cancelError" class="error">{{ cancelError }}</p>
          </label>
          <div class="modal__actions">
            <button type="button" class="btn ghost" @click="closeModal">닫기</button>
            <button type="button" class="btn primary" @click="submitCancel">신청</button>
          </div>
        </div>
      </div>
    </transition>
  </PageContainer>
</template>

<style scoped>
.count {
  margin: 4px 0 14px;
  color: var(--text-muted);
  font-weight: 800;
}

.history-empty {
  border: 1px dashed var(--border-color);
  padding: 18px;
  border-radius: 12px;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.link {
  color: var(--primary-color);
  font-weight: 800;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-card {
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--surface);
  padding: 14px;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: start;
}

.info {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info__row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.title {
  margin: 0;
  font-weight: 900;
  color: var(--text-strong);
}

.date {
  color: var(--text-muted);
  font-weight: 700;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
  align-items: center;
}

.chip {
  border: 1px solid var(--border-color);
  border-radius: 999px;
  padding: 6px 10px;
  font-weight: 700;
  font-size: 13px;
  background: var(--surface-weak);
  color: var(--text-strong);
  max-width: 100%;
}

.chip--orderid {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.items-dropdown {
  margin-top: 10px;
}

.items-dropdown summary {
  cursor: pointer;
  list-style: none;
  font-weight: 800;
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.items-dropdown summary::-webkit-details-marker {
  display: none;
}

.items-dropdown summary::after {
  content: '▾';
  font-weight: 900;
}

details[open] > summary::after {
  content: '▴';
}

.reason-box {
  margin-top: 10px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 10px;
  background: var(--surface-weak);
}

.reason-box summary {
  cursor: pointer;
  font-weight: 800;
  color: var(--text-muted);
  list-style: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.reason-box summary::-webkit-details-marker {
  display: none;
}

.reason-box summary::after {
  content: '▾';
  font-weight: 900;
}

.reason-box[open] summary::after {
  content: '▴';
}

.reason-text {
  margin: 6px 0 0;
  color: var(--text-strong);
  font-weight: 700;
  line-height: 1.45;
}

.items-list {
  margin-top: 8px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--surface-weak);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.items-header {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 2px 8px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-muted);
  font-weight: 700;
  font-size: 12px;
}

.item-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 6px;
}

.item-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.item-name {
  font-weight: 800;
  color: var(--text-strong);
  flex: 1;
  min-width: 0;
}

.item-price {
  font-variant-numeric: tabular-nums;
  color: var(--text-strong);
  font-weight: 800;
  white-space: nowrap;
}

.item-qty {
  color: var(--text-muted);
  font-weight: 700;
  margin-left: 4px;
}

.item-link {
  display: block;
  min-width: 0;
  font-weight: 800;
  color: var(--primary-color, var(--text-strong));
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-link:focus-visible,
.item-link:hover {
  text-decoration: underline;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}

.status-pill {
  border: 1px solid var(--border-color);
  border-radius: 999px;
  padding: 8px 12px;
  background: var(--surface-weak);
  color: var(--text-strong);
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  font-size: 13px;
  cursor: default;
}

.status-pill[data-status='PAID'] {
  border-color: var(--primary-color, var(--border-color));
  color: var(--primary-color, var(--text-strong));
  background: var(--surface);
}

.status-pill[data-status='CREATED'] {
  opacity: 0.9;
}

.status-pill[data-status='CANCEL_REQUESTED'] {
  border-color: #e7a100;
  color: #a46a00;
  background: rgba(231, 161, 0, 0.1);
}

.status-pill[data-status='CANCELED'] {
  opacity: 0.65;
}

.status-pill[data-status='REFUND_REJECTED'] {
  border-color: #d14343;
  color: #d14343;
  background: rgba(209, 67, 67, 0.1);
}

.status-pill[data-status='REFUNDED'] {
  opacity: 0.8;
}

.btn {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--surface);
  font-weight: 800;
  cursor: pointer;
}

.btn.cancel {
  border-color: var(--primary-color);
  color: var(--primary-color);
  font-weight: 800;
}

.btn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: var(--surface-weak);
  color: var(--text-muted);
}

.btn.ghost {
  color: var(--text-strong);
}

.btn.primary {
  background: var(--primary-color, var(--surface));
  border-color: var(--primary-color, var(--border-color));
  color: var(--primary-color, var(--text-strong));
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 20;
}

.modal {
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  padding: 16px;
  width: min(420px, 100%);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.12);
}

.modal__title {
  margin: 0 0 4px;
  font-size: 1.1rem;
  font-weight: 900;
}

.modal__subtitle {
  margin: 0 0 10px;
  color: var(--text-muted);
  font-weight: 700;
}

.modal__summary {
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  background: var(--surface-weak);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field__label {
  font-weight: 800;
  color: var(--text-strong);
}

.field textarea {
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 10px;
  resize: vertical;
  min-height: 80px;
}

.error {
  margin: 0;
  color: #d14343;
  font-weight: 800;
  font-size: 0.92rem;
}

.modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 860px) {
  .card-grid {
    grid-template-columns: 1fr;
    align-items: flex-start;
  }
  .actions {
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
  .actions {
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
