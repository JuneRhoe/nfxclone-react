export const MIN_LENGTH_USER_ID = 3
export const MIN_LENGTH_USER_PASSWORD = 5

export interface UserInput {
  userId: string
  userPassword: string
}

export interface UserInfo {
  userId: string
  authToken: string
}