import { test, expect } from '@playwright/test'
import 'dotenv/config'

test.describe('Singing up processs', async () => {
  test('Go to sign up page', async ({ page }) => {
    await page.goto('https://kanban-task-chi.vercel.app/signin')
    await expect(page.getByRole('link', { name: 'Kanban' })).toBeVisible()
    await page
      .getByRole('link', {
        name: "Don't have an account? Sign up",
        exact: true,
      })
      .click()
    await page.getByLabel('Username:').fill(process.env.TEST_SIGNUP_USERNAME!)
    await page.getByLabel('Email:').fill(process.env.TEST_SIGNUP_EMAIL!)
    await page
      .getByLabel('Password:', { exact: true })
      .fill(process.env.TEST_SIGNUP_PASSWORD!)
    await page
      .getByLabel('Repeat password:', { exact: true })
      .fill(process.env.TEST_SIGNUP_PASSWORD!)
    await page.getByRole('button', { name: 'Sign up', exact: true }).click()
  })
  test('Sign in after sign up', async ({ page }) => {
    await page.goto('https://kanban-task-chi.vercel.app/signin')
    await page.getByLabel('Email:').fill(process.env.TEST_SIGNUP_EMAIL!)
    await page.getByLabel('Password:').fill(process.env.TEST_SIGNUP_PASSWORD!)
    await page.getByRole('button', { name: 'Sign in', exact: true }).click()
  })
})
