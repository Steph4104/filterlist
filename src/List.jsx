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

import { Container, Row, Col, Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle, CardColumns, Form, Label, Input, FormGroup, Button, ButtonGroup } from 'reactstrap';

import * as api from './api';
import './costum.css';

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

    this.setBrand = this.setInputFilterValue.bind(this, 'brand');
    this.applyBrand = this.applyFilter.bind(this, 'brand');
    this.resetBrand = this.resetFilter.bind(this, 'brand');

    this.setOwner = this.setInputFilterValue.bind(this, 'owner');
    this.applyOwner = this.applyFilter.bind(this, 'owner');
    this.resetOwner = this.resetFilter.bind(this, 'owner');

    this.togglesidewalk = this.toggleCheckbox.bind(this, 'sidewalk');
    this.togglepool = this.toggleCheckbox.bind(this, 'pool');
    this.toggleback = this.toggleCheckbox.bind(this, 'back');

    this.hideAllColors = this.hideAllColors.bind(this);
    this.resetAllColors = this.resetAllColors.bind(this);

    this.setPerPage = this.setPerPage.bind(this);
    this.setPage = this.setPage.bind(this);

    this.reloadListener();
  }

  reloadListener() {
    const browserHistory = createBrowserHistory();
    if (window.performance) {
      if (performance.navigation.type == 1) {
        alert( "This page is reloaded" );
        this.props.history.push('');
        
      } else {
        alert( "This page is not reloaded");
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

    setAndApplyFilter('perPage', 10);
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
        <Row>
          <Col xs="12">
            <ButtonGroup>
              <Button color="primary" onClick={() => this.togglesidewalk()} active={filters.sidewalk || false}>Sidewalk</Button>
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
        <CardColumns>
            {
              items.map(({
                id,
                brand,
                owner,
                color,
                info,
              }) => (
                <Card key={id}>
                  <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                  <CardBlock>
                    <CardTitle>{ id }</CardTitle>
                    <CardSubtitle>{ brand } - { owner }</CardSubtitle>
                    <CardText>{ color }</CardText>
                  </CardBlock>
                </Card>
              ))
            }
          </CardColumns>
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

        <p>
          Items per page:
          {' '}
          <select
            value={perPage}
            onChange={this.setPerPage}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </p>

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
})(List);
