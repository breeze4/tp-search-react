import React, { Component } from 'react';
import SearchPage from './SearchPage';
import SearchApiService from './api/SearchApiService';

class Search extends Component {

  constructor(props) {
    super(props);

    const { match, history } = props;
    this.history = history;

    const activeTab = match.params.activeTab || 'all';
    const searchText = match.params.searchText || '';

    this.state = {
      activeTab: activeTab,
      searchText: searchText,
      loading: false,
      results: []
    };

    this.searchTimeout = null;

    this.onInputChange = this.onInputChange.bind(this);
    this.onSelectTab = this.onSelectTab.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    this.doSearch();
  }

  componentDidMount() {
    console.log('componentDidMount', this.props, this.state);
    this.doSearch();
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

  onInputChange(event) {
    this.setState({ loading: true, searchText: event.target.value });

    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.doSearch();
    }, 1000);
  }

  onSelectTab(tab) {
    console.log(`selecting tab: ${tab}`);
    this.setState({
      activeTab: tab
    });
  }

  render() {
    const { activeTab, searchText, loading, results } = this.state;

    return (
      <SearchPage
        onInputChange={this.onInputChange}
        onSelectTab={this.onSelectTab}
        onSearch={(event) => {
          event.preventDefault();
          console.log(`adding to history: /${activeTab}/${searchText}`);
          if (this.state.searchText) this.history.push(`/${activeTab}/${searchText}`);
        }}
        activeTab={activeTab}
        searchText={searchText}
        results={results}
        loading={loading}>
      </SearchPage >
    );
  }
}

export default Search;
