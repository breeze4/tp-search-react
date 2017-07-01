import React from 'react';
import { Link } from 'react-router-dom';

import './Search.css';

export const SEARCH_TABS = {
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

const SearchPage = (props) => {
  const { onInputChange, onSearch, searchText } = props;
  return (
    <div className="search-page">
      <div className="search-page-upper">
        <div className="search-page-title">
          <h1>Search</h1>
        </div>
        <form className="search-form" onSubmit={onSearch}>
          <div className="search-input-container">
            <input className="search-input" type="search" size="40" maxLength="255"
              value={searchText}
              onChange={(event) => onInputChange(event.target.value)} />
            <button className="search-submit" type="submit" value="Search">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="search-page-lower">
        <section className="search-tab-container">
          <div className="search-tab-list">
            {renderTabs(props)}
          </div>
        </section>
        {props.children}
      </div>
    </div>
  );
};

const renderTabs = ({ onSelectTab, activeTab, searchText }) => {
  return Object.keys(SEARCH_TABS).map((key) => {
    const tab = SEARCH_TABS[key];
    const active = activeTab === tab.facet;
    const facetParam = activeTab ? `/${tab.facet}` : '';
    const searchParam = searchText ? `/${searchText}` : '';
    return (
      <div
        key={tab.facet}
        className={`search-tab ${active ? 'active' : ''}`}
        onClick={() => onSelectTab(tab.facet)} >
        <Link to={`${facetParam}${searchParam}`}><span>{tab.name}</span></Link>
      </div>
    );
  })
}

export default SearchPage;