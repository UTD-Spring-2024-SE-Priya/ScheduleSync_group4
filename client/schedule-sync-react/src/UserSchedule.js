import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { findDayAndMonth } from './utils';
import moment from 'moment';
import './Calendar.css'; // Import the CSS file

const MyCalendar = () => {
  const { userId } = useParams();  
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/user/${userId}/schedule`)
      .then(response => {
        const timeBlocks = response.data.timeBlocks;
        const events = timeBlocks.map(block => {
          const { dayNumber, monthName } = findDayAndMonth(block.blockDay);
          const start = moment(`${monthName} ${dayNumber}, ${new Date().getFullYear()} ${block.startTime}`, 'MMMM D, YYYY HH:mm');
          const end = moment(`${monthName} ${dayNumber}, ${new Date().getFullYear()} ${block.endTime}`, 'MMMM D, YYYY HH:mm');
        
          return {
            title: block.blockName,
            start: start.toISOString(),
            end: end.toISOString()
          };
        });
        setEvents(events);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [userId]);

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        editable={true}
        eventStartEditable={true}
        eventDurationEditable={true}
        selectable={true}
        slotMinTime="07:00:00"
        slotMaxTime="23:00:00"
        height="auto" // Adjust the calendar height dynamically
        className="my-calendar"
      />
    </div>
  );
};

export default MyCalendar;
