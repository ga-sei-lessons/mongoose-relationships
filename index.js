require('./models')

const Blog = require('./models/blog')
const Tag = require('./models/tag')
const User = require('./models/user')

// blog/comment CRUD - 1:M subdoc
// https://mongoosejs.com/docs/subdocs.html
const commentCrud = async () => {
  try {
    // CREATE -- blog and comment
    const filter = {
      title: 'I love mongoose',
    }

    const blog = {
      body: 'you should really try mongoose, its great',
    }

    const newBlog = await Blog.findOneAndUpdate(filter, blog, { upsert: true })

    // console.log(newBlog)

    const newComment = {
      header: 'So true, 👏',
      content: 'I just love mongoos as well',
      date: new Date()
    }

    // pushing is not async
    // newBlog.comments.push(newComment)
    // saving is
    // await newBlog.save()
    
    // READ find one comment -- child methods not async
    const comment = newBlog.comments.id(newBlog.comments[0].id)
    console.log(comment)
   
    // UPDATE
    comment.content = comment.content + ' 🌈'
    await newBlog.save() // must save parent

    // DESTROY
    newBlog.comments[1].remove()
    await newBlog.save()
    console.log(newBlog)
  } catch (err) {
    
  }
}

commentCrud()