import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardHome from './pages/DashboardHome';
import Timeline from './pages/Timeline';
import Settings from './pages/Settings';
import Sidebar from './components/layout/Sidebar';

function App() {
    return (
        <Router>
            <div className="flex h-screen bg-background text-foreground overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    <div className="max-w-7xl mx-auto space-y-8">
                        <Routes>
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                            <Route path="/dashboard" element={<DashboardHome />} />
                            <Route path="/timeline" element={<Timeline />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </Router>
    );
}

export default App;