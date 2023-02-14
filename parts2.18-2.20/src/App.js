import { useState, useEffect } from 'react';
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
// muuttujassa api_key on nyt käynnistyksessä annettu API-avaimen arvo
//käynnistyessä käytetään komentoa: REACT_APP_API_KEY="key_here" npm start

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [allCountriesData, setAllCountriesData] = useState([])
  const [capitalWeatherData, setCapitalWeatherData] = useState([])

  useEffect(() => {
    if (countries) {
      console.log('fetching country data...')
      axios
        .get(`https://restcountries.com/v3.1/all`)
        .then(response => {
          setCountries(response.data.map(country => country.name.common))
          setAllCountriesData(response.data)
        })
    }
  }, [])
  const handleSearchTerm = (event) => {setSearchTerm(event.target.value)} 
      
  const filterCountries = () =>  {
    setFilteredCountries(
      countries.filter(x => x.toLowerCase()
      .includes(searchTerm.toLowerCase()))
      .slice(0,5)
      )}

  const selectCountry = (countryName) => {
    setCapitalWeatherData([])
    setFilteredCountries([countryName])
  }
  const getWeatherData = (lon, lat) => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lon}&lon=${lat}&appid=${api_key}`)
    .then( response => 
       
       setCapitalWeatherData(response.data)
      )
      console.log(capitalWeatherData) 
    }
  
  return (
    <div >
        <div>find countries<input value={searchTerm} onChange={handleSearchTerm}></input>
          <button onClick={() => filterCountries()}>Search</button>
        </div>
      <br/>
      
      {(filteredCountries.length == 1
      ?
      <div> 
          {allCountriesData.filter(x => x.name.common === filteredCountries[0]).map(x =>
            <div key={x.name.common}>
              <h2>Country: {x.name.common}</h2>
              <h3>Capital: {x.capital}</h3>
              <h3>area: {x.area} km²</h3>
              <h2>languages</h2>
                <ul>
                  {Object.entries(x.languages).map(([code, language]) => (
                    <li key={code}>
                      {language}
                    </li>
                  ))}
                </ul>
              <img src={x.flags.png}/>
              <br></br>
              <button onClick={() => {getWeatherData(x.latlng[0], x.latlng[1])}}>Update Weather in {x.capital}</button>
              {(capitalWeatherData.length ==0
              ?
             ''
              :
              <div>
                Weather: {Math.round((capitalWeatherData.main.temp-273.15))+"°"}
                <img src={`http://openweathermap.org/img/wn/${capitalWeatherData.weather[0].icon}@2x.png`}/>
                <div>Wind speed: {capitalWeatherData.wind.speed} m/s</div>
             </div>
                )}
            </div>
            )}
     </div>
      :
        (searchTerm === '' 
        ?
        <div>too many matches, specify another filter</div>
        :
        <div>
          {filteredCountries.map(x => 
          <div key={x}>{x} <button onClick={() => selectCountry(x)}>Show info</button></div>)}
        </div> 
        )
        )}
    </div>
  );
}

export default App;
