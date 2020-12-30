const { ApolloServer, gql, UserInputError } = require("apollo-server")
const mongoose = require("mongoose")
const Author = require("./models/Author")
const Book = require("./models/Book")
const User = require("./models/User")
const config = require("./config")
const jwt = require("jsonwebtoken")

const JWT_SECRET = "NEED_HERE_A_SECRET_KEY"

console.log("connecting to", config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String
    id: String!
    bookCount: Int!
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => {
      return Author.collection.countDocuments()
    },
    allBooks: async (root, { author, genre }) => {
      if (author && genre) {
        return books.filter(
          (book) => book.author === author && book.genres.includes(genre)
        )
      } else if (author) {
        return books.filter((book) => book.author === author)
      } else if (genre) {
        return Book.find({ genres: { $in: genre } })
      } else {
        return Book.find({}).populate("author", {
          name: 1,
          born: 1,
        })
      }
    },

    allAuthors: async () => {
      const authors = await Author.find({}).lean()
      return authors
    },

    me: (root, args, { currentUser }) => {
      return currentUser
    },
  },
  Mutation: {
    addBook: async (
      root,
      { title, author, published, genres },
      { currentUser }
    ) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      let existAuthor = await Author.findOne({ name: author })
      if (!existAuthor) {
        const newAuthor = new Author({
          name: author,
          born: 0,
          bookCount: 0,
        })
        existAuthor = newAuthor
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const book = new Book({ title, author: existAuthor, published, genres })

      try {
        const newBook = await book.save()
        existAuthor.bookCount = existAuthor.bookCount + 1
        await existAuthor.save()
        return newBook
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, { name, setBornTo }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const foundAuthor = await Author.findOne({ name })
      if (foundAuthor) {
        foundAuthor.born = setBornTo
        return foundAuthor.save()
      } else {
        return null
      }
    },
    createUser: async (root, { username, favoriteGenre }) => {
      const user = new User({ username, favoriteGenre })
      try {
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })

      if (!user || password !== "123") {
        throw new UserInputError("Wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
