'use server'
import { cookies } from 'next/headers'

export const getCurrentTheme = async (): Promise<string> => {
  let theme = cookies().get('colort-theme')?.value

  if (!theme) {
    cookies().set('color-theme', 'dark')
    theme = cookies().get('color-theme')?.value || 'dark'
  }

  return theme
}
