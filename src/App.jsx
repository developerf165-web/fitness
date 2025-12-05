import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ClientProfile from "./pages/ClientProfile/ClientProfile";
import Dashboard from "./pages/Dashboard/Dashboard";
import BlockedUsers from "./pages/BlockedUsers/BlockedUsers";
import PersonalPage from "./pages/Personal";
import TrainerPage from "./pages/TrainerPage/TrainerPage";
import EditProfileModalPage from "./pages/components/Cards/Modal/EditProfileModalPage";
import ConfirmPasPage from "./pages/components/Cards/Modal/ConfirmPasPage";
import MailingsPage from "./pages/MailingsPage/MailingsPage";
import NewsPage from "./pages/NewsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Services from "./pages/Services/Services";
import MainPage from "./pages/MainPage/MainPage"
import { ToastProvider } from "./pages/components/Toast/ToastContext";
import SeriesDetailPage from "./pages/MainPage/SeriesDetailPage";
import LockerPage from "./pages/LockerPage/LockerPage";
import FinancePage from "./pages/FinancePage/FinancePage";
import FitnessProductsPage from "./pages/FitnessProductsPage/FitnessProductsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MobileAppManagementPage from "./pages/MobileAppManagementPage/MobileAppManagementPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import DevToolsPanel from "./pages/components/DevTools/DevToolsPanel";

function AppContent() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/login";

  return (
    <div className="app">
      {!hideNavbar && <main className="container"><Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/trainer/:id" element={<TrainerPage />} />
          <Route path="/shkafchiki" element={<LockerPage />} />
          <Route path="/glavnaya" element={<MainPage />} />
          <Route path="/series/:seriesSlug" element={<SeriesDetailPage />} />
          <Route path="/novosti" element={<NewsPage />} />
          <Route path="/rasilki" element={<MailingsPage />} />
          <Route path="/editprofilepage" element={<EditProfileModalPage />} />
          <Route path="/confirmpaspage" element={<ConfirmPasPage />} />
          <Route path="/personal" element={<PersonalPage />} />
          <Route path="/clienti" element={<Dashboard />} />
          <Route path="/zablokirovanie" element={<BlockedUsers />} />
          <Route path="/user/:id" element={<ClientProfile />} />
          <Route path="/uslugi" element={<Services />} />
          <Route path="/financi" element={<FinancePage />} />
          <Route path="/producti" element={<FitnessProductsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/upravlenie" element={<MobileAppManagementPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>}

      {hideNavbar && <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>}
    </div>
  );
}


export default function App() {
  return (
    <Router>
      <ToastProvider>
        <AppContent />
        <DevToolsPanel />
      </ToastProvider>
    </Router>
  );
}
