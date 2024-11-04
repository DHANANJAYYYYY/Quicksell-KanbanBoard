import React, { useState, useEffect } from 'react';
import { data } from '../api/data';
import { saveViewState, getViewState } from '../utils/storage';
import { PRIORITY_LEVELS } from '../utils/constants';
import DisplayDropdown from './DisplayDropdown';
import Ticket from './Ticket';
import '../styles/kanban.css';

import urgentIcon from '../icons/urgentIcon.svg';
import highIcon from '../icons/highIcon.svg';
import mediumIcon from '../icons/mediumIcon.svg';
import lowIcon from '../icons/lowIcon.svg';
import noPriorityIcon from '../icons/noPriorityIcon.svg';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState(data.tickets);
  const [groupBy, setGroupBy] = useState(getViewState().groupBy || 'Status');
  const [sortBy, setSortBy] = useState(getViewState().sortBy || 'Priority');

  useEffect(() => {
    saveViewState({ groupBy, sortBy });
  }, [groupBy, sortBy]);

  const groupedTickets = groupTickets(tickets, groupBy);
  const sortedTickets = sortTickets(groupedTickets, sortBy);

  return (
    <div className="kanban-board">
      {/* Use DisplayDropdown for grouping and sorting options */}
      <DisplayDropdown
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {Object.keys(sortedTickets).map((group, index) => (
        <div key={index} className="kanban-column">
          <h3>
            {groupBy === 'Priority' ? getPriorityIcon(group) : ''}
            {group} <span>{sortedTickets[group].length}</span>
          </h3>
          {sortedTickets[group].map(ticket => (
            <Ticket key={ticket.id} ticket={ticket} getPriorityIcon={getPriorityIcon} />
          ))}
        </div>
      ))}
    </div>
  );
};

// Function to return an icon based on priority
const getPriorityIcon = (priority) => {
  switch (priority) {
    case 'Urgent':
      return <img src={urgentIcon} alt="Urgent" className="priority-icon" />;
    case 'High':
      return <img src={highIcon} alt="High" className="priority-icon" />;
    case 'Medium':
      return <img src={mediumIcon} alt="Medium" className="priority-icon" />;
    case 'Low':
      return <img src={lowIcon} alt="Low" className="priority-icon" />;
    case 'No priority':
    default:
      return <img src={noPriorityIcon} alt="No Priority" className="priority-icon" />;
  }
};

// Helper function to group tickets based on the selected `groupBy` option
const groupTickets = (tickets, groupBy) => {
  switch (groupBy) {
    case 'Status':
      return tickets.reduce((acc, ticket) => {
        (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
        return acc;
      }, {});
    case 'User':
      return tickets.reduce((acc, ticket) => {
        const user = data.users.find(user => user.id === ticket.userId)?.name || 'Unassigned';
        (acc[user] = acc[user] || []).push(ticket);
        return acc;
      }, {});
    case 'Priority':
      return tickets.reduce((acc, ticket) => {
        const priority = PRIORITY_LEVELS[ticket.priority] || 'No Priority';
        (acc[priority] = acc[priority] || []).push(ticket);
        return acc;
      }, {});
    default:
      return {};
  }
};

// Helper function to sort tickets within each group based on `sortBy` selection
const sortTickets = (groupedTickets, sortBy) => {
  const sortFunc = sortBy === 'Priority'
    ? (a, b) => b.priority - a.priority
    : (a, b) => a.title.localeCompare(b.title);
  
  return Object.keys(groupedTickets).reduce((acc, key) => {
    acc[key] = groupedTickets[key].sort(sortFunc);
    return acc;
  }, {});
};

export default KanbanBoard;
