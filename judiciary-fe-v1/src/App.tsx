import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Home from "./Home";
import LoginPage from './login/Login';
import RegisterPage from './register/register';
import DashboardLayout from './dashboard/DashboardLayout';
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { roleRoutes, Role } from './routes/roleRoutes';

function RoleBasedRoutes() {
  const { role } = useParams();
  const roleKey = role as Role;

  const allowedRoutes = roleRoutes[roleKey];

  if (!allowedRoutes) return <Navigate to="/" replace />;

  return (
    <DashboardLayout>
      <Routes>
        {allowedRoutes.map(({ path, element }) => (
          <Route path={path} element={element} />
        ))}
        {/* Optionally a fallback 404 for unauthorized subroutes */}
        <Route path="*" element={<div>Page not found or unauthorized</div>} />
      </Routes>
    </DashboardLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Dynamically render based on role */}
          <Route path="/dashboard/:role/*" element={<RoleBasedRoutes />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
