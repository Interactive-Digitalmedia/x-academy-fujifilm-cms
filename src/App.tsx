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
import CommunityDetails from "./pages/Community/CommunityDetails";
import Analytics from "./pages/Analytics/Analytics";
import EventAnalytics from "./pages/Analytics/EventAnalytics";

import CreatePartner from "./pages/Activity/CreatePartner";
import Events from "./pages/Activity/Events";
import EventView from "./pages/Events/EventView";
import EventDetails from "./pages/Events/EventDetails";
import EventConcluded from "./pages/Events/EventConcluded";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetails from "./components/blogs/BlogDetails";
import Others from "./pages/Others/Other";

import Community from "./pages/Community/Community";
import CreateXStory from "./pages/Activity/CreateXStory";

import Profile from "./pages/Profile/Profile";
import CreateBlog from "./pages/Blogs/CreateBlog";

import PartnersView from "./pages/Partners/PartnersView";
import Support from "./pages/Support/Support";
import SupportDetails from "./pages/Support/SupportDetails";
import RefundSupportDetails from "./pages/Support/RefundSupportDetails";
import AmbassadorProfile from "./pages/Partners/AmbassadorProfile";

import Submissions from "./pages/Submissions/Submissions";
import SubmissionDetails from "./pages/Submissions/SubmissionDetails";
// import PartnersEditPage from "./pages/Partners/PartnersEditPage";

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

            <Route path="/events/create-events/:id?" element={<CreateEvent />} />
            <Route path="/events" element={<EventView />} />
            <Route path="/events/:activityId" element={<EventDetails />} />

            <Route
              path="/partners/create-partner"
              element={<CreatePartner />}
            />

            <Route path="/create-events" element={<CreateEvent />} />
            <Route path="/concluded-event" element={<EventConcluded />} />
            <Route path="/events" element={<EventView />} />
            <Route path="/partners" element={<PartnersView />} />
            <Route path="/partners/:username" element={<AmbassadorProfile />} />

            {/* <Route path="/partners/:id/edit" element={<PartnersEditPage />} /> */}

            <Route path="/create-partner" element={<CreatePartner />} />

            <Route path="/events" element={<EventView />} />
            <Route path="/partners" element={<PartnersView />} />
            <Route path="/submissions" element={<Submissions />} />
            <Route path="/submissions/:id" element={<SubmissionDetails />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route
              path="/analytics/event-analytics"
              element={<EventAnalytics />}
            />

            <Route path="/support" element={<Support />} />
            <Route path="/support/:id" element={<SupportDetails />} />
            <Route
              path="/support/refund/:id"
              element={<RefundSupportDetails />}
            />

            <Route path="/events" element={<Events />} />

            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/createblogs" element={<CreateBlog />} />
            <Route path="/blogs/:blogSlug" element={<BlogDetails />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/:id" element={<CommunityDetails />} />
            <Route path="/community/create-xstory" element={<CreateXStory />} />

            <Route path="/others" element={<Others />} />
            <Route path="/profile" element={<Profile />} />
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
