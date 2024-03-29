import axios from "axios"
import { useEffect, useState } from "react"

const API_KEY = process.env.REACT_APP_API_KEY

const WeatherInfo = ({location}) => {
  const [weather, setWeather] = useState({})

  const weatherHook = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }
  useEffect(weatherHook, [])

  if (Object.keys(weather).length === 0) { return (<div></div>) }
  const imgUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  return (
    <div>
      <h3>Weather in {location.city}</h3>
      <div>temperature {weather.main.temp} Celsius</div>
      <img src={imgUrl} alt={weather.weather[0].description} />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}


const CountryPage = ({data}) => {
  const loc = {
    city: data.capital[0],
    lat: data.capitalInfo.latlng[0],
    lon: data.capitalInfo.latlng[1],
  }
  return (
    <div>
      <h2>{data.name.common}</h2>
      <div>capital {data.capital[0]}</div>
      <div>area {data.area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.values(data.languages).map((v) => <li key={v}>{v}</li>)}
      </ul>
      <img src={data.flags.png} alt={data.name.common} width={150} />
      <WeatherInfo location={loc} />
    </div>
  )
}

const Country = ({data, onClickFn}) => {
  return (
    <div>
      {data.name.common}
      <button onClick={onClickFn}> Show </button>
    </div>
  )
}

const Countries = ({data}) => {
  const [clicked, setClicked] = useState(-1)
  const onClickFn = (index) => {
    return () => {setClicked(index)}
  }
  let toShow;
  if (clicked >= 0) {
    toShow = <CountryPage data={data[clicked]} />
  } else {
    toShow = data.map((c, ind) => {
      return (
        <Country key={c.name.common} data={c} onClickFn={onClickFn(ind)}/>
      )
    })
 }
  return (
    <div>
      { toShow }
    </div>
  )
}

const FilterResult = ({filtered}) => {
  let toShow;
  if (filtered.length === 0) {
    return
  } else if (filtered.length === 1) {
    toShow = <CountryPage data={filtered[0]} />
  } else if (filtered.length > 10) {
    toShow = "Too many matches, specify another filter"
  } else {
    toShow = <Countries data={filtered} />
  }
  return (<div> {toShow} </div> )
}

const Filter = ({rawData}) => {
  const [countryFilter, setCountryFilter] = useState("")

  const onFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const countriesToShow = countryFilter
    ? rawData.filter((c) => c.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
    : []


  return (
    <div>
      find countries <input value={countryFilter} onChange={onFilterChange} />
      <FilterResult filtered={countriesToShow} />
    </div>
  )
}


function App() {
  const [countries, setCountries] = useState([])

  const restHook = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(restHook, [])




  return (
    <div>
      <Filter rawData={countries}/>
    </div>
  );
}

export default App;
