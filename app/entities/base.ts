export interface BaseResponse<T = unknown> {
  status: {
    code: string
    message: string
  }
  data: T
}

type ImgSrc = {
  path: string
}

export type ImageType = string | ImgSrc
