import { useNavigate } from 'react-router-dom'
import BlogForm from './BlogForm'

const NewBlogPage = ({ onCreate }) => {
  const navigate = useNavigate()

  const handleCreate = (blogObject) => {
    onCreate(blogObject).then(() => navigate('/'))
  }

  return (
    <div>
      <BlogForm onCreate={handleCreate} />
    </div>
  )
}

export default NewBlogPage
