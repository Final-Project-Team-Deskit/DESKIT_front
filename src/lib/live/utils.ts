import type { LiveItem } from './types'

export type LiveStatus = 'UPCOMING' | 'LIVE' | 'ENDED'

export const getLiveStatus = (item: LiveItem, now: Date = new Date()): LiveStatus => {
  const startAt = new Date(item.startAt)
  const endAt = new Date(item.endAt)

  if (now < startAt) {
    return 'UPCOMING'
  }
  if (now >= endAt) {
    return 'ENDED'
  }
  return 'LIVE'
}

export const getDayWindow = (baseDate: Date): Date[] => {
  const days: Date[] = []
  const base = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate())

  for (let offset = -3; offset <= 6; offset += 1) {
    days.push(new Date(base.getFullYear(), base.getMonth(), base.getDate() + offset))
  }

  return days
}

export const isSameLocalDay = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export const sortLivesByStartAt = (items: LiveItem[]): LiveItem[] => {
  return [...items].sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
}

export const filterLivesByDay = (items: LiveItem[], day: Date): LiveItem[] => {
  return items.filter((item) => isSameLocalDay(new Date(item.startAt), day))
}
