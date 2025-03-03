import { SHA512 } from 'crypto-js'

export function encrypt(value: string): string {
  // ToDo: Temporary test code due to the mockapi limitation.

  return encodeURI(SHA512(value).toString())
}

export function isAlphaNumbericAt(value: string): boolean {
  return /^[a-z0-9@]*$/gi.test(value)
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}