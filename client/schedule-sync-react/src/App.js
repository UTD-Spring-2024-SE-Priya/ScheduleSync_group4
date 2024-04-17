import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateAccount from './CreateAccount';
import FriendsManager from "./Friends";
import TimeBlockForm from "./TimeBlock";
import UserScheduleCalendar from "./UserSchedule";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/friends" element={<FriendsManager />} />
            <Route path="/timeblock" element={<TimeBlockForm />} />
            <Route path="/schedule/:userId" element={<UserScheduleCalendar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;