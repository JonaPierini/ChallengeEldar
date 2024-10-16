import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { PublicRoutes } from "../publicRoutes/PublicRoutes";
import { PrivateRoutes } from "../privateRoutes/PrivateRoutes";
import { useAuthStore } from "../../../store/auth/useAuthStore";

export const AppNavigation = () => {
  const { status } = useAuthStore();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {status ? (
          <Route path="*" element={<PrivateRoutes />} />
        ) : (
          <Route path="*" element={<PublicRoutes />} />
        )}
      </>
    )
  );
  return <RouterProvider router={router} />;
};
