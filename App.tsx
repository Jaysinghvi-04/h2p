
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import AdminDashboard from './pages/AdminDashboard';
import ProjectDetail from './pages/ProjectDetail';
import { AnalyticsProvider } from './hooks/useAnalytics';

const App: React.FC = () => {
  return (
    <AnalyticsProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </HashRouter>
    </AnalyticsProvider>
  );
};

export default App;
