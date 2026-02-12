// features/auth/api/auth.api.ts

import type { SendPhonePayload, SendPhoneResponse } from '@entities/user/types'

export async function sendPhone(payload: SendPhonePayload): Promise<SendPhoneResponse> {
  const config = useRuntimeConfig()
  const SSO_BASE = config.public.baseURLSSO

  return $fetch<SendPhoneResponse>(`${SSO_BASE}/oauth/authorize/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
  })
}
