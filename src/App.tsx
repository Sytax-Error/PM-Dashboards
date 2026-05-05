import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ManagersPage from "./pages/ManagersPage";
import PODetailsPage from "./pages/PODetailsPage";
import InvoiceReceivedPage from "./pages/InvoiceReceivedPage";
import InvoiceBookedPage from "./pages/InvoiceBookedPage";
import TaxInvoicePage from "./pages/TaxInvoicePage";
import Layout from "./components/Layout";

function AppContent() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route 
          path="/" 
          element={
            user?.role === "user" 
              ? <Navigate to={`/managers?mgrId=${user.managerId}&mgrName=${encodeURIComponent(user.name)}`} replace /> 
              : <HomePage />
          } 
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/managers" element={<ManagersPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        {/* Detail Pages with Project ID */}
        <Route path="/projects/:projectId/po" element={<PODetailsPage />} />
        <Route path="/projects/:projectId/invoice-received" element={<InvoiceReceivedPage />} />
        <Route path="/projects/:projectId/invoice-booked" element={<InvoiceBookedPage />} />
        <Route path="/projects/:projectId/tax-invoice" element={<TaxInvoicePage />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
