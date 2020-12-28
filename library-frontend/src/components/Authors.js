import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"
import { EDIT_AUTHOR } from "../mutations"
import Select from "react-select"

const Authors = (props) => {
  const [born, setBorn] = useState("")
  const [selectedOption, setSelectedOption] = useState(null)

  const { loading, error, data } = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  if (!props.show) {
    return null
  }

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  let options = []
  const authors = data.allAuthors
  for (const author of authors) {
    options.push({ value: author.name, label: author.name })
  }

  const submit = async (event) => {
    console.log(selectedOption)
    event.preventDefault()
    editAuthor({
      variables: { name: selectedOption.value, setBornTo: parseInt(born) },
    })

    setBorn("")
    setSelectedOption("null")
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div className='App'>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>

        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>

        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
