import React  from 'react';
import axios from 'axios';

import Header from './Components/Header/Header';
import Search from './Components/Search/Search';
import City from './Components/City/City';
import Error from './Components/Error/Error';
import Weather from './Components/Weather/Weather';

import './App.css'

const WEATHER_URL = process.env.REACT_APP_WEATHER_URL || 'http://localhost:3001/weather'; 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveSearched: false,
      citySearched: '',
      locationData: {},
      weather: [],
      errors: [],
    };
  }

  showSearch = () => {
    this.setState({haveSearched: false});
  }

  handleSearch = async(citySearched) => {
    if(!citySearched) {
      console.warn('No City Selected');
    } else {
      try {
        // TODO: Handle Weather
        let response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${citySearched}&format=json&limit=1`);
        let weather = await axios.get(`${WEATHER_URL}?lat=${response.data.lat}?lon=${response.data.lon}`);
        this.setState({
          haveSearched: true,
          citySearched: citySearched,
          locationData: response.data[0],
          weather: weather.data,
        });
      } catch (err) {
        console.log(err.response);
        this.setState({
          errors: [{status: err.response.status, errorMsg: err.response.data.error}],
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
          </>: 
          this.state.errors.length !== 0 ?
          <Error handleSearch={this.handleSearch} errors={this.state.errors} /> :
          <Search handleSearch={this.handleSearch} />}
      </>
    );
  }
}

export default App;
