require('./models')

const { db } = require('./models/blog')
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
    newBlog.comments.push(newComment)
    // saving is
    await newBlog.save()
    
    // READ find one comment -- child methods not async
    const comment = newBlog.comments.id(newBlog.comments[0].id)
    console.log(comment)
   
    // UPDATE
    comment.content = comment.content + ' 🌈'
    await newBlog.save() // must save parent

    // DESTROY
    newBlog.comments[1].remove()
    await newBlog.save() //save parent
    console.log(newBlog)
  } catch (err) {
    
  }
}

// commentCrud()

// N:M tags comments CRUD
// https://mongoosejs.com/docs/populate.html
const tagCrud = async () => {
  try {
    // create tag
    // const newTag = await Tag.create({
    //   name: 'mongoose',
    // })
    // // find blog
    // const blog = await Blog.findOne({})
    // blog.tags.push(newTag)
    // await blog.save()
    // newTag.blogs.push(blog)
    // newTag.save()
    // const tag = await Tag.find({})

    // find a blog and include the tags
    const taggedBlogs = await Blog.find({}).populate('tags')
    // console.log(taggedBlog[0].tags)
    const tagWithBlogs = await Tag.find({}).populate('blogs')
    // console.log(tagWithBlogs[0].blogs)
    const poulateBlogTags = await Tag.find({}).populate({
      path: 'blogs',
      populate: {
        path: 'tags'
      }
    })
    // console.log(poulateBlogTags[0].blogs)
  } catch (err) {
    console.log(err)
  }
}

// tagCrud() 

const userCrud = async () => {
  try {
    const user = await  User.create({
      name: 'Weston',
      email: 'weston@weston.com',
      dob: new Date()
    })
    const blog =  await Blog.findOne({ id: "623294f2583adf58ba7cd280" })
    user.blogs.push(blog)
    await user.save()
    blog.blogger = user
    await blog.save()
    console.log(user, blog)
    // console.log(blog)

    // read 
    const foundUser = await User.findOne({ name: 'Weston' }).populate({
      path: 'blogs',
      populate: {
        path: 'tags'
      }
    })
    console.log(foundUser)
  } catch (err) {
    console.log(err)
  }
}

userCrud()