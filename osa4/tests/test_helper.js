const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: 'otsikko1',
      author: 'tekijä1',
      url: 'url1',
      likes: 1
    },
    {
      title: 'otsikko2',
      author: 'tekijä2',
      url: 'url2',
      likes: 2
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb
}