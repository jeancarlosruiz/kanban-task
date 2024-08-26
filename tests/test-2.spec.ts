import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('https://kanban-task-chi.vercel.app/signin')
  await page.getByRole('heading').click()
  await page.getByRole('heading').getByRole('img').click()
  await page.getByRole('main').click()
  await page
    .getByText(
      'Email:Email is requiredPassword:Password is requiredSign inorSign in with'
    )
    .click()
  await page.getByPlaceholder('example@email.com').click()
  await page.getByPlaceholder('example@email.com').fill('test@test.com')
  await page.getByPlaceholder('example@email.com').press('Tab')
  await page.getByPlaceholder('******').fill('123456789')
  await page.getByRole('button', { name: 'Sign in', exact: true }).click()
  await page.getByRole('heading', { name: 'Create a new board' }).click()
  await page
    .getByText('Start by creating a new board 😊Board+ Create New Board')
    .click()
  await page
    .locator('section')
    .getByRole('button', { name: 'Board + Create New Board' })
    .click()
  await page.getByLabel('Add New Board').click()
  await page.getByPlaceholder('e.g. Web Design').click()
  await page.getByPlaceholder('e.g. Web Design').fill('New board')
  await page.getByRole('button', { name: '+ Add New Column' }).click()
  await page.getByRole('button', { name: 'Create New Board' }).click()
  await page.getByLabel('input label').click()
  await page.getByLabel('input label').fill('new column')
  await page.getByRole('button', { name: 'Create New Board' }).click()
  await page.getByRole('button', { name: '+ Add New Task' }).click()
  await page.getByPlaceholder('e.g. Take coffee break').click()
  await page.getByPlaceholder('e.g. Take coffee break').fill('New task')
  await page.getByPlaceholder('e.g. It’s always good to take').click()
  await page
    .getByPlaceholder('e.g. It’s always good to take')
    .fill('Task description')
  await page.getByPlaceholder('e.g. Make coffee').click()
  await page.getByPlaceholder('e.g. Make coffee').fill('subtask 1')
  await page.getByPlaceholder('e.g. Drink coffee & smile').click()
  await page.getByPlaceholder('e.g. Drink coffee & smile').fill('subtask 2')
  await page.getByLabel('Status').click()
  await page.getByLabel('new column').getByText('new column').click()
  await page.getByRole('button', { name: 'Create Task' }).click()
})
