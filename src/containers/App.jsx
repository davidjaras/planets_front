import React, { useEffect, useState } from 'react';

// Styles
import '../assets/styles/App.scss'

// Components
import Header from '../components/Header';
import Planets from '../components/Planets';
import Carousel from '../components/Carousel';
import CarouselPlanetItem from '../components/CarouselPlanetItem';
import Footer from '../components/Footer';

const { REACT_APP_API_SERVICE } = process.env;

const App = () => {
  
  // Array of objects: Planets State
  const [planets, setPlanets] = useState([])

  // Get all from API
  useEffect(() => {
    fetch(REACT_APP_API_SERVICE)
      .then(response => response.json())
      .then(data => setPlanets(data));
  }, []);

  //Update state with new planet
  const addNewData = (data) => {
    setPlanets([data, ...planets].sort(function (a, b) {
      var planetA = a.name;
      var planetB = b.name;
      return (planetA < planetB) ? -1 : (planetA > planetB) ? 1 : 0;
    }));
  }

  // Find the planet and update
  const onEditPlanet = (item) => {
    let objIndex = planets.findIndex((planet => planet.id == item.id))
    planets[objIndex].name = item.name
    planets[objIndex].satellites = item.satellites
    planets[objIndex].diameter = item.diameter
  }

  // Delete planet selected
  const onDeletePlanet = (id) => {
    setPlanets(
      planets.filter(planet => planet.id !== id)
    )
  }
  

  return (
    <div className="App">
      <Header onAddNewData={(data) => addNewData(data)}/>

      <Planets title='Planets list'>
      {
        planets.length > 0 ?
        <Carousel>
          {planets.map(item =>
            <CarouselPlanetItem 
            key={item.id} 
            item={item}
            onDeletePlanet={(id) => onDeletePlanet(id)}
            onEditPlanet={(item) => onEditPlanet(item)}
            />
          )}
        </Carousel> :
        <h1 className="no-planets">There are no planets</h1>
      }
      </Planets>
     

      <Footer />
    </div>
  )
}

export default App;