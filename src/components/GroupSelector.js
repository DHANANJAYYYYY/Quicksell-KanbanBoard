import React from 'react';

const GroupSelector = ({ groupBy, setGroupBy }) => {
  return (
    <div className="selector">
      <label>Grouping: </label>
      <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
        <option value="Status">Status</option>
        <option value="User">User</option>
        <option value="Priority">Priority</option>
      </select>
    </div>
  );
};

export default GroupSelector;
