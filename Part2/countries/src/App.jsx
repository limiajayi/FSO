import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    countriesService
    .getAll()
    .then(initialCountries => setCountries(initialCountries))
  }, [])

  const countriesToShow = searchValue ? countries.filter(country => country.toLowerCase().includes(searchValue)) : countries

  return (
    <>
    <div>
      find countries: 

      <input value={searchValue} onChange={({ target }) => {setSearchValue(target.value)}}  />

        {countriesToShow.length > 10 ? <p>Too many matches, specify another filter</p> : countriesToShow.map((country, index) => <p key={index}>{country}</p> )}

    </div>
    </>
  )
}

export default App
