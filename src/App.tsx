import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DietProvider } from './context/DietContext';
import { LoadingScreen } from './components/common/LoadingScreen';
import { Sidebar } from './components/common/Sidebar';
import { Navbar } from './components/common/Navbar';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { SchedulePage } from './pages/SchedulePage';
import { RecipesPage } from './pages/RecipesPage';
import { KitchenEssentialsPage } from './pages/KitchenEssentialsPage';
import { WaterTrackerPage } from './pages/WaterTrackerPage';
import { NotesPage } from './pages/NotesPage';
import { TodoListPage } from './pages/TodoListPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AuthPage } from './pages/AuthPage';

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F3F4F6] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Sticky Top Navbar */}
        <Navbar onOpenMobileMenu={() => setMobileOpen(true)} />

        {/* Dynamic Route View */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/kitchen" element={<KitchenEssentialsPage />} />
            <Route path="/kitchen/*" element={<KitchenEssentialsPage />} />
            <Route path="/water" element={<WaterTrackerPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/todos" element={<TodoListPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <DietProvider>
          {/* Animated Initial Loading Screen */}
          {!loadingComplete && (
            <LoadingScreen onComplete={() => setLoadingComplete(true)} minDurationMs={1500} />
          )}

          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </DietProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
