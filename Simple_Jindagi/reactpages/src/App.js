import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorPortal from './pages/DoctorPortal';
import Cold from './pages/cold';
import Nextgen_info from './pages/nextgen_info';
import Help_center from './pages/help_center';
import SkinRash from './pages/skinrash';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/doctor" element={<DoctorPortal/>} />
        <Route path="/nextgen_info" element={<Nextgen_info/>} />
        <Route path="/cold" element={<Cold/>} />
        <Route path="/help" element={<Help_center/>} />
        <Route path="/skinrash" element={<SkinRash/>} />
      </Routes>
    </Router>
  );
}