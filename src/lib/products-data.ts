export type Product = {
  id: string
  name: string
  category: string
  price: number
  popularity: number
  salesVolume: number
  tags: ProductTags
  imageUrl: string
  description?: string
}

export type ProductTags = {
  space: string[]
  tone: string[]
  situation: string[]
  mood: string[]
}

export const productsData: Product[] = [
  {
    id: '1',
    name: '에르고노믹 메쉬 체어 프리미엄',
    category: '가구',
    price: 289000,
    popularity: 96,
    salesVolume: 1247,
    tags: {
      space: ['오피스', '서재'],
      tone: ['모던', '블랙'],
      situation: ['재택근무', '화상회의'],
      mood: ['집중', '깔끔한'],
    },
    imageUrl: '/ergonomic-mesh-chair.jpg',
    description: '통기성과 지지력이 우수한 프리미엄 메쉬 체어',
  },
  {
    id: '2',
    name: 'USB-C 도킹 스테이션 11포트',
    category: '전자기기',
    price: 129000,
    popularity: 92,
    salesVolume: 892,
    tags: {
      space: ['오피스'],
      tone: ['미니멀', '블랙'],
      situation: ['재택근무', '화상회의'],
      mood: ['깔끔한'],
    },
    imageUrl: '/usb-c-docking-station.jpg',
    description: '노트북 확장을 위한 올인원 도킹 스테이션',
  },
  {
    id: '3',
    name: '기계식 키보드 RGB 청축',
    category: '악세서리',
    price: 159000,
    popularity: 98,
    salesVolume: 2156,
    tags: {
      space: ['게이밍룸', '서재'],
      tone: ['블랙', '컬러풀'],
      situation: ['게임', '공부'],
      mood: ['집중', '시크'],
    },
    imageUrl: '/mechanical-keyboard-rgb.jpg',
    description: '또렷한 타건감의 RGB 기계식 키보드',
  },
  {
    id: '4',
    name: '무선 마우스 게이밍 프로',
    category: '악세서리',
    price: 89000,
    popularity: 94,
    salesVolume: 1523,
    tags: {
      space: ['게이밍룸'],
      tone: ['블랙'],
      situation: ['게임'],
      mood: ['집중', '시크'],
    },
    imageUrl: '/wireless-gaming-mouse.jpg',
    description: '초저지연 무선 게이밍 마우스',
  },
  {
    id: '5',
    name: '27인치 4K 모니터 IPS',
    category: '전자기기',
    price: 449000,
    popularity: 96,
    salesVolume: 756,
    tags: {
      space: ['오피스', '서재'],
      tone: ['모던', '화이트'],
      situation: ['영상편집', '재택근무'],
      mood: ['깔끔한'],
    },
    imageUrl: '/27-inch-4k-monitor.jpg',
    description: '선명한 색감과 시야각을 제공하는 4K IPS 모니터',
  },
  {
    id: '6',
    name: 'LED 데스크 라이트 조명',
    category: '악세서리',
    price: 59000,
    popularity: 90,
    salesVolume: 2341,
    tags: {
      space: ['홈카페', '서재'],
      tone: ['우드톤', '화이트'],
      situation: ['공부', '휴식'],
      mood: ['따뜻한', '감성'],
    },
    imageUrl: '/led-desk-lamp.jpg',
    description: '눈부심을 줄여주는 스텝 조절 LED 라이트',
  },
  {
    id: '7',
    name: '스탠딩 데스크 전동 높이조절',
    category: '가구',
    price: 589000,
    popularity: 98,
    salesVolume: 412,
    tags: {
      space: ['오피스', '원룸'],
      tone: ['우드톤', '모던'],
      situation: ['재택근무'],
      mood: ['깔끔한'],
    },
    imageUrl: '/electric-standing-desk.jpg',
    description: '원터치로 높낮이를 조절하는 전동 스탠딩 데스크',
  },
  {
    id: '8',
    name: '노트북 거치대 알루미늄',
    category: '악세서리',
    price: 45000,
    popularity: 92,
    salesVolume: 1876,
    tags: {
      space: ['오피스', '홈카페'],
      tone: ['미니멀', '화이트'],
      situation: ['재택근무', '화상회의'],
      mood: ['깔끔한'],
    },
    imageUrl: '/aluminum-laptop-stand.jpg',
    description: '열 배출과 각도 조절이 가능한 알루미늄 거치대',
  },
  {
    id: '9',
    name: '케이블 정리 박스 세트',
    category: '악세서리',
    price: 29000,
    popularity: 88,
    salesVolume: 3214,
    tags: {
      space: ['원룸', '거실'],
      tone: ['미니멀', '화이트'],
      situation: ['재택근무'],
      mood: ['깔끔한'],
    },
    imageUrl: '/cable-management-box.jpg',
    description: '지저분한 케이블을 깔끔하게 숨기는 정리 박스',
  },
  {
    id: '10',
    name: '웹캠 4K 스트리밍 프로',
    category: '전자기기',
    price: 189000,
    popularity: 94,
    salesVolume: 634,
    tags: {
      space: ['오피스', '홈카페'],
      tone: ['모던', '블랙'],
      situation: ['화상회의', '재택근무'],
      mood: ['깔끔한'],
    },
    imageUrl: '/4k-streaming-webcam.jpg',
    description: '전문가용 4K 화질과 노이즈 캔슬 마이크 탑재',
  },
  {
    id: '11',
    name: '블루투스 스피커 데스크용',
    category: '전자기기',
    price: 79000,
    popularity: 90,
    salesVolume: 1128,
    tags: {
      space: ['홈카페', '거실'],
      tone: ['우드톤'],
      situation: ['휴식'],
      mood: ['감성', '따뜻한'],
    },
    imageUrl: '/bluetooth-desk-speaker.jpg',
    description: '데스크 환경에 최적화된 컴팩트 블루투스 스피커',
  },
  {
    id: '12',
    name: '모니터 암 듀얼 거치대',
    category: '악세서리',
    price: 129000,
    popularity: 96,
    salesVolume: 987,
    tags: {
      space: ['오피스', '서재'],
      tone: ['블랙', '모던'],
      situation: ['재택근무', '영상편집'],
      mood: ['집중', '시크'],
    },
    imageUrl: '/dual-monitor-arm.jpg',
    description: '듀얼 모니터를 안정적으로 지지하는 가스 스프링 암',
  },
]
