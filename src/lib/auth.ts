export type AuthUser = {
  name: string
  email: string
  signupType: string
  memberCategory: string
  mbti?: string
  job?: string
}

export const getAuthUser = (): AuthUser | null => {
  const raw = localStorage.getItem('deskit-user')
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Partial<AuthUser>
    if (typeof parsed?.email === 'string' && typeof parsed?.name === 'string') {
      return {
        name: parsed.name,
        email: parsed.email,
        signupType: parsed.signupType || '',
        memberCategory: parsed.memberCategory || '',
        mbti: parsed.mbti || '',
        job: parsed.job || '',
      }
    }
  } catch {
    return null
  }
  return null
}

export const isLoggedIn = (): boolean => getAuthUser() !== null

export const isSeller = (): boolean => getAuthUser()?.memberCategory === '판매자'

export const loginSeller = (): void => {
  const sellerUser = {
    name: '홍길동(판매자)',
    email: 'honggildong+seller@test.com',
    signupType: '판매자(임시)',
    memberCategory: '판매자',
  }

  localStorage.setItem('deskit-user', JSON.stringify(sellerUser))
  localStorage.setItem('deskit-auth', 'seller')
  window.dispatchEvent(new Event('deskit-user-updated'))
}

export const logout = (): void => {
  ;['deskit-user', 'deskit-auth', 'token'].forEach((key) => localStorage.removeItem(key))
  window.dispatchEvent(new Event('deskit-user-updated'))
}
