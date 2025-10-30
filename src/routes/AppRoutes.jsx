import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Admin from "../pages/admin";
import CompanyData from "../pages/CompanyData";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/:companyName" element={<CompanyData />} />
    </Routes>
  );
};
export default AppRoutes;
