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
            <Navigate
              to={
                user?.role === "admin"
                  ? "/dashboard"
                  : `/managers?mgrId=${user?.id}&mgrName=${encodeURIComponent(user?.name || "")}`
              }
              replace
            />
          }
        />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/dashboard" replace />} />
        <Route path="/managers" element={<ManagersPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        {/* Detail Pages with Project ID */}
        <Route path="/projects/:projectId/po" element={<PODetailsPage />} />
        <Route
          path="/projects/:projectId/invoice-received"
          element={<InvoiceReceivedPage />}
        />
        <Route
          path="/projects/:projectId/invoice-booked"
          element={<InvoiceBookedPage />}
        />
        <Route
          path="/projects/:projectId/tax-invoice"
          element={<TaxInvoicePage />}
        />
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
