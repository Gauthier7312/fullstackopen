import React, {useState, useEffect} from 'react'
import axios from 'axios';
// composant country
const Country = ({country, handleShow}) => {
  return(
    <div>
      <strong>{country.name}</strong> 
    <button type="button" value={country.name} onClick={() => handleShow(country.name)}><strong>Show</strong></button>
    </div>
  )
}

// composant Temeprature
const Temperature = ({Tempera}) => {
  console.log('Temp',Tempera)
  if(Tempera !== '')
  return(
    <div>
      <strong>temperature: {Tempera.current.temperature} celcius </strong>
      <div>
      <img alt='weather icon' src={Tempera.current.weather_icons[0]} />
      </div>
      <div>
      <strong>wind: {Tempera.current.wind_speed} mph direction {Tempera.current.wind_dir} </strong>
      </div>
    </div>
  )
  return <div>Api is not valide</div>;
}
// composant CountryAl
const CountryAll = ({country}) => {
  const [temperature, setTemperature] = useState('')
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=New%20York`)
      .then((response) => {
        if (response.data.success !== false) {
          setTemperature(response.data);
        }
      });
  });

  return(
    <div>
      <h1>{country.name}</h1>
      <div>
        <p>capital: {country.capital}</p>
        <p>population {country.population}</p>
      </div>
      <div>
        <h3>Languages</h3>
        <ul>
        {country.languages.map((language,i) => <li key={i}>{language.name}</li>)}
        </ul>
        <img alt={country.name} src={country.flag} height="150px" />
        <h2>{`Weather in ${country.capital}`}</h2>
        <Temperature Tempera={temperature} />
      </div>

    </div>
  )
}

// composant search
const Search = ({handleValue, handleChange}) => {
  return(
    <div>
      <input value={handleValue} onChange={handleChange} />
    </div>
  )
}
// composant Results

const Results = ({filterCount, handleShow}) => {
  if(filterCount.length > 10){
    return <div>Too many matches, specify another filter</div>
  }
  if(filterCount.length > 1 && filterCount.length < 10){
    return(
      filterCount.map((coun) => (
        <Country 
        key={coun.name}
        country={coun}
        handleShow={handleShow} />
      ))
    )
  }
  if(filterCount.length === 1){
    return <CountryAll country={filterCount[0]} />;
  }
  return <div>No matching results, specify another filter</div>
}

// composant App
const App = ({count}) =>{
  console.log('count',count)

  const [search, setSearch] = useState('')
  const [filtre, setFiltre] = useState(count)

  const handleChange = (e) =>{
    console.log('target',e.target.value)
    setSearch(e.target.value)
    setFiltre(
      count.filter((coun) =>coun.name.toLowerCase().includes(e.target.value.toLocaleLowerCase()))
    )
  }

  const handleShow = (name) =>{
    setSearch(name)
    setFiltre(
      count.filter((coun) => coun.name === name))
  }

  return (
    <div>
      <h1>Find Countries</h1>
      <Search handleValue={search} handleChange={handleChange} />
      <Results filterCount={filtre} handleShow={handleShow}  />
    </div>
  )
}

export default App;