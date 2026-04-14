import { Link } from 'react-router-dom'

const blogStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  marginBottom: 8,
  background: '#fff',
  borderRadius: 6,
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  borderLeft: '4px solid #f9b8ff',
}

const Blog = ({ blog }) => (
  <div style={blogStyle}>
    <div>
      <Link
        to={`/blogs/${blog.id}`}
        style={{ fontWeight: 'bold', color: '#333', textDecoration: 'none', fontSize: 16 }}
      >
        {blog.title}
      </Link>
      <span style={{ color: '#41003c', fontSize: 14, marginLeft: 10 }}>{blog.author}</span>
    </div>
    <span style={{ color: '#41003c', fontSize: 13 }}>❤ {blog.likes}</span>
  </div>
)

export default Blog
