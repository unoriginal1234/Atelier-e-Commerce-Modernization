import React, { useState } from 'react';

const SearchAnswers = ({ handleSearch }) => {

  const [search, setSearch] = useState('');

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    if(search.length >= 3) {
      handleSearch(search);
    }
  }

  return (
    <div className="search-container">
    <input className="search-bar" placeholder="Have a question? Search for answers…" value={search} onChange={handleSearchInput}/>
    </div>

  )

}

export default SearchAnswers;