const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/Blog')
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(2)
    })

    test('identiyfying field must be id', async () => {
        const response = await api.get('/api/blogs')
        //console.log(response, "this is the response")
        const contents = response.body.map(r => r._id)
        console.log(contents)
        expect(contents).toBeDefined() //check that the list of ids is not undefined
    })

    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: "Test title",
            author: "Mr tester",
            url: "https://codingtester.com/",
            likes: 100,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const contents = blogsAtEnd.map(n => n.title)
        expect(contents).toContain(
            'Test title'
        )
    })


    test('a valid blog can be deleted ', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete._id}`)
            .expect(204)
        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const ids = blogsAtEnd.map(r => r._id)
        expect(ids).not.toContain(blogToDelete._id)
    })

afterAll(async () => {
    await mongoose.connection.close()
})
