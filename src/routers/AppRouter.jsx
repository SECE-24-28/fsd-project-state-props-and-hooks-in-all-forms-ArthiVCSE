import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home           from '../pages/Home';
import About          from '../pages/About';
import Contact        from '../pages/Contact';
import Programmes     from '../pages/Programmes';
import Departments    from '../pages/Departments';
import Faculties      from '../pages/Faculties';
import Placements     from '../pages/Placements';
import Hostel         from '../pages/Hostel';
import FAQ            from '../pages/FAQ';
import EnquiryForm    from '../pages/EnquiryForm';
import PrivacyPolicy  from '../pages/PrivacyPolicy';
import Terms          from '../pages/Terms';
import Login          from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword  from '../pages/ResetPassword';

import StudentDashboard from '../pages/dashboards/StudentDashboard';
import FacultyDashboard from '../pages/dashboards/FacultyDashboard';
import AdminDashboard   from '../pages/dashboards/AdminDashboard';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                  element={<Home />} />
        <Route path="/about"             element={<About />} />
        <Route path="/contact"           element={<Contact />} />
        <Route path="/programmes"        element={<Programmes />} />
        <Route path="/departments"       element={<Departments />} />
        <Route path="/faculties"         element={<Faculties />} />
        <Route path="/placements"        element={<Placements />} />
        <Route path="/hostel"            element={<Hostel />} />
        <Route path="/faq"               element={<FAQ />} />
        <Route path="/enquiry-form"      element={<EnquiryForm />} />
        <Route path="/privacy-policy"    element={<PrivacyPolicy />} />
        <Route path="/terms"             element={<Terms />} />
        <Route path="/login"             element={<Login />} />
        <Route path="/forgot-password"   element={<ForgotPassword />} />
        <Route path="/reset-password"    element={<ResetPassword />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/admin-dashboard"   element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;