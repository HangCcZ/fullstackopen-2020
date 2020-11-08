import React, { useState, useEffect } from "react"
import axios from "axios"

const urlAddress = (name) => {
  return `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
}

const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }
  console.log("input field updated as well")
  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  // name, capital, population, flag
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respond = await axios(urlAddress(name))
        const fetchedCountry = {
          name: respond.data[0].name,
          capital: respond.data[0].capital,
          population: respond.data[0].population,
          flag: respond.data[0].flag,
          found: true,
        }

        setCountry(fetchedCountry)
      } catch (exception) {
        if (name !== "") {
          setCountry({ found: false })
        } else {
          setCountry(null)
        }
      }
    }

    fetchData()
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flag} height='100' alt={`flag of ${country.name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField("text")
  const [name, setName] = useState("")
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
