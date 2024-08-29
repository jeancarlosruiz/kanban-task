import { test, expect } from '@playwright/test'

test('Sign in page', async ({ page }) => {
  await page.goto('https://kanban-task-chi.vercel.app')

  await expect(page.getByRole('link', { name: 'Kanban' })).toBeVisible()
})
