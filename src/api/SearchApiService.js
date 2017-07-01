import * as Promise from 'bluebird';
import * as STUB_DATA from '../stub_data.json';

const SearchApiService = {
  search(facet, searchText) {
    console.log(`searching ${facet} for ${searchText}`);

    var deferred = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(STUB_DATA);
      }, 1000);
    });

    return deferred;
  }
}

export default SearchApiService;