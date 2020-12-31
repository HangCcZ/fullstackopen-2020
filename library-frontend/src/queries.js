import { gql } from "@apollo/client"
export const ALL_BOOKS = gql`
  query findAllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const CURRENT_USER = gql`
  query getCurrentUser {
    me {
      favoriteGenre
    }
  }
`
