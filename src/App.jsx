import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Settings from "./pages/Settings/Settings";
import Profile from "./pages/Profile/Profile";
import Notifications from "./pages/Notifications/Notifications";
import NotFound from "./pages/NotFound/NotFound";
import Repassword from "./pages/Repassword/Repassword";
import Layout from "./components/Layout/Layout";
import { Toaster } from "sonner";
import UserProvider from "./context/UserContext";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import PostProvider from "./context/PostContext";
function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <PostProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  index
                  element={
                    <ProtectedRoutes>
                      <Home />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={`profile`}
                  element={
                    <ProtectedRoutes>
                      <Profile />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={`notifications`}
                  element={
                    <ProtectedRoutes>
                      <Notifications />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={`setting`}
                  element={
                    <ProtectedRoutes>
                      <Settings />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={`repassword`}
                  element={
                    <ProtectedRoutes>
                      <Repassword />
                    </ProtectedRoutes>
                  }
                />
              </Route>

              <Route path={`login`} element={<Login />} />
              <Route path={`signup`} element={<Signup />} />
              <Route path={`*`} element={<NotFound />} />
            </Routes>
          </PostProvider>
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </UserProvider>
    </>
  );
}

export default App;
