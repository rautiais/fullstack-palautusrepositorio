const { test, expect, beforeEach, describe } = require('@playwright/test')

const login = async (page, username, password) => {
  await page.getByRole('textbox', { name: /username/i }).fill(username)
  await page.getByRole('textbox', { name: /password/i }).fill(password)
  await page.getByRole('button', { name: /login/i }).click()
}

const createBlog = async (page, { title, author, url }) => {
  await page.getByRole('link', { name: /new blog/i }).click()
  await page.getByPlaceholder('title').fill(title)
  await page.getByPlaceholder('author').fill(author)
  await page.getByPlaceholder('url').fill(url)
  await page.getByRole('button', { name: /^create$/i }).click()
  await page.getByRole('link', { name: title }).waitFor()
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
    await page.evaluate(() => window.localStorage.clear())
    await page.goto('http://localhost:5173/login')
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByRole('textbox', { name: /username/i })).toBeVisible()
    await expect(page.getByRole('textbox', { name: /password/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'mluukkai', 'wrong')

      const notification = page.locator('div').filter({ hasText: /^wrong username or password$/ }).first()
      await expect(notification).toBeVisible()
      await expect(notification).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'mluukkai', 'salainen')
      await page.getByText('Matti Luukkainen logged in').waitFor()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, {
        title: 'A test blog title',
        author: 'Test Author',
        url: 'http://testblog.com'
      })

      await expect(page.getByRole('link', { name: 'A test blog title' })).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, {
        title: 'A blog to like',
        author: 'Like Author',
        url: 'http://likeblog.com'
      })

      await page.getByRole('link', { name: 'A blog to like' }).click()
      await page.getByRole('button', { name: /like/i }).click()

      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('the creator can delete their blog', async ({ page }) => {
      await createBlog(page, {
        title: 'Blog to delete',
        author: 'Delete Author',
        url: 'http://deleteblog.com'
      })

      await page.getByRole('link', { name: 'Blog to delete' }).click()

      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: /delete/i }).click()

      await expect(page.getByRole('link', { name: 'Blog to delete' })).not.toBeVisible()
    })

    test('only the creator sees the delete button', async ({ page, request }) => {
      await createBlog(page, {
        title: 'Blog by mluukkai',
        author: 'Matti',
        url: 'http://mluukkai.com'
      })

      await request.post('http://localhost:3003/api/users', {
        data: { name: 'Other User', username: 'otheruser', password: 'otherpass' }
      })

      await page.getByRole('button', { name: /logout/i }).click()
      await page.goto('http://localhost:5173/login')
      await login(page, 'otheruser', 'otherpass')
      await page.getByText('Other User logged in').waitFor()

      await page.getByRole('link', { name: 'Blog by mluukkai' }).click()

      await expect(page.getByRole('button', { name: /like/i })).toBeVisible()
      await expect(page.getByRole('button', { name: /delete/i })).not.toBeVisible()
    })
  })
})
