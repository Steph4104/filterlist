import React, { Component } from 'react';
import { withNamespaces, NamespacesConsumer, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
//import { toElement as scrollToElement } from '@utils/scroll';
//import Logo from './img/logo_paveunisousa.jpg';
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

  // scrollToPage(pageSelector) {
  //   const nextPage = document.querySelector(pageSelector);
  //   scrollToElement(nextPage);
  // }

  render() {
    const { t, i18n } = this.props;
    var lang = t('lang');
    return (
      <div>
        <div className="header">
          <h1>Pavé Uni Sousa</h1>
          <h3>Réalisations</h3>
        </div>
     
      <nav
        ref={(elem) => {
          this.nav = elem;
        }}
      >
        <div className="menu">
          {/* <div className="menu-item logo">
            <img className="img-logo" src={Logo}/>
          </div> */}
          {/* <div
            className="menu-item active"
           
          >
           {t('menu.about')}
          </div>
          <div
            className="menu-item"
           
          >
            {t('menu.project')}
          </div>
          <div
            className="menu-item"
            
          >
            {t('menu.contact')}
          </div> */}
          <div
            className="menu-item"
            onClick={() => i18n.changeLanguage(lang)}
          >
            {t('lang')}
          </div>
        </div>
      </nav> 
      </div>
    );
  }
}

Menu.contextTypes = {
  theme: PropTypes.any,
  switchTheme: PropTypes.func
};

export default withNamespaces('translation')(Menu);
