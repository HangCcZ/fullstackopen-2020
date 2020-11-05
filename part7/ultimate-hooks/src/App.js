import React, { useState, useEffect } from "react"

import axios from "axios"

let token = null

const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue("")
  }

  return {
    type,
    value,
    onChange,
    onReset,
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    getAll()
  }, [])

  const setToken = (newToken) => {
    token = `bearer ${newToken}`
  }

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources([...response.data])
  }

  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    setResources([...resources, response.data])
  }

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl} /${id}`, newObject)
    setResources(
      resources.map((resource) =>
        resource.id === id ? resource : response.data
      )
    )
  }

  const service = {
    create,
    getAll,
    setToken,
    update,
  }

  return [resources, service]
}

const App = () => {
  const content = useField("text")
  const name = useField("text")
  const number = useField("text")

  const [notes, noteService] = useResource("http://localhost:3005/notes")
  const [persons, personService] = useResource("http://localhost:3005/persons")

  const handleNoteSubmit = (event) => {
    event.preventDefault()

    noteService.create({ content: content.value })
    content.onReset()
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()

    personService.create({ name: name.value, number: number.value })
    name.onReset()
    number.onReset()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  )
}

export default App
