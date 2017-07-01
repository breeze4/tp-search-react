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
        onInputChange={(event) => this.setState({ searchText: event.target.value })}
        onSelectTab={this.onSelectTab.bind(this)}
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
