import { useParams, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'

const BlogView = ({ blogs, onUpdate, onDelete, currentUser, notify }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const blog = blogs.find((b) => b.id === id)

  if (!blog) return <div>Blog not found</div>

  const handleLike = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user?.id || blog.user,
    }
    try {
      const returned = await blogService.update(blog.id, updatedBlog)
      onUpdate(returned)
    } catch {
      notify('failed to update blog', 'error')
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        onDelete(blog.id)
        notify(`blog "${blog.title}" removed`, 'error')
        navigate('/')
      } catch {
        notify('failed to delete blog', 'error')
      }
    }
  }

  const isOwner = currentUser?.username === blog.user?.username

  const cardStyle = {
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '28px 32px',
    maxWidth: 600,
    borderTop: '5px solid #41003c',
  }

  const btnStyle = {
    padding: '7px 18px',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 14,
  }

  return (
    <div style={cardStyle}>
      <h2 style={{ margin: '0 0 4px', color: '#41003c' }}>{blog.title}</h2>
      <p style={{ margin: '0 0 16px', color: '#888', fontSize: 14 }}>by {blog.author}</p>

      <a
        href={blog.url}
        target="_blank"
        rel="noreferrer"
        style={{ color: '#41003c', fontSize: 14, wordBreak: 'break-all' }}
      >
        {blog.url}
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
        <span style={{ fontSize: 16, color: '#41003c' }}>❤ {blog.likes}</span>
        {currentUser && (
          <button onClick={handleLike} style={{ ...btnStyle, background: '#41003c', color: '#f9b8ff' }}>
            like
          </button>
        )}
      </div>

      <p style={{ color: '#aaa', fontSize: 13, marginTop: 16 }}>added by {blog.user?.name}</p>

      {isOwner && (
        <button
          onClick={handleDelete}
          style={{ ...btnStyle, background: '#fdecea', color: '#c0392b', marginTop: 8 }}
        >
          delete
        </button>
      )}
    </div>
  )
}

export default BlogView
