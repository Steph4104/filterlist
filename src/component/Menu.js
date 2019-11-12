import React, { Component } from 'react';
import { withNamespaces, NamespacesConsumer, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import '../styles/Menu.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      isSticky: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.pageYOffset > this.nav.offsetTop) {
      this.setState({
        isSticky: true
      });
    } else {
      this.setState({
        isSticky: false
      });
    }
  }

  render() {
    const { t, i18n } = this.props;
    var lang = t('lang');
    return (
      <div>
        <div className="header">
          <h1>Recettes</h1>
     
      <nav
        ref={(elem) => {
          this.nav = elem;
        }}
      >
      <Link to="/Add">Add</Link>   
      </nav> 
      </div></div>
    );
  }
}

Menu.contextTypes = {
  theme: PropTypes.any,
  switchTheme: PropTypes.func
};

export default withNamespaces('translation')(Menu);
