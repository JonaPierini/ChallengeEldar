import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/login/LoginPage";
import { RootRoutes } from "../appRoutes/def";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path={RootRoutes.Login} element={<LoginPage />} />
      <Route path="*" element={<Navigate to={RootRoutes.Login} />} />
    </Routes>
  );
};
