const { ApolloServer, gql } = require("apollo-server")

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
]

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: String!
    genres: [String!]!
  }

  type Author {
    name: String!
    bookCount: Int
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => {
      // let newSet = new Set()
      // for (const book of books) {
      //   if (!newSet.has(book.author)) {
      //     newSet.add(book.author)
      //   }
      // }
      // return newSet.size
      return authors.length
    },
    allBooks: (root, { author, genre }) => {
      if (author && genre) {
        return books.filter(
          (book) => book.author === author && book.genres.includes(genre)
        )
      } else if (author) {
        return books.filter((book) => book.author === author)
      } else if (genre) {
        return books.filter((book) => book.genres.includes(genre))
      } else {
        return books
      }
    },

    allAuthors: () => {
      let authorBookCount = new Map()
      for (const book of books) {
        authorBookCount.set(
          book.author,
          authorBookCount.get(book.author) + 1 || 1
        )
      }
      let result = []
      for (const [key, val] of authorBookCount) {
        let author = authors.find((author) => author.name === key)
        result.push({ name: author.name, bookCount: val, born: author.born })
      }
      return result
    },
  },
  Mutation: {
    addBook: (root, { title, author, published, genres }) => {
      if (!authors.includes(author)) {
        authors.push({
          name: author,
          born: null,
          id: Math.floor(Math.random() * 1000),
        })
      }
      const book = { title, author, published, genres }
      books.push(book)
      return book
    },
    editAuthor: (root, { name, setBornTo }) => {
      let foundAuthor = authors.find((author) => author.name === name)
      if (foundAuthor) {
        let editedAuthor = { ...foundAuthor, born: setBornTo }
        authors = authors.map((author) =>
          author.name === name ? editedAuthor : author
        )
        return { name: editedAuthor.name, born: editedAuthor.born }
      } else {
        return null
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
