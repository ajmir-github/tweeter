import AppLayout from "@/layouts/AppLayout";
import PrivateLayout from "@/layouts/PrivateLayout";
import PublicLayout from "@/layouts/PublicLayout";
import AddPost from "@/pages/AddPost";
import ExplorePages from "@/pages/ExplorePage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProfilePage from "@/pages/ProfilePage";
import RegisterPage from "@/pages/RegisterPage";
import SearchPage from "@/pages/SearchPage";
import { BrowserRouter, Route, Routes } from "react-router";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<PrivateLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/explore" element={<ExplorePages />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/add" element={<AddPost />} />
          </Route>
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
