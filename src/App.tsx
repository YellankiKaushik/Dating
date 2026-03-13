import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import QuestionnairePage from './pages/QuestionnairePage';
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';

// ============================================================
// PsyMatch Demo - App Root
// ============================================================

export default function App() {
    return (
        <BrowserRouter>
            <AppProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/questionnaire" element={<QuestionnairePage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/chat/:id" element={<ChatPage />} />
                    </Routes>
                </Layout>
            </AppProvider>
        </BrowserRouter>
    );
}