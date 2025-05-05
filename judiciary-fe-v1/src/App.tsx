import './App.css'

import Home from "./Home";
import LoginPage from './login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './register/register';
import { DashboardSidebar } from './dashboard/dashboard-sidebar';
import CalendarPage from './dashboard/[role]/calender/calender';
import ErrorBoundary from "./components/ui/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/calender" element={<CalendarPage />} />
          <Route path="/dashboard/:role" element={<DashboardSidebar role={''} />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App
