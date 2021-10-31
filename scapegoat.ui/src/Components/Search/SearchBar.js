import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SearchInput extends Component {
  state = {
    searchInput: ''
  }

   handleSubmit = (e) => {
     e.preventDefault();
     this.props.history.push(`/search/${this.state.searchInput}`);

     this.setState({
       searchInput: ''
     });
   }

   handleChange = (e) => {
     this.setState({
       [e.target.name]: e.target.value,
     });
   }

   render() {
     return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='text' className='search-input' value={this.state.searchInput} placeholder='Search...' onChange={this.handleChange} />
      </form>
     );
   }
}

export default withRouter(SearchInput);
