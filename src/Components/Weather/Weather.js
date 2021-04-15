import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, ListGroup } from 'react-bootstrap';

class Weather extends React.Component {
  render() {
    let weather = this.props.weather.map((item, index) => <ListGroup.Item key={index}> {item.date} - {item.description} </ListGroup.Item>);
    return <Jumbotron><ListGroup variant="flush">{weather}</ListGroup></Jumbotron>;
  }
}

export default Weather;
