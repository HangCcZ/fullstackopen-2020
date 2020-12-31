import React, { useState, useEffect } from "react"
import { useQuery, useLazyQuery } from "@apollo/client"
import { CURRENT_USER, ALL_BOOKS } from "../queries"

const Recommend = (props) => {
  const {
    loading: loading_user,
    error: user_error,
    data: user_data,
  } = useQuery(CURRENT_USER)

  const currentUser = loading_user ? null : user_data.me

  const [books, setBooks] = useState(null)
  const [loadFavoriteGenre, { loading_books, data }] = useLazyQuery(ALL_BOOKS, {
    variables: { genre: loading_user ? null : currentUser.favoriteGenre },
    onCompleted: (data) => {
      console.log(currentUser.favoriteGenre)
      console.log(data.allBooks)
      setBooks(data.allBooks)
    },
  })

  useEffect(() => {
    if (currentUser) {
      loadFavoriteGenre()
    }
  }, [currentUser]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  if (loading_user || !books) {
    return "Loading"
  }
  if (user_error) return `Error! ${user_error.message}`

  return (
    <>
      <h2>{`Recommendations based on your favorite genre:${currentUser.favoriteGenre}`}</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books
            .filter((book) => book.genres.includes(currentUser.favoriteGenre))
            .map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
                <td>{book.genres.toString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default Recommend
