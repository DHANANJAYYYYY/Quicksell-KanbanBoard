import React, { useState } from 'react';
import GroupSelector from './GroupSelector';
import SortSelector from './SortSelector';
import '../styles/displayDropdown.css';
import displayIcon from '../icons/displayIcon.svg'; // Import your display icon here

const DisplayDropdown = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="display-dropdown">
      <div className="display-header" onClick={toggleDropdown}>
        <img src={displayIcon} alt="Display Icon" className="display-icon" />
        <span>Display</span>
      </div>
      {isOpen && (
        <div className="dropdown-box">
          <div className="dropdown-item">
            <label>Grouping</label>
            <GroupSelector groupBy={groupBy} setGroupBy={setGroupBy} />
          </div>
          <div className="dropdown-item">
            <label>Ordering</label>
            <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayDropdown;
