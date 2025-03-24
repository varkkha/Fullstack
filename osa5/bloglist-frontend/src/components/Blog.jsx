import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogLikes, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [updatedBlog, setUpdatedBlog] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleToggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    console.log('Blog ID:', blog.id)
    const updatedLikes = blog.likes + 1
    const updatedBlog = { ...blog, likes: updatedLikes }

    try {
      const response = await blogService.update(blog.id, updatedBlog)
      console.log('Updated Blog:', response.data)
      setUpdatedBlog(response.data)
      updateBlogLikes(response.data)
    } catch (error) {
      console.error('Error while updating blog:', error)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirmed) {
      try {
        await blogService.deleteBlog(blog.id)
        removeBlog(blog.id)
        updateBlogLikes(blog.id)
      } catch (error) {
        console.error('Error while deleting blog:', error)
      }
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={handleToggleDetails}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>

      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}</div>
          <button onClick={handleLike}>like</button>
          <div>{blog.user.username}</div>
        </div>
      )}
    </div>
  )
}


export default Blog