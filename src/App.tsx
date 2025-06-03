import { Route, Routes } from "react-router-dom";
import Register from "./pages/Auth/Register";
import CreateUser from "./pages/Auth/CreateUser";
import Login from "./pages/Auth/Login";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./utils/ThemeProvider";
import NotFound from "./pages/NotFound";
import CheckAuth from "./utils/CheckAuth";
import CheckAuthLogin from "./utils/CheckAuthLogin";
import Logout from "./pages/Auth/Logout";
import GoogleLoginRedirect from "./pages/Auth/GoogleLoginRedirect";
import DashboardLayout from "./layouts/DashboardLayout";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import NotGoogleUser from "./pages/Auth/NotGoogleUser";
import Home from "./pages/Home/Home";
import CreateEvent from "./pages/Activity/CreateEvent";
import Events from "./pages/Activity/Events";
import ListView from "./components/events/ListView";

function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      {/* <PlanProvider> */}
      <Toaster />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/invalid-login-method" element={<NotGoogleUser />} />

        <Route path="/" element={<CheckAuth />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/create-events" element={<CreateEvent />} />
            <Route path="/events" element={<Events />} />
            <Route path="/list-view" element={<ListView />} />
          </Route>
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin" element={<CheckAuthLogin />}>
          <Route index element={<NotFound />} />
          <Route
            path="google-login-redirect"
            element={<GoogleLoginRedirect />}
          />
          <Route path="admin-login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="register" element={<Register />} />
          <Route path="create-user" element={<CreateUser />} />
        </Route>
      </Routes>
      {/* </PlanProvider> */}
    </ThemeProvider>
  );
}

export default App;
