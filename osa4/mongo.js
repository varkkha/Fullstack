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
    const blogSchema = mongoose.Schema({
        title: String,
        author: String,
        url: String,
        likes: Number
      })

    const Blog = mongoose.model('Blog', blogSchema)

    Blog.find({}).then(result => {
        result.forEach(blog => {
          console.log(blog)
        })
        mongoose.connection.close()
      })
    })