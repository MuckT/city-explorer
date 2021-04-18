import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

// import './Movies.css';


class Movies extends React.Component {
  render() {
    let movies = this.props.movies.map(item => <img src={item.image_url} alt={item.title}/>);
    return <div>{movies}</div>;
  }
}

export default Movies;
