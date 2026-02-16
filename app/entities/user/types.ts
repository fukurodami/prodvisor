import type { BaseResponse } from '@/entities/base'


// --- Авторизация ---

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

// --- Пользователь ---

export interface SelfPersonal {
  first_name: string
  last_name: string
  // middle_name?: string | null
}

export interface SelfContact {
  phone: string
  // email?: string | null
}

export interface SelfRole {
  role: string
  // другие поля роли, если будут
}

export interface SelfScope {
  role: string
}

export interface Self {
  uuid: string
  personal: SelfPersonal
  contact: SelfContact
  roles: SelfRole[]
  scope: SelfScope
  // flags?: Record<string, boolean>
  // created_at?: string
  // updated_at?: string
}

export type SelfResponse = BaseResponse<Self>
