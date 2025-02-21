const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.9dbj5.mongodb.net/test?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url).then(() => {
    const blogSchema = new mongoose.Schema({
        title: String,
        author: String,
        url: String,
        likes: Number
      })

    const Blog = mongoose.model('Blog', blogSchema)

    const blog1 = new Blog({
      title: 'otsikko1',
      author: 'tekijä1',
      url: 'url1',
      likes: 1
    })

    const blog2 = new Blog({
      title: 'otsikko2',
      author: 'tekijä2',
      url: 'url2',
      likes: 2
    })

    blog1.save().then(result => {
      console.log('blog1 saved!')
    })

    blog2.save().then(result => {
      console.log('blog2 saved!')
    })

    Blog.find({}).then(result => {
        result.forEach(blog => {
          console.log(blog)
        })
        mongoose.connection.close()
      })
    })