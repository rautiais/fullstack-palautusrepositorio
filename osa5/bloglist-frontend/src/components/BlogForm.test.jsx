import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import BlogForm from './BlogForm'

describe('BlogForm component', () => {
  test('calls onCreate with correct data when form is submitted', async () => {
    const user = userEvent.setup()
    const mockonCreate = vi.fn()

    render(<BlogForm onCreate={mockonCreate} />)

    await user.type(screen.getByPlaceholderText('title'), 'Test Title')
    await user.type(screen.getByPlaceholderText('author'), 'Test Author')
    await user.type(screen.getByPlaceholderText('url'), 'http://testurl.com')

    await user.click(screen.getByRole('button', { name: /create/i }))

    expect(mockonCreate).toHaveBeenCalledTimes(1)
    expect(mockonCreate).toHaveBeenCalledWith({
      title: 'Test Title',
      author: 'Test Author',
      url: 'http://testurl.com',
    })
  })
})
