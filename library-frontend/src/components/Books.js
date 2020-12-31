import React, { useState } from "react"
import { useQuery, useSubscription, useApolloClient } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { BOOK_ADDED } from "../subscriptions"
const Books = (props) => {
  const { loading, error, data } = useQuery(ALL_BOOKS)
  const [filterGenre, setFilterGenre] = useState("all")
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    //assume unique title
    const includedIn = (books, object) =>
      books.map((book) => book.title).includes(object.title)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      console.log(`data not include`, dataInStore.allBooks.concat(addedBook))
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(
        `New book ${addedBook.title} by ${addedBook.author.name} added`
      )
      updateCacheWith(addedBook)
    },
  })

  if (!props.show) {
    return null
  }

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  const books = data.allBooks

  let genresSet = []
  for (const book of books) {
    for (const genre of book.genres) {
      if (!genresSet.includes(genre)) {
        genresSet = [...genresSet, genre]
      }
    }
  }

  const renderGenresButtons = () => {
    return (
      <>
        {genresSet.map((genre) => (
          <button key={genre} onClick={() => setFilterGenre(genre)}>
            {genre}
          </button>
        ))}
        <button key={"all"} onClick={() => setFilterGenre("all")}>
          alll
        </button>
      </>
    )
  }

  const renderBooks = () => {
    const filteredBooks =
      filterGenre !== "all"
        ? books.filter((book) => book.genres.includes(filterGenre))
        : books
    return filteredBooks.map((book) => (
      <tr key={book.title}>
        <td>{book.title}</td>
        <td>{book.author.name}</td>
        <td>{book.published}</td>
        <td>{book.genres.toString()}</td>
      </tr>
    ))
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {renderBooks()}
        </tbody>
      </table>

      <div>{renderGenresButtons()}</div>
    </div>
  )
}

export default Books
