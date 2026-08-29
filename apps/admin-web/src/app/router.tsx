import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { DashboardShell } from '../components/layout/DashboardShell';
import { PageContainer } from '../components/layout/PageContainer';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { LoginPage } from '../pages/login/LoginPage';
import { MembersPage } from '../pages/members/MembersPage';
import { ActivitiesPage } from '../pages/activities/ActivitiesPage';
import { ReportsPage } from '../pages/reports/ReportsPage';
import { BroadcastsPage } from '../pages/broadcasts/BroadcastsPage';

const router = createBrowserRouter([
  {
    // Full-bleed auth layout — no sidebar/topbar chrome.
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <DashboardShell>
        <PageContainer>
          <DashboardPage />
        </PageContainer>
      </DashboardShell>
    ),
  },
  {
    path: '/members',
    element: (
      <DashboardShell>
        <PageContainer>
          <MembersPage />
        </PageContainer>
      </DashboardShell>
    ),
  },
  {
    path: '/activities',
    element: (
      <DashboardShell>
        <PageContainer>
          <ActivitiesPage />
        </PageContainer>
      </DashboardShell>
    ),
  },
  {
    path: '/reports',
    element: (
      <DashboardShell>
        <PageContainer>
          <ReportsPage />
        </PageContainer>
      </DashboardShell>
    ),
  },
  {
    path: '/broadcasts',
    element: (
      <DashboardShell>
        <PageContainer>
          <BroadcastsPage />
        </PageContainer>
      </DashboardShell>
    ),
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
