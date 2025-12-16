import type { ProductTags } from './products-data'
import { productsData } from './products-data'

export type LiveItem = {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  isLive: boolean
  viewerCount: number
  liveStartedAt: Date
}

export type SetupItem = {
  id: string
  title: string
  description: string
  imageUrl: string
}

export type ProductItem = {
  id: string
  name: string
  imageUrl: string
  price: number
  originalPrice?: number
  tags: ProductTags
  isSoldOut?: boolean
}

export const liveItems: LiveItem[] = [
  {
    id: '1',
    title: '프리미엄 데스크 셋업 라이브',
    description: '인기 유튜버와 함께하는 특별한 데스크 셋업 쇼핑',
    thumbnailUrl: '/modern-desk-setup-live-stream.jpg',
    isLive: true,
    viewerCount: 1284,
    liveStartedAt: new Date(Date.now() - 1 * 60 * 60 * 1000 - 23 * 60 * 1000 - 45 * 1000),
  },
  {
    id: '2',
    title: '게이밍 셋업 특가 쇼핑',
    description: '최고 성능의 게이밍 장비를 특별 가격으로',
    thumbnailUrl: '/gaming-rgb-desk-setup.jpg',
    isLive: true,
    viewerCount: 892,
    liveStartedAt: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: '3',
    title: '미니멀 오피스 꾸미기',
    description: '심플하고 세련된 업무 공간 만들기',
    thumbnailUrl: '/minimal-white-desk-setup.jpg',
    isLive: true,
    viewerCount: 2156,
    liveStartedAt: new Date(Date.now() - 2 * 60 * 60 * 1000 - 15 * 60 * 1000),
  },
  {
    id: '4',
    title: '우드 인테리어 데스크',
    description: '따뜻한 원목 소재로 꾸미는 자연스러운 공간',
    thumbnailUrl: '/wooden-natural-desk-setup.jpg',
    isLive: true,
    viewerCount: 1547,
    liveStartedAt: new Date(Date.now() - 30 * 60 * 1000),
  },
]

export const popularSetups: SetupItem[] = [
  {
    id: '1',
    title: '미니멀 화이트 셋업',
    description: '깔끔한 화이트 톤의 심플한 책상 구성',
    imageUrl: '/minimal-white-desk-setup.jpg',
  },
  {
    id: '2',
    title: '게이밍 RGB 셋업',
    description: '화려한 RGB 조명의 게이밍 환경',
    imageUrl: '/gaming-rgb-desk-setup.jpg',
  },
  {
    id: '3',
    title: '우드 내추럴 셋업',
    description: '따뜻한 원목 느낌의 자연스러운 공간',
    imageUrl: '/wooden-natural-desk-setup.jpg',
  },
  {
    id: '4',
    title: '프로페셔널 오피스',
    description: '효율적인 업무 환경을 위한 전문가 셋업',
    imageUrl: '/professional-office-desk-setup.jpg',
  },
  {
    id: '5',
    title: '스튜디오 크리에이터',
    description: '콘텐츠 제작을 위한 완벽한 작업 공간',
    imageUrl: '/content-creator-studio-desk.jpg',
  },
  {
    id: '6',
    title: '컴팩트 원룸 셋업',
    description: '작은 공간을 효율적으로 활용한 구성',
    imageUrl: '/compact-small-desk-setup.jpg',
  },
]

export const popularProducts: ProductItem[] = productsData
  .filter((product) => product.status === 'ON_SALE' || product.status === 'LIMITED_SALE')
  .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
  .slice(0, 12)
  .map((product) => ({
    id: String(product.product_id),
    name: product.name,
    imageUrl: product.imageUrl ?? '/placeholder-product.jpg',
    price: product.price,
    originalPrice: product.cost_price > product.price ? product.cost_price : undefined,
    tags: product.tags ?? { space: [], tone: [], situation: [], mood: [] },
    isSoldOut: product.status === 'SOLD_OUT',
  }))
