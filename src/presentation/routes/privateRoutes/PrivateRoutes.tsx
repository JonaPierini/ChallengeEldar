import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/home/HomePage";
import { RootRoutes } from "../appRoutes/def";
import { Layout } from "../../components/Layout/Layout";
import "./PrivateRootes.css";

export const PrivateRoutes = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/Home" element={<HomePage />} />
          <Route path="*" element={<Navigate to={RootRoutes.Home} />} />
        </Route>
      </Routes>
    </div>
  );
};
