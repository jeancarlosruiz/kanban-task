import { test, expect } from '@playwright/test'
import 'dotenv/config'

test.describe('Dashboard tests', async () => {
  test.beforeEach('Go to and sign in', async ({ page }) => {
    await page.goto('http://localhost:3000/signin')
    await expect(page.getByRole('link', { name: 'Kanban' })).toBeVisible()
    await page.getByLabel('Email:').fill(process.env.TEST_SIGNIN_EMAIL!)
    await page.getByLabel('Password:').fill(process.env.TEST_SIGNIN_PASSWORD!)
    await page.getByRole('button', { name: 'Sign in', exact: true }).click()
  })

  test('Sign in and create the first board', async ({ page }) => {
    page.getByText('Create a new board', { exact: true })
    await expect(page.getByRole('button', { name: '+ Add New Task' }))
      .toBeDisabled
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
  })

  test('Creating a new task', async ({ page }) => {
    await expect(page.getByRole('button', { name: '+ Add New Task' }))
      .toBeEnabled
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
  })

  test('Editing the new task', async ({ page }) => {
    // await expect(page.getByText('First task')).toBeVisible()
    await page.getByText('First task').click()
    await page.getByTitle('task-title')
    await page.getByTitle('task-description')
    await expect(page.getByRole('listitem')).toHaveCount(3)
    await page.getByTitle('Todo')
    await page.getByLabel('First subtask', { exact: true }).click()
    await page.getByTitle('options-task').click()
    await page.getByRole('button', { name: 'Edit task' }).click()
    await page.getByLabel('title').fill('First task updated')
    await page.getByTitle('delete-subtask-2').click()
    await page.getByTitle('edit-status').click()
    await page.getByTitle('Done').click()
    await page.getByRole('button', { name: 'Save changes' }).click()
  })

  test('Delete current board', async ({ page }) => {
    await page.getByText('Open options').click()
    await expect(page.getByText('Profile')).toBeVisible()
    await page.getByText('Delete board').click()
    await expect(page.getByText('Delete this board?')).toBeVisible()
    await page.getByRole('button', { name: 'Delete', exact: true }).click()
  })
})
