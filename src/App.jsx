import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ForWalletsPage from "./pages/ForWalletsPage.jsx";
import ForVaultsPage from "./pages/ForVaultsPage.jsx";
import ForCreatorsPage from "./pages/ForCreatorsPage.jsx";
import DocsPage from "./pages/DocsPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wallets" element={<ForWalletsPage />} />
        <Route path="/vaults" element={<ForVaultsPage />} />
        <Route path="/creators" element={<ForCreatorsPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
