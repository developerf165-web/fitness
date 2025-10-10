import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ClientProfile from "./pages/ClientProfile/ClientProfile";
import Dashboard from "./pages/Dashboard/Dashboard";
import BlockedUsers from "./pages/BlockedUsers/BlockedUsers";
import PersonalPage from "./pages/Personal";
import TrainerPage from "./pages/TrainerPage/TrainerPage";
import EditProfileModalPage from "./pages/components/Cards/Modal/EditProfileModalPage";
import ConfirmPasPage from "./pages/components/Cards/Modal/ConfirmPasPage";
import MailingsPage from "./pages/MailingsPage/MailingsPage";
import NewsPage from "./pages/NewsPage";

export default function App() {
  return (
    <Router>
      <div className="app">
        <main className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<TrainerPage />} />
            <Route path="/novosti" element={<NewsPage />} />
            <Route path="/rasilki" element={<MailingsPage />} />
            <Route path="/editprofilepage" element={<EditProfileModalPage />} />
            <Route path="/confirmpaspage" element={<ConfirmPasPage />} />
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="/glavnaya" element={<Dashboard />} /> 
            <Route path="/zablokirovanie" element={<BlockedUsers />} />
            <Route path="/clienti" element={<ClientProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
