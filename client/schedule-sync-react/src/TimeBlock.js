import React, { useState } from "react";
import axios from 'axios';
import './TimeBlock.css';

export const TimeBlockForm = () => {
  const [timeBlocks, setTimeBlocks] = useState([{ blockName: "", startTime: "", endTime: "", blockDay: "" }]);
  const [scheduleId, setScheduleId] = useState("");
  const [userId, setUserId] = useState("");

  const addTimeBlock = () => {
    setTimeBlocks([...timeBlocks, { blockName: "", startTime: "", endTime: "", blockDay: "" }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const schedule = {
      id: scheduleId,
      timeBlocks: timeBlocks
    };
  
    axios.post(`http://localhost:8080/api/schedule/addSchedule`, schedule)
      .then(response => {
        console.log('Schedule saved with ID: ', response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  
    setTimeBlocks([{ blockName: "", startTime: "", endTime: "", blockDay: "" }]);
    setScheduleId("");
    setUserId("");
  };

  const addToProfile = () => {
    const schedule = {
      id: scheduleId,
      timeBlocks: timeBlocks
    };

    axios.post(`http://localhost:8080/api/user/${userId}/addSchedule`, schedule)
      .then(response => {
        console.log('Schedule added to user profile');
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form time-block-form">
      <div className="input-group">
      <h1 className="title">ScheduleSync</h1>
      <h3 className="subtitle">Block off Time</h3>
        <label className="input-label">
          User ID:
          <input type="text" placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} required className="input-field"/>
        </label>
      </div>
      {timeBlocks.map((timeBlock, index) => (
        <div key={index} className="time-block-entry">
          <label className="input-label">
            Block Name:
            <input type="text" placeholder="Block Name" value={timeBlock.blockName} onChange={e => {
              const newTimeBlocks = [...timeBlocks];
              newTimeBlocks[index].blockName = e.target.value;
              setTimeBlocks(newTimeBlocks);
            }} required className="input-field" />
          </label>
          <label className="input-label">
            Start Time:
            <input type="time" value={timeBlock.startTime} onChange={e => {
              const newTimeBlocks = [...timeBlocks];
              newTimeBlocks[index].startTime = e.target.value;
              setTimeBlocks(newTimeBlocks);
            }} required className="input-field" />
          </label>
          <label className="input-label">
            End Time:
            <input type="time" value={timeBlock.endTime} onChange={e => {
              const newTimeBlocks = [...timeBlocks];
              newTimeBlocks[index].endTime = e.target.value;
              setTimeBlocks(newTimeBlocks);
            }} required className="input-field" />
          </label>
          <label className="input-label" >
            Block Day:
            <select value={timeBlock.blockDay} onChange={e => {
              const newTimeBlocks = [...timeBlocks];
              newTimeBlocks[index].blockDay = e.target.value;
              setTimeBlocks(newTimeBlocks);
            }} required className="select-field">
              <option value="">Select a day</option>
              <option value="SUNDAY">SUNDAY</option>
              <option value="MONDAY">MONDAY</option>
              <option value="TUESDAY">TUESDAY</option>
              <option value="WEDNESDAY">WEDNESDAY</option>
              <option value="THURSDAY">THURSDAY</option>
              <option value="FRIDAY">FRIDAY</option>
              <option value="SATURDAY">SATURDAY</option>
            </select>
          </label>
        </div>
      ))}
      <div className="input-group">
        <label className="input-label">
          Schedule Name:
          <input type="text" placeholder="Schedule Name" value={scheduleId} onChange={e => setScheduleId(e.target.value)} required className="input-field"/>
        </label>
      </div>
      <div className="button-group">
        <button type="button" onClick={addTimeBlock} className="button add-block-button">Add Another Time Block</button>
        <button type="button" onClick={addToProfile} className="button add-profile-button">Add to Profile</button>
        <input type="submit" value="Submit" className="button submit-button3" />
      </div>
    </form>
  );
};

export default TimeBlockForm;
