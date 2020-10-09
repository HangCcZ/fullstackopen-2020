const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')

const api = supertest(app)

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]
describe('total likes', () => {
  test('total likes from all blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blogs', () => {
  test(' most like is Canonical string reduction', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('most likes', () => {
  test('most likes from all blogs', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})

describe('api test', () => {
  test('get request', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(1)
  })
})

describe('verifying existence of properties', () => {
  test('verify existence of id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('vetify if likes property is missing from the request, the default value should be 0', async () => {
    const newBlog = {
      title: 'Third Story',
      author: 'Hang',
      url: 'google.com',
    }

    const postResponse = await api.post('/api/blogs').send(newBlog)
    expect(postResponse.body.likes).toBe(0)
  })
})

describe('verifying HTTP POST', () => {
  test('verify total number of blogs increased by one after POST', async () => {
    const newBlog = {
      title: 'Third Story',
      author: 'Hang',
      url: 'google.com',
      likes: 666,
    }

    await api.post('/api/blogs').send(newBlog)

    const postResponse = await api.get('/api/blogs')

    const contents = postResponse.body.map((r) => r.title)
    expect(contents).toContain('Second Story')
  })

  test('verifies that if the title and url properties are missing from request,backend respond 400 Bad request', async () => {
    const newBlog = {
      author: 'Hang',
      likes: 666,
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
