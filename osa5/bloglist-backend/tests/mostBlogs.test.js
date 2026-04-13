const { test, describe } = require('node:test')
const assert = require('node:assert')
const { mostBlogs } = require('../utils/list_helper')

const blogs = [
  { title: 'React patterns', author: 'Michael Chan', url: 'http://a.com', likes: 7 },
  { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://b.com', likes: 5 },
  { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://c.com', likes: 12 },
  { title: 'First class tests', author: 'Robert C. Martin', url: 'http://d.com', likes: 10 },
  { title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://e.com', likes: 0 },
  { title: 'Type wars', author: 'Robert C. Martin', url: 'http://f.com', likes: 2 },
]

describe('most blogs', () => {
  test('returns null for empty list', () => {
    assert.strictEqual(mostBlogs([]), null)
  })

  test('when list has one blog returns its author with 1 blog', () => {
    const result = mostBlogs([blogs[0]])
    assert.deepStrictEqual(result, { author: 'Michael Chan', blogs: 1 })
  })

  test('returns author with most blogs', () => {
    const result = mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })
})
