import { createBrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import Homapage from "./pages/Homapage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import RestaurantPage from "./pages/RestaurantPages";
import SearchPage from "./pages/SearchPage";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout showHero><Homapage /></Layout>} />
            <Route path="/auth-callback" element={<AuthCallbackPage />} />
            <Route element={<ProtectedRoute />} >
                <Route path="/user-profile" element={<Layout><UserProfilePage /></Layout>} />
                <Route path="/manage-restaurant" element={<Layout><RestaurantPage /></Layout>} />
            </Route>
            <Route path="/search/:city" element={<Layout><SearchPage /></Layout>} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        // <RouterProvider router={router}/>
    );
}

export default AppRoutes;