import { test, expect } from '@playwright/test'
import 'dotenv/config'

test.describe('Dashboard tests', async () => {
  test.beforeEach('Go to and sign in', async ({ page }) => {
    await page.goto('https://kanban-task-chi.vercel.app/signin')
    await expect(page.getByRole('link', { name: 'Kanban' })).toBeVisible()
    await page.getByLabel('Email:').fill(process.env.TEST_SIGNIN_EMAIL!)
    await page.getByLabel('Password:').fill(process.env.TEST_SIGNIN_PASSWORD!)
    await page.getByRole('button', { name: 'Sign in', exact: true }).click()
  })

  test('Sign in and create the first board', async ({ page }) => {
    page.getByText('Create a new board', { exact: true })
    expect(page.getByRole('button', { name: '+ Add New Task' })).toBeDisabled
    page.getByText('Start by creating a new board', { exact: true })
    await page.getByTitle('empty-board').click()
    await page.getByLabel('Title').fill('First board')
    await page
      .getByRole('button', { name: '+ Add New Column', exact: true })
      .click()
    await page.getByLabel('New column 1').fill('Todo')
    await page
      .getByRole('button', { name: '+ Add New Column', exact: true })
      .click()
    await page.getByLabel('New column 2').fill('Doing')
    await page
      .getByRole('button', { name: '+ Add New Column', exact: true })
      .click()
    await page.getByLabel('New column 3').fill('Done')
    await page
      .getByRole('button', { name: 'Create New Board', exact: true })
      .click()
    await expect(page.getByText('TODO')).toBeVisible()
    await expect(page.getByText('DOING')).toBeVisible()
    await expect(page.getByText('DONE')).toBeVisible()
    await page
      .getByRole('button', { name: '+ New Column', exact: true })
      .click()
    await page.getByLabel('Title').fill('Another column')
    await page
      .getByRole('button', { name: 'Create New Column', exact: true })
      .click()
    await expect(page.getByText('Another column')).toBeVisible()

    expect(page.getByRole('button', { name: '+ Add New Task' })).toBeEnabled
    await page.getByRole('button', { name: '+ Add New Task' }).click()
    await page.getByLabel('Title').fill('First task')
    await page.getByLabel('Description').fill('First description')
    await page.getByLabel('New subtask 1').fill('First subtask')
    await page.getByLabel('New subtask 2').fill('Second subtask')
    await page.getByRole('button', { name: '+ Add New Subtask' }).click()
    await page.getByLabel('New subtask 3').fill('Third subtask')
    await page.getByLabel('Status').click()
    await page.getByTitle('Todo').click()
    await page.getByRole('button', { name: 'Create Task' }).click()

    await page.getByText('First task').click()
    page.getByTitle('task-title')
    page.getByTitle('task-description')
    await expect(page.getByRole('listitem')).toHaveCount(3)
    page.getByTitle('Todo')
    await page.getByLabel('First subtask', { exact: true }).click()
    await page.getByTitle('open-task').click()
    await page.getByRole('button', { name: 'Edit task' }).click()
    await page.getByLabel('title').fill('First task updated')
    await page.getByTitle('delete-subtask-1').click()
    await page.getByTitle('edit-status').click()
    await page.getByTitle('Done').click()
    await page.getByRole('button', { name: 'Save changes' }).click()
  })

  test.afterEach('Delete the board', async ({ page }) => {
    await page.getByTitle('open-options').click()
    await expect(page.getByText('Profile')).toBeVisible()
    await page.getByTitle('delete-board').click()
    await expect(page.getByText('Delete this board?')).toBeVisible()
    await page.getByRole('button', { name: 'Delete', exact: true }).click()
    await page.getByTitle('signout').click()
  })
})
