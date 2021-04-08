import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSearch(this.textInput.current.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" ref={this.textInput} />
        </label>
        <input type="submit" value="Explore!" />
      </form>
    );
  }
}

export default Search