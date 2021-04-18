import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Button } from 'react-bootstrap';

import './Error.css';

class Error extends React.Component {
  refreshPage = () => {
    window.location.reload();
  }

  render() {
    return (
      <Jumbotron fluid>
        <h1>Opps! Something went wrong.</h1>
        <p>{this.props.errors}</p>
        <Button onClick={this.refreshPage} variant="primary" type="submit">
          Search again
        </Button>
      </Jumbotron>
    );
  }
}

export default Error;
