import { test, expect } from '@playwright/test'

test('Sign in page fill form', async ({ page }) => {
  await page.goto('https://kanban-task-chi.vercel.app')

  await expect(page.getByRole('link', { name: 'Kanban' })).toBeVisible()
  await page.getByLabel('Email:').fill(process.env.TEST_EMAIL!)
  await page.getByLabel('Password:').fill(process.env.TEST_PASSWORD!)
})
