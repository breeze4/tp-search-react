import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SearchPage, { SEARCH_TABS } from './SearchPage';
import SearchApiService from './api/SearchApiService';

import './Search.css';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // activeTab: 'all',
      // searchText: '',
      loading: false,
      results: [{
        key: null,
        workbook: {},
        workbookMeta: {},
        author: null,
        website: null
      }]
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate', nextProps, nextState);
    // this.doSearch();
  }

  doSearch() {
    const { activeTab, searchText } = this.state;
    if (activeTab && searchText) {
      this.setState({ loading: true });
      SearchApiService.search(activeTab, searchText).then((data) => {
        this.setState({ loading: false, results: data.results });
      });
    }
  }

  onSelectTab(tab) {
    console.log(`selecting tab: ${tab}`);
    this.setState({
      activeTab: tab
    });
    this.doSearch();
  }

  render() {
    const SearchRoute = ({ match, history }) => {
      const activeTab = match.params.activeTab || 'all';
      const searchText = this.state.searchText || match.params.searchText;
      return (
        <SearchPage
          onInputChange={(searchText) => this.setState({ searchText })}
          onSelectTab={this.onSelectTab.bind(this)}
          onSearch={(event) => {
            event.preventDefault();
            console.log(`adding to history: /${activeTab}/${searchText}`);
            if (this.state.searchText) history.push(`/${activeTab}/${searchText}`);
          }}
          activeTab={activeTab}
          searchText={searchText}>
          {this.renderResults()}
        </SearchPage >
      );
    };
    return (
      <Route path="/:activeTab?/:searchText?" render={SearchRoute} />
    );
  }

  renderResults() {
    const { loading, results } = this.state;
    const loadingIndicator = loading ? (
      <div className="search-results-loading" >
        <div className="search-results-loading-icon">
        </div>
      </div>
    ) : null;

    const resultsCount = !loading ? (
      <header className="search-results-header">
        {results && results.length ? `${results.length} results` : null}
      </header>
    ) : null;

    return (
      <section className="search-results-container">
        {loadingIndicator}
        {resultsCount}
      </section>
    );
  }
}

export default Search;
