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
    this.togglesidewalk = this.toggleCheckbox.bind(this, 'sidewalk');
    this.togglepool = this.toggleCheckbox.bind(this, 'pool');
    this.toggleback = this.toggleCheckbox.bind(this, 'back');
    this.togglefront = this.toggleCheckbox.bind(this, 'front');
    this.togglewall = this.toggleCheckbox.bind(this, 'wall');
    this.togglestair = this.toggleCheckbox.bind(this, 'stair');
    this.toggleflower = this.toggleCheckbox.bind(this, 'flower');
    this.togglepave = this.toggleCheckbox.bind(this, 'pave');
    this.toggleedging = this.toggleCheckbox.bind(this, 'edging');
    this.toggleretainingwall = this.toggleCheckbox.bind(this, 'retainingwall');
    this.toggleasphalt = this.toggleCheckbox.bind(this, 'asphalt');
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

    resetFilters(['sidewalk', 'pool', 'back','retainingwall','flower', 'asphalt', 'edging','front','stair', 'wall', 'pave']);
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
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
        <ul className="menu">
        <li>
              <Button color="primary" className="menuitem" onClick={() => this.togglefront()} active={filters.front || false}>{t('filter.front')}</Button>
            </li>
            <li>
              <Button color="primary" onClick={() => this.togglepool()} active={filters.pool || false}>{t('filter.pool')}</Button>
            </li>
            <li>
              <Button color="primary" onClick={() => this.toggleback()} active={filters.back || false}>{t('filter.back')}</Button>
            </li>
            <li>
            <Button color="primary" onClick={() => this.togglewall()} active={filters.wall || false}>{t('filter.wall')}</Button>
            </li>
            <li>
              <Button color="primary" onClick={() => this.togglesidewalk()} active={filters.sidewalk || false}>{t('filter.sidewalk')}</Button>
            </li>
            <li>
              <Button color="primary" onClick={() => this.togglepave()} active={filters.pave || false}>{t('filter.pave')}</Button>
            </li>
            <li>
              <Button color="primary" onClick={() => this.toggleedging()} active={filters.edging || false}>{t('filter.edging')}</Button>
            </li>
            <li>
              <Button color="primary" onClick={() => this.togglestair()} active={filters.stair || false}>{t('filter.stair')}</Button>
            </li>
            <li>
              <Button color="primary" onClick={() => this.toggleflower()} active={filters.flower || false}>{t('filter.flower')}</Button>
            </li>
            <li>
              <Button color="primary" onClick={() => this.toggleretainingwall()} active={filters.retainingwall || false}>{t('filter.retainingwall')}</Button>
            </li>
            <li>
              <Button color="primary" onClick={() => this.toggleasphalt()} active={filters.asphalt || false}>{t('filter.asphalt')}</Button>
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
                src,
                owner,
                color,
                info,
              }) => (
         
                  <img key={id}  onClick={(event) => this.toggle(src)} src={require(`img/${src}.jpg`)} alt="Card image cap" />

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
