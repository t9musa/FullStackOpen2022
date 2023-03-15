const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Initial title for testing num1',
        author: 'testerman 1',
        url: 'www.test1.com',
        likes: 12
    },
    {
        title: 'Initial title for testing num2',
        author: 'testerman 2',
        url: 'www.test2.com',
        likes: 15
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}