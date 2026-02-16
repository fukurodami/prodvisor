import type { BaseResponse } from '@/entities/base'

export type AuthMethod = 'phone_code' | 'telegram_code'

export interface SendPhonePayload {
  phone: string
  response_type: AuthMethod
  captcha?: string
}

export type SendPhoneResponse =
  | BaseResponse<{
  expires_at: number
  channel: 'call'
}>
  | BaseResponse<{
  expires_at: number
  bot_username: string
  bot_start_payload: string
  channel: 'telegram'
}>

export type TelegramData = Extract<SendPhoneResponse['data'], { channel: 'telegram' }>

export type LoginResponse = {
  access_token: string
  refresh_token: string
  expires_in: number
}
