import { useState } from 'react'

const BlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    maxWidth: 400,
    background: '#fff',
    padding: 20,
    borderRadius: 6,
    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
  }

  const fieldStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    fontSize: 14,
  }

  const inputStyle = {
    padding: '6px 10px',
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: 14,
  }

  const buttonStyle = {
    alignSelf: 'flex-start',
    padding: '7px 18px',
    background: '#333',
    color: '#f9b8ff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14,
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={fieldStyle}>
          <label>title</label>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            style={inputStyle}
          />
        </div>
        <div style={fieldStyle}>
          <label>author</label>
          <input
            type="text"
            placeholder="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            style={inputStyle}
          />
        </div>
        <div style={fieldStyle}>
          <label>url</label>
          <input
            type="text"
            placeholder="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>create</button>
      </form>
    </div>
  )
}

export default BlogForm
