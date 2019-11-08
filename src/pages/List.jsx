/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import {createBrowserHistory} from 'history';
import {
  createFilterlist,
  createListStateShape,
  listActionsShape,
} from '@vtaits/react-filterlist';
import '../styles/List.scss';
import Paginator from '../component/Paginator';
import Th from '../component/Th';

import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle, CardColumns, Form, Label, Input, FormGroup, Button, ButtonGroup } from 'reactstrap';

import * as api from '../component/api';

import Example from '../component/Menu';
import { NavLink, Link } from 'react-router-dom'
import { withNamespaces, NamespacesConsumer, Trans } from 'react-i18next';
import styled from "styled-components";

/**
 * @param {...String} queryNames
 */


 
class List extends Component {
  static propTypes = {
    isListInited: PropTypes.bool.isRequired,
    listState: createListStateShape({}),
    listActions: listActionsShape,
  }

  static defaultProps = {
    listState: null,
    listActions: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      src:"",
      isExpanded: false
    };
    this.toggle = this.toggle.bind(this);
    this.togglepoulet = this.toggleCheckbox.bind(this, 'poulet');
    this.togglediana = this.toggleCheckbox.bind(this, 'diana');
    this.toggledejeuner = this.toggleCheckbox.bind(this, 'dejeuner');
    this.toggleoeuf = this.toggleCheckbox.bind(this, 'oeuf');
    this.togglebbq = this.toggleCheckbox.bind(this, 'bbq');
    this.togglesteak = this.toggleCheckbox.bind(this, 'steak');
    this.resetAll = this.resetAll.bind(this);
    this.setPerPage = this.setPerPage.bind(this);
    this.setPage = this.setPage.bind(this);

    this.reloadListener();
  }

  

  toggle(src) {
  this.setState(prevState => ({
    modal: !prevState.modal,
    src:src
  }));
}
  reloadListener() {
    const browserHistory = createBrowserHistory();
    if (window.performance) {
      if (performance.navigation.type == 1) {
        this.props.history.push('');      
      } 
    }
  }

  setInputFilterValue(filterName, { target: { value } }) {
    const {
      listActions: {
        setFilterValue,
      },
    } = this.props;

    setFilterValue(filterName, value);
  }

  applyFilter(filterName) {
    const {
      listActions: {
        applyFilter,
      },
    } = this.props;

    applyFilter(filterName);
  }

  resetFilter(filterName) {
    const {
      listActions: {
        resetFilter,
      },
    } = this.props;

    resetFilter(filterName);
  }

  toggleCheckbox(filterName) {
    const {
      listState: {
        appliedFilters,
      },

      listActions: {
        setAndApplyFilter,
      },
    } = this.props;

    setAndApplyFilter(filterName, !appliedFilters[filterName]);
  }

  resetAll() {
    const {
      listActions: {
        resetFilters,
      },
    } = this.props;

    resetFilters(['poulet', 'diana', 'dejeuner','oeuf','bbq', 'steak']);
  }

  setPerPage({ target: { value } }) {
    const {
      listActions: {
        setAndApplyFilter,
      },
    } = this.props;

    setAndApplyFilter('perPage', 9);
  }

  setPage(page) {
    const {
      listActions: {
        setAndApplyFilter,
      },
    } = this.props;

    setAndApplyFilter('page', page);
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }
  

  render() {
    const { isExpanded } = this.state;

    const { t, i18n } = this.props;
    const {
      isListInited,
      listState,
      listActions,
    } = this.props;

    if (!isListInited) {
      return null;
    }

    const {
      additional,
      items,
      loading,

      sort,

      filters,

      appliedFilters: {
        page,
        perPage,
      },
    } = listState;
    const {
      setSorting,
      resetAllFilters,
    } = listActions;

    return (
      <Container>
        <Example/>
        <div>
      <nav className='filterList'
        ref={(elem) => {
          this.nav = elem;
        }}
      >
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
        <ul className="menu">
        <li>
              <Button color="primary" className="menuitem" onClick={() => this.togglepoulet()} active={filters.poulet || false}>{t('filter.poulet')}</Button>
            </li>
            <li>
              <Button color="primary" onClick={() => this.togglediana()} active={filters.diana || false}>{t('filter.diana')}</Button>
            </li>
            <li>
              <Button color="primary" onClick={() => this.toggledejeuner()} active={filters.dejeuner || false}>{t('filter.dejeuner')}</Button>
            </li>
            <li>
            <Button color="primary" onClick={() => this.toggleoeuf()} active={filters.oeuf || false}>{t('filter.oeuf')}</Button>
            </li>
            <li>
              <Button color="primary" onClick={() => this.togglebbq()} active={filters.bbq || false}>{t('filter.bbq')}</Button>
            </li>
            <li>
              <Button color="primary" onClick={() => this.togglesteak()} active={filters.steak || false}>{t('filter.steak')}</Button>
            </li>
            <li>
            <Button
              type="button"
              className="clearBoxe"
              onClick={this.resetAll}
            >
              Clear
            </Button>
            </li>
    
        </ul>
      </nav>
      </div>
        
    
        
       
<div id="photos">

            {
              items.map(({
                id,
                titre,
                owner,
                color,
                info,
              }) => (
         <div>
                  <img key={id}  onClick={(event) => this.toggle(titre)} src='https://via.placeholder.com/150' alt="Card image cap" />
                  {titre}</div>
             // <div>{id}</div>

              ))
            }

          </div>
        {
          additional && (
            <h4>
              Total:
              {' '}
              {additional.count}
            </h4>
          )
        }

        {
          loading && (
            <h3>Loading...</h3>
          )
        }

        {
          additional && (
            <Paginator
              count={additional.count}
              perPage={perPage}
              current={page}

              setPage={this.setPage}
            />
          )
        }
        <div>

        <Modal isOpen={this.state.modal} toggle={(event) => this.toggle()} className={this.props.className}>
          <ModalBody>
            <img src={`src/img/${this.state.src}.jpg`} alt="Card image cap" />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(event) => this.toggle()}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    </Container>  
    );
  }
}

export default createFilterlist({
  loadItems: async ({
    sort,
    appliedFilters,
  }) => {
    const response = await api.loadImages({
      ...appliedFilters,
      sort: `${sort.param ? `${sort.asc ? '' : '-'}${sort.param}` : ''}`,
    });

    return {
      items: response.images,
      additional: {
        count: response.count,
      },
    };
  },

  onChangeLoadParams: (newListState, { history }) => {
    const newQuery = qs.stringify({
      ...newListState.appliedFilters,
      sidewalk: newListState.appliedFilters.sidewalk ? 1 : undefined,
      pool: newListState.appliedFilters.pool ? 1 : undefined,
      back: newListState.appliedFilters.back ? 1 : undefined,
      sort: newListState.sort.param
        ? `${newListState.sort.asc ? '' : '-'}${newListState.sort.param}`
        : null,
    });

    history.push(`/?${newQuery}`);
  },

  alwaysResetFilters: {
    page: 1,
  },

  initialFilters: {
    perPage: 10,
  },

  saveFiltersOnResetAll: ['perPage'],

  parseFiltersAndSort: async ({
    location: {
      search,
    },
  }) => {
    const parsed = qs.parse(search.substring(1, search.length));

    const {
      sort,
    } = parsed;

    const appliedFilters = {
      sidewalk: Boolean(parsed.sidewalk),
      pool: Boolean(parsed.pool),
      back: Boolean(parsed.back),
      page: parsed.page || 1,
      perPage: parsed.perPage || 10,
    };

    return {
      sort: {
        param: sort
          ? (
            sort[0] === '-' ?
              sort.substring(1, sort.length) :
              sort
          )
          : 'id',
        asc: !!sort && sort[0] !== '-',
      },

      filters: appliedFilters,
      appliedFilters,
    };
  },

  shouldRecount: ({
    history,
    location,
  }, prevProps) => history.action === 'POP'
    && location.search !== prevProps.location.search,

  isRecountAsync: true,
}) (withNamespaces('translation')(List));
