import { useEffect, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './services/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import FormSearch from './components/FormSearch'
import banner from './assets/img/embanner.png'

function App() {

  const randomLocation = getRandomNumber(126)
  const [locationSelected, setLocationSelected] = useState(randomLocation)

  const url = `https://rickandmortyapi.com/api/location/${locationSelected ||getRandomNumber(126) }`;
  const [ location, getLocation, hasError ] = useFetch(url)

  useEffect(() => {
    getLocation()
  }, [locationSelected])

 

  return (
    <div className='app'>
      <header>
        <img className='banner__em' src={banner} alt="" />
      </header>
     <h1 className='app__title'>Rick and Morty</h1> 
     
     <FormSearch setLocationSelected={setLocationSelected} />
      {hasError ? ( 
       <h2 className='app__error'>Hey you must provide an ID from 1 TO 126 🤡</h2>
      ) : (
        <>
          <LocationInfo location={location} />  
          <div className='container-resident'>
            {location?.residents.map(url => (
             <ResidentCard key={url} url={url} />
          ))}
         </div>
       </>
      )}
    </div>
  );
}  

export default App
