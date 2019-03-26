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

import Paginator from './Paginator';
import Th from './Th';

import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle, CardColumns, Form, Label, Input, FormGroup, Button, ButtonGroup } from 'reactstrap';

import * as api from './api';
import './costum.css';
import Example from './Menu';
import { Link } from 'react-router-dom'
import { withNamespaces, NamespacesConsumer, Trans } from 'react-i18next';

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
      src:""
    };
  this.toggle = this.toggle.bind(this);

    // this.setBrand = this.setInputFilterValue.bind(this, 'brand');
    // this.applyBrand = this.applyFilter.bind(this, 'brand');
    // this.resetBrand = this.resetFilter.bind(this, 'brand');

    // this.setOwner = this.setInputFilterValue.bind(this, 'owner');
    // this.applyOwner = this.applyFilter.bind(this, 'owner');
    // this.resetOwner = this.resetFilter.bind(this, 'owner');

    this.togglesidewalk = this.toggleCheckbox.bind(this, 'sidewalk');
    this.togglepool = this.toggleCheckbox.bind(this, 'pool');
    this.toggleback = this.toggleCheckbox.bind(this, 'back');

    this.hideAllColors = this.hideAllColors.bind(this);
    this.resetAllColors = this.resetAllColors.bind(this);

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

  hideAllColors() {
    const {
      listActions: {
        setAndApplyFilters,
      },
    } = this.props;

    setAndApplyFilters({
      sidewalk: true,
      pool: true,
      back: true,
    });
  }

  resetAllColors() {
    const {
      listActions: {
        resetFilters,
      },
    } = this.props;

    resetFilters(['sidewalk', 'pool', 'back']);
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

  render() {
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
        <Row>
          <Col xs="12">
            <ButtonGroup>
              <Button color="primary" onClick={() => this.togglesidewalk()} active={filters.sidewalk || false}>{t('menu.about')}</Button>
              <Button color="primary" onClick={() => this.togglepool()} active={filters.sidewalk || false}>Pool</Button>
              <Button color="primary" onClick={() => this.toggleback()} active={filters.sidewalk || false}>Back</Button>
            </ButtonGroup>
            <Button
              type="button"
              onClick={this.resetAllColors}
            >
              Uncheck all checkboxes
            </Button>
          </Col>
        </Row>
       
<div id="photos">

            {
              items.map(({
                id,
                src,
                owner,
                color,
                info,
              }) => (
         
                  <img  onClick={(event) => this.toggle(src)} src={require(`img/${src}.jpg`)} alt="Card image cap" />

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
     





        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
        <ModalBody>
         

{this.state.src}
        

<img src={`src/img/${this.state.src}.jpg`} alt="Card image cap" />




          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(event) => this.toggle()}>Do Something</Button>
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
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
    const response = await api.loadCars({
      ...appliedFilters,
      sort: `${sort.param ? `${sort.asc ? '' : '-'}${sort.param}` : ''}`,
    });

    return {
      items: response.cars,
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
      brand: parsed.brand || '',
      owner: parsed.owner || '',
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
