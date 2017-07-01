import React from 'react';
import { Link } from 'react-router-dom';

import { getVizThumbUrl } from './util';

import './Search.css';

export const SEARCH_TABS = [
  {
    name: 'All results',
    facet: 'all'
  },
  {
    name: 'Vizzes',
    facet: 'vizzes'
  },
  {
    name: 'Authors',
    facet: 'authors'
  },
  {
    name: 'Blogs',
    facet: 'blogs'
  },
  {
    name: 'Resources',
    facet: 'resources'
  }
];

const SearchPage = (props) => {
  return (
    <div className="search-page">
      <div className="search-page-upper">
        <div className="search-page-title">
          <h1>Search</h1>
        </div>
        {renderSearchForm(props)}
      </div>
      <div className="search-page-lower">
        {renderTabs(props)}
        {renderResults(props)}
      </div>
    </div>
  );
};

const renderSearchForm = ({ onSearch, onInputChange, searchText }) => {
  return (
    <form className="search-form" onSubmit={onSearch}>
      <div className="search-input-container">
        <input className="search-input" type="search" size="40" maxLength="255"
          value={searchText} onChange={onInputChange} />
        <button className="search-submit" type="submit" value="Search">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
};

const renderTabs = ({ onSelectTab, activeTab, searchText }) => {
  const tabs = SEARCH_TABS.map((tab) => {
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
  });

  return (
    <section className="search-tab-container">
      <div className="search-tab-list">
        {tabs}
      </div>
    </section>
  );
};

const renderResults = ({ loading, results }) => {
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

  const resultsList = !loading ? (
    <ol className="search-results-list">
      {results.map((result) => {
        const { key } = result; // which kind of result it is
        return key ? resultRenderers[key](result) : null;
      })}
    </ol>
  ) : null;

  return (
    <section className="search-results-container">
      {loadingIndicator}
      {resultsCount}
      {resultsList}
    </section>
  );
}

const resultRenderers = {
  workbook: (result) => {
    const { defaultViewRepoUrl } = result.workbook;
    const { description, title, authorName, profileName } = result.workbookMeta;
    const resultTitle = `${title} - ${authorName}`;
    const thumbnailUrl = getVizThumbUrl(defaultViewRepoUrl);
    const link = `/profile/${profileName}`;
    return renderResultItem(resultTitle, thumbnailUrl, link, description);
  },
  author: (result) => {
    const { name, profileName, avatarUrl, gravatarHash, bio } = result.author;
    const title = `${name} - Profile`;
    const thumbnailUrl = avatarUrl;
    const link = `/profile/${profileName}`;
    const description = bio;
    return renderResultItem(title, thumbnailUrl, link, description);
  },
  webpage: (result) => {
    return (<div>webpage</div>);
  }
}

const renderResultItem = (title, thumbnailUrl, link, description) => {
  const thumbnail = thumbnailUrl ? (
    <div className="search-result-thumbnail">
      <a href={link}>
        <img src={thumbnailUrl} alt={title} /></a>
    </div>) : null;
  return (
    <li key={title} className="search-result">
      <h3 className="search-result-title">
        <a href={link}>{title}</a>
      </h3>
      <div className="search-result-description">
        {thumbnail}
        <div className="search-result-snippet">
          <span className="search-result-url">
            <a href={link}>{'profile url'}</a>
          </span>
          <p className="search-result-snippet-text">{description}
          </p>
        </div>
      </div>
    </li>
  );
}

export default SearchPage;