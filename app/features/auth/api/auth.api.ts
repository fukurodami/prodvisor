import { useAppFetch } from '@/shared/api/useAppFetch'
import type { LoginResponse, SelfResponse, SendPhonePayload, SendPhoneResponse } from '@/entities/user/types'

export async function sendPhone(payload: SendPhonePayload): Promise<SendPhoneResponse | null> {
  const config = useRuntimeConfig()
  const SSO_BASE = config.public.baseURLSSO

  const { makeFetch } = useAppFetch()
  return makeFetch<SendPhoneResponse>(`${SSO_BASE}/oauth/authorize/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
  }, true)
}

export async function sendCode(payload: {
  phone: string
  code: string
  grant_type: 'phone_code'
}): Promise<LoginResponse | null> {
  const config = useRuntimeConfig()
  const SSO_BASE = config.public.baseURLSSO

  const { makeFetch } = useAppFetch()
  return makeFetch<LoginResponse>(`${SSO_BASE}/oauth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      ...payload,
      app_id: 4,
      app_secret: '251ec2c094984822be439b0b9081f02f',
    },
  }, true)
}

export async function refreshTokens(refreshToken: string): Promise<LoginResponse> {
  const config = useRuntimeConfig()
  const SSO_BASE = config.public.baseURLSSO

  const { makeFetch } = useAppFetch()
  return makeFetch<LoginResponse>(`${SSO_BASE}/oauth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
  }, true)
}

export async function getSelf(): Promise<SelfResponse | null> {
  const { makeFetch } = useAppFetch()

  return makeFetch(`system/users/self/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
}
