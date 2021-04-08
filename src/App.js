import React  from 'react';
import axios from 'axios';

import Header from './Components/Header/Header';
import Search from './Components/Search/Search';
import City from './Components/City/City';

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      haveSearched: false,
      citySearched: '',
      locationData: {},
    };
  }

  

  showSearch = () => {
    this.setState({haveSearched: false});
  }

  handleSearch = async(citySearched) => {
    if(!citySearched) {
      console.warn('No City Selected');
    } else {
      // TODO: Handle searches from multiple regions
      let response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${citySearched}&format=json&limit=1`);
      this.setState({
        haveSearched: true,
        citySearched: citySearched,
        locationData: response.data[0],
      });
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.state.haveSearched ? 
          <City handleShowSearch={this.showSearch} cityData={this.state.locationData} /> : 
          <Search handleSearch={this.handleSearch} />}
      </>
    );
  }
}

export default App;
