import React  from 'react';
import axios from 'axios';


import City from './Components/City/City';
import Error from './Components/Error/Error';
import Header from './Components/Header/Header';
import Movies from './Components/Movies/Movies';
import Search from './Components/Search/Search';
import Weather from './Components/Weather/Weather';

import './App.css';


const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveSearched: false,
      citySearched: '',
      locationData: {},
      weather: [],
      movies: [],
      errors: '',
    };
  }

  showSearch = () => {
    this.setState({haveSearched: false});
  }
 
  handleSearch = async(citySearched) => {
    if(!citySearched) {
      console.warn('No City Searched');
    } else {
      try {
        let response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${citySearched}&format=json&limit=1`);
        let weather = await axios.get(`${SERVER_URL}/weather`, {
          params: {
            lat: response.data[0].lat,
            lon: response.data[0].lon
          }
        });
        let movies = await axios.get(`${SERVER_URL}/movies`, {
          params: {
            location: citySearched
          }
        });
        console.log(movies.data);
        this.setState({
          haveSearched: true,
          citySearched: citySearched,
          locationData: response.data[0],
          weather: weather.data,
          movies: movies.data,
        });
      } catch (err) {
        this.setState({
          errors: err.toString(),
          haveSearched: false,
        });
      }
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.state.haveSearched && this.state.errors.length === 0 ? 
          <> 
            <City handleShowSearch={this.showSearch} cityData={this.state.locationData} /> 
            <Weather weather={this.state.weather} />
            <Movies movies={this.state.movies} />
          </>: 
          this.state.errors.length !== 0 ?
            <Error handleSearch={this.handleSearch} errors={this.state.errors} /> :
            <Search handleSearch={this.handleSearch} />}
      </>
    );
  }
}

export default App;
