import React, { Component } from 'react';

import './Search.css';

const SEARCH_TABS = {
  all: {
    name: 'All results',
    facet: 'all'
  },
  vizzes: {
    name: 'Vizzes',
    facet: 'vizzes'
  },
  authors: {
    name: 'Authors',
    facet: 'authors'
  },
  blogs: {
    name: 'Blogs',
    facet: 'blogs'
  },
  resources: {
    name: 'Resources',
    facet: 'resources'
  }
};

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'all'
    }
  }

  onSelectTab(event, tab) {
    console.log(`selecting tab: ${tab}`);
    this.setState({
      activeTab: tab
    });
  }

  render() {
    return (
      <div className="search-page">
        <div className="search-page-upper">
          <div className="search-page-title">
            <h1>Search</h1>
          </div>
          <form className="search-form">
            <div className="search-input-container">
              <input className="search-input" type="search" size="40" maxLength="255" />
              <button className="search-submit" type="submit" value="Search">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>
        </div>
        <div className="search-page-lower">
          <section className="search-tab-container">
            <div className="search-tab-list">
              {this.renderTabs()}
            </div>
          </section>
        </div>
      </div>
    );
  }

  renderTabs() {
    return Object.keys(SEARCH_TABS).map((key) => {
      const tab = SEARCH_TABS[key];
      const active = this.state.activeTab === tab.facet;
      return (<div key={tab.facet} className={`search-tab ${active ? 'active' : ''}`} onClick={(event) => this.onSelectTab(event, tab.facet)} >
        <a href="#">
          <span>{tab.name}</span>
        </a>
      </div>);
    })
  }
}

export default Search;
