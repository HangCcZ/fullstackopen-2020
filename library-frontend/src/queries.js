import { gql } from "@apollo/client"
export const ALL_BOOKS = gql`
  query findAllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author
      published
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
