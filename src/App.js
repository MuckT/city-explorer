import React from 'react';
import axios from 'axios';

import Search from './Components/Search';
import City from './Components/City';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      haveSearched: false,
      citySearched: '',
    };
  }

  showSearch = () => {
    this.setState({haveSearched: false});
  }

  handleSearch = async(citySearched) => {
    // TODO: Handle searches from multiple regions
    let response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${citySearched}&format=json&limit=1`);
    console.log(response);
    this.setState({
      haveSearched: true,
      citySearched: citySearched,
      locationData: response.data[0],
    });
  }

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        {this.state.haveWeSearchedYet ? 
          <City handleShowSearch={this.handleShowSearch} cityData={this.state.locationData} /> : 
          <Search handleSearch={this.handleSearch} />}
      </>
    );
  }
}

export default App;
