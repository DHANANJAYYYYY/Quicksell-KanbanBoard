import React from 'react';
import { PRIORITY_LEVELS } from '../utils/constants';
import '../styles/ticket.css';

const Ticket = ({ ticket, getPriorityIcon }) => {
  const user = ticket.userId ? ticket.userId : null;
  return (
    <div className="ticket">
      <div className="ticket-header">
        <span>{ticket.id}</span>
        {user && <img src={`../icons/${user}.png`} alt={user} className="avatar" />}
      </div>
      <h4>{ticket.title}</h4>
      <p>{ticket.tag[0]}</p>
      <div className="ticket-footer">
        {getPriorityIcon(PRIORITY_LEVELS[ticket.priority])}
        <span>{PRIORITY_LEVELS[ticket.priority]}</span>
      </div>
    </div>
  );
};

export default Ticket;
