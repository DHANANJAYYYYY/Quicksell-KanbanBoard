import React from 'react';

const SortSelector = ({ sortBy, setSortBy }) => {
  return (
    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
      <option value="Priority">Sort by Priority</option>
      <option value="Title">Sort by Title</option>
    </select>
  );
};

export default SortSelector;