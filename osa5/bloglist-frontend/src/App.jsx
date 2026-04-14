import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import Blog from './components/Blog'
import BlogView from './components/BlogView'
import NewBlogPage from './components/NewBlogPage'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginPage = ({ onLogin, notify }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await onLogin({ username, password })
      if (user) navigate('/')
    } catch {
      notify('wrong username or password', 'error')
    }
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
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} style={formStyle}>
        <div style={fieldStyle}>
          <label>username</label>
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            style={inputStyle}
          />
        </div>
        <div style={fieldStyle}>
          <label>password</label>
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>login</button>
      </form>
    </div>
  )
}

const BlogsPage = ({ blogs }) => (
  <div>
    {[...blogs].sort((a, b) => b.likes - a.likes).map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
)

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  useEffect(() => {
    blogService.getAll().then(setBlogs)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    const loggedUser = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
    blogService.setToken(loggedUser.token)
    setUser(loggedUser)
    return loggedUser
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)))
  }

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id))
  }

  const addBlog = (blogObject) => {
    return blogService.create(blogObject).then((createdBlog) => {
      setBlogs(blogs.concat(createdBlog))
      notify(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    }).catch(() => {
      notify('failed to create blog', 'error')
      throw new Error('failed to create blog')
    })
  }

  return (
    <Container>
    <Router>
      <div>
        <nav style={{
          background: '#41003c',
          padding: '10px 20px',
          marginBottom: 20,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
        }}>
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Blog App</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link to="/" style={{ color: '#f9b8ff', textDecoration: 'none', fontWeight: 'bold', letterSpacing: 1 }}>BLOGS</Link>
            {user && <Link to="/new" style={{ color: '#f9b8ff', textDecoration: 'none', fontWeight: 'bold', letterSpacing: 1 }}>NEW BLOG</Link>}
            {user
              ? <button onClick={handleLogout} style={{
                  background: 'none',
                  border: '1px solid #f9b8ff',
                  color: '#f9b8ff',
                  padding: '3px 12px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>LOGOUT</button>
              : <Link to="/login" style={{ color: '#f9b8ff', textDecoration: 'none', fontWeight: 'bold', letterSpacing: 1 }}>LOGIN</Link>
            }
          </div>
        </nav>

        <Notification message={notification?.message} type={notification?.type} />

        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} notify={notify} />
          } />
          <Route path="/" element={<BlogsPage blogs={blogs} />} />
          <Route path="/new" element={
            user ? <NewBlogPage onCreate={addBlog} /> : <Navigate to="/login" />
          } />
          <Route path="/blogs/:id" element={
            <BlogView
              blogs={blogs}
              onUpdate={updateBlog}
              onDelete={deleteBlog}
              currentUser={user}
              notify={notify}
            />
          } />
        </Routes>
      </div>
    </Router>
    </Container>
  )
}

export default App
