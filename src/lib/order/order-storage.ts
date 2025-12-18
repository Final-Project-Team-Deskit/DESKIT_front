export const ORDER_STORAGE_KEY = 'deskit_order_last_v1'

export type OrderReceiptItem = {
  productId: string
  name: string
  quantity: number
  price: number
  originalPrice: number
  discountRate: number
}

export type OrderReceipt = {
  orderId: string
  createdAt: string
  items: OrderReceiptItem[]
  shipping: {
    buyerName: string
    zipcode: string
    address1: string
    address2: string
  }
  paymentMethodLabel: string
  totals: {
    listPriceTotal: number
    salePriceTotal: number
    discountTotal: number
    shippingFee: number
    total: number
  }
}

const safeParse = (raw: string | null): any => {
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

const normalizeReceipt = (raw: any): OrderReceipt | null => {
  if (!raw || typeof raw !== 'object') return null

  const orderId = typeof raw?.orderId === 'string' && raw.orderId.trim() ? raw.orderId : ''
  const createdAt = typeof raw?.createdAt === 'string' && raw.createdAt.trim() ? raw.createdAt : ''
  if (!orderId || !createdAt) return null

  const items = Array.isArray(raw.items)
    ? raw.items
        .map((item: any) => {
          const productId = item?.productId ?? item?.id
          const name = item?.name ?? ''
          if (!productId || !name) return null
          const quantity = Math.max(1, Number(item?.quantity ?? 0) || 0)
          const price = Math.max(0, Number(item?.price ?? 0) || 0)
          const originalPrice = Math.max(0, Number(item?.originalPrice ?? item?.price ?? 0) || 0)
          return {
            productId: String(productId),
            name,
            quantity,
            price,
            originalPrice,
            discountRate: Number(item?.discountRate ?? 0) || 0,
          } as OrderReceiptItem
        })
        .filter((v: OrderReceiptItem | null): v is OrderReceiptItem => Boolean(v))
    : []

  if (items.length === 0) return null

  const shipping = {
    buyerName: raw?.shipping?.buyerName ?? '',
    zipcode: raw?.shipping?.zipcode ?? '',
    address1: raw?.shipping?.address1 ?? '',
    address2: raw?.shipping?.address2 ?? '',
  }

  const totalsRaw = {
    listPriceTotal: Number(raw?.totals?.listPriceTotal ?? 0) || 0,
    salePriceTotal: Number(raw?.totals?.salePriceTotal ?? 0) || 0,
    discountTotal: Number(raw?.totals?.discountTotal ?? 0) || 0,
    shippingFee: Number(raw?.totals?.shippingFee ?? 0) || 0,
    total: Number(raw?.totals?.total ?? 0) || 0,
  }

  const listPriceTotal = Math.max(0, totalsRaw.listPriceTotal)
  const salePriceTotal = Math.max(0, totalsRaw.salePriceTotal)
  const shippingFee = Math.max(0, totalsRaw.shippingFee)
  const discountTotal = Math.max(0, totalsRaw.discountTotal)
  const total = salePriceTotal + shippingFee

  const paymentMethodLabel =
    typeof raw?.paymentMethodLabel === 'string' && raw.paymentMethodLabel.trim()
      ? raw.paymentMethodLabel
      : '토스페이 (예정)'

  return {
    orderId,
    createdAt,
    items,
    shipping,
    paymentMethodLabel,
    totals: {
      listPriceTotal,
      salePriceTotal,
      discountTotal,
      shippingFee,
      total,
    },
  }
}

export const loadLastOrder = (): OrderReceipt | null => {
  const parsed = safeParse(localStorage.getItem(ORDER_STORAGE_KEY))
  return normalizeReceipt(parsed)
}

export const saveLastOrder = (receipt: OrderReceipt) => {
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(receipt))
  window.dispatchEvent(new CustomEvent('deskit-order-updated'))
}

export const clearLastOrder = () => {
  localStorage.removeItem(ORDER_STORAGE_KEY)
  window.dispatchEvent(new CustomEvent('deskit-order-updated'))
}
