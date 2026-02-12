export interface BaseResponse<T = unknown> {
  status: {
    code: string
    message: string
  }
  data: T
}
