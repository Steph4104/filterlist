import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import '../styles/Menu.scss';

class Menu extends Component {

  render() {

    return (
      <div>
        <div className="header">
          <h1>Recettes</h1>
     
          <nav>
            <Link to="/Add">
              <button class="btn btn-success btn-flat">Add</button>
            </Link>   
          </nav> 
        </div>
      </div>
    );
  }
}

export default (Menu);
