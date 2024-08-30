import { test, expect } from '@playwright/test'
import 'dotenv/config'

test('Sign in page fill form', async ({ page }) => {
  await page.goto('https://kanban-task-chi.vercel.app/signin')

  await expect(page.getByRole('link', { name: 'Kanban' })).toBeVisible()
  await page.getByLabel('Email:').fill(process.env.TEST_SIGNIN_EMAIL!)
  await page.getByLabel('Password:').fill(process.env.TEST_SIGNIN_PASSWORD!)
  await page.getByRole('button', { name: 'Sign in', exact: true }).click()
})
