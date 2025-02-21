const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

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

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

test('blog id is id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach((blog) => {
        assert(blog.id && !blog._id)
    })
  })

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'otsikko3',
        author: 'tekijä3',
        url: 'url3',
        likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const title = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, initialBlogs.length + 1)

    assert(title.includes('otsikko3'))
  })

after(async () => {
  await mongoose.connection.close()
})