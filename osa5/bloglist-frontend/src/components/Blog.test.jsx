import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, test, expect, vi } from 'vitest'
import BlogView from './BlogView'

vi.mock('../services/blogs', () => ({
  default: {
    update: vi.fn().mockResolvedValue({
      id: '1',
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 43,
      user: { username: 'testuser', name: 'Test User' },
    }),
    remove: vi.fn(),
    setToken: vi.fn(),
  },
}))

const blog = {
  id: '1',
  title: 'Test Blog Title',
  author: 'Test Author',
  url: 'http://testurl.com',
  likes: 42,
  user: { username: 'testuser', name: 'Test User' },
}

const renderBlogView = (currentUser) =>
  render(
    <MemoryRouter initialEntries={['/blogs/1']}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <BlogView
              blogs={[blog]}
              onUpdate={vi.fn()}
              onDelete={vi.fn()}
              currentUser={currentUser}
              notify={vi.fn()}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  )

describe('BlogView component', () => {
  test('shows blog details and likes for unauthenticated user, no buttons', () => {
    renderBlogView(null)

    expect(screen.getByText('Test Blog Title')).toBeInTheDocument()
    expect(screen.getByText('http://testurl.com')).toBeInTheDocument()
    expect(screen.getByText(/likes 42/)).toBeInTheDocument()

    expect(screen.queryByRole('button', { name: /like/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
  })

  test('shows only like button for logged-in non-owner', () => {
    renderBlogView({ username: 'otheruser' })

    expect(screen.getByRole('button', { name: /like/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
  })

  test('shows like and delete buttons for the blog creator', () => {
    renderBlogView({ username: 'testuser' })

    expect(screen.getByRole('button', { name: /like/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  test('calls onUpdate twice when like button is clicked twice', async () => {
    const user = userEvent.setup()
    const mockOnUpdate = vi.fn()

    render(
      <MemoryRouter initialEntries={['/blogs/1']}>
        <Routes>
          <Route
            path="/blogs/:id"
            element={
              <BlogView
                blogs={[blog]}
                onUpdate={mockOnUpdate}
                onDelete={vi.fn()}
                currentUser={{ username: 'testuser' }}
                notify={vi.fn()}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    )

    await user.click(screen.getByRole('button', { name: /like/i }))
    await user.click(screen.getByRole('button', { name: /like/i }))

    expect(mockOnUpdate).toHaveBeenCalledTimes(2)
  })
})
