import { useState } from 'react';
import './App.css';
import Home from './components/homePage/Home.jsx';
import SignIn from './components/signinPage/SignIn.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Events from './components/eventsPage/Events.jsx';
import BookingForm from './components/bookingPage/BookingForm.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import { Toaster } from 'react-hot-toast';
import AdminPage from './components/adminPage/AdminPage.jsx';


function App() {
  return (
    <>
      <Router>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/event/:eventId' element={<Events />} />
          <Route exact path='/bookingForm/:slotId' element={<BookingForm />} />
          <Route path='/dashboard' element={<Dashboard></Dashboard>} />
          <Route exact path='/admin' element={<AdminPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
