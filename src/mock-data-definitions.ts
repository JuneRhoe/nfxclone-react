export interface UserInfo {
  id: string
  userId: string
  userPassword: string
  createdAt: Date
  myList: MediaInfo[]
}

export interface MediaInfo {
  id: string
  mediaId?: string
  titleImg?: string
  mainCategory?: string
  subCategory?: string
  mediaType?: string
  madeAt?: Date | string
  title?: string
  casts?: string[]
  genres?: string[]
  impressions?: string[]
  ratingSymbol?: string
  ratingDetails?: string[]
  description?: string
  previewMainImg?: string
  previewTitleImg?: string
  previewTrailer?: string  
}

export type UserInput = Pick<UserInfo, 'userId' | 'userPassword'>

export interface UserCookieInfo extends Pick<UserInfo, 'userId' | 'userPassword'> {
  authToken: string
}

