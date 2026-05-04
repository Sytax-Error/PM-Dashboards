import { useState } from "react";
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
  const { isAuthenticated } = useAuth();
  const [activePage, setActivePage] = useState("home");
  const [filterProjectType, setFilterProjectType] = useState<string>("");
  const [filterCount, setFilterCount] = useState<number>(0);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Navigate to projects page with an optional project type filter and expected count
  const goToProjects = (projectType?: string, count?: number) => {
    setFilterProjectType(projectType ?? "");
    setFilterCount(count ?? 0);
    setActivePage("projects");
  };

  const clearFilter = () => {
    setFilterProjectType("");
    setFilterCount(0);
  };

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage onNavigate={setActivePage} />;
      case "managers":
        return <ManagersPage onNavigate={goToProjects} />;
      case "projects":
        return (
          <ProjectsPage
            onNavigate={setActivePage}
            filterProjectType={filterProjectType}
            filterCount={filterCount}
            onClearFilter={clearFilter}
          />
        );
      case "poDetails":
        return <PODetailsPage onBack={() => setActivePage("projects")} />;
      case "invoiceReceived":
        return <InvoiceReceivedPage onBack={() => setActivePage("projects")} />;
      case "invoiceBooked":
        return <InvoiceBookedPage onBack={() => setActivePage("projects")} />;
      case "taxInvoice":
        return <TaxInvoicePage onBack={() => setActivePage("projects")} />;
      default:
        return <HomePage onNavigate={setActivePage} />;
    }
  };

  return (
    <Layout activePage={activePage} onNavigate={setActivePage}>
      {renderPage()}
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
