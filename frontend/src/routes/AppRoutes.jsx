import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import LoginPage from '@auth/pages/LoginPage';
import SignupPage from '@auth/pages/SignupPage';
import VerifyEmailPage from '@auth/pages/VerifyEmailPage';
import BlankFeaturePage from '@dashboard/pages/BlankFeaturePage';
import DashboardPage from '@dashboard/pages/DashboardPage';
import ProtectedRoute from '@/routes/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
        path="/dashboard"
      >
        <Route element={<DashboardPage />} index />
        <Route
          element={
            <BlankFeaturePage
              description="This will become the discovery hub for clubs, societies, and campus activity."
              icon="explore"
              title="Explore"
            />
          }
          path="explore"
        />
        <Route
          element={
            <BlankFeaturePage
              description="This page is ready for the full events module and already uses the dashboard layout."
              icon="events"
              title="Events"
            />
          }
          path="events"
        />
        <Route
          element={
            <BlankFeaturePage
              description="This page will host the clubs listing, club profiles, and related management flows."
              icon="clubs"
              title="Clubs"
            />
          }
          path="clubs"
        />
        <Route
          element={
            <BlankFeaturePage
              description="This page will host society discovery and society-level views."
              icon="societies"
              title="Societies"
            />
          }
          path="societies"
        />
        <Route
          element={
            <BlankFeaturePage
              description="This page is reserved for the full approvals workbench outside the dashboard summary."
              icon="approvals"
              title="Approvals"
            />
          }
          path="approvals"
        />
        <Route
          element={
            <BlankFeaturePage
              description="This page will host full membership management and member application flows."
              icon="memberships"
              title="Memberships"
            />
          }
          path="memberships"
        />
        <Route
          element={
            <BlankFeaturePage
              description="This page is prepared for audit timelines, exports, and compliance review."
              icon="audit"
              title="Audit Panel"
            />
          }
          path="audit"
        />
        <Route
          element={
            <BlankFeaturePage
              description="This page will hold governance templates, configs, and approval workflow controls."
              icon="governance"
              title="Governance"
            />
          }
          path="governance"
        />
        <Route
          element={
            <BlankFeaturePage
              description="This page will host rankings, activity scores, and participation leaderboards."
              icon="leaderboard"
              title="Leaderboard"
            />
          }
          path="leaderboard"
        />
        <Route
          element={
            <BlankFeaturePage
              description="This page will show the user's account profile and identity details."
              icon="profile"
              title="Profile"
            />
          }
          path="profile"
        />
        <Route
          element={
            <BlankFeaturePage
              description="This page will hold account and workspace settings."
              icon="settings"
              title="Settings"
            />
          }
          path="settings"
        />
        <Route
          element={
            <BlankFeaturePage
              description="This page will provide support information, docs, and help resources."
              icon="help"
              title="Help"
            />
          }
          path="help"
        />
      </Route>

      <Route element={<AuthLayout />}>
        <Route element={<Navigate replace to="/login" />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignupPage />} path="/signup" />
        <Route element={<VerifyEmailPage />} path="/verify-email" />
      </Route>

      <Route element={<Navigate replace to="/login" />} path="*" />
    </Routes>
  );
}

export default AppRoutes;
