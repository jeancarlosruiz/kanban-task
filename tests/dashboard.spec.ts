import { test, expect } from '@playwright/test'

test('FCL title', async ({ page }) => {
  await page.goto('https://kanban-task-chi.vercel.app')

  await expect(page.getByRole('link', { name: 'Kanban' })).toBeVisible()
})
