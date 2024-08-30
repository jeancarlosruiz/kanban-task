import { test, expect } from '@playwright/test'

test.describe('Singing up processs', async () => {
  test('Go to sign up page', async ({ page }) => {
    await page.goto('https://kanban-task-chi.vercel.app/signin')
    await expect(page.getByRole('link', { name: 'Kanban' })).toBeVisible()
  })
})
