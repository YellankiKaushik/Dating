import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import PersonalityChart from '../components/PersonalityChart';
import MatchCard from '../components/MatchCard';

// ============================================================
// PsyMatch Demo - Dashboard Page
// ============================================================

export default function DashboardPage() {
    const { currentUser, matches } = useApp();
    const navigate = useNavigate();

    // Redirect if no user
    if (!currentUser) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 15h8M9 9h.01M15 9h.01" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">No profile yet</h2>
                    <p className="text-slate-400 mb-6">Complete the personality assessment first to see your dashboard.</p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 transition-all"
                    >
                        Take Assessment
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Welcome Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white">
                        Welcome, {currentUser.name}
                    </h1>
                    <p className="text-slate-400 mt-1">
                        Here's your personality profile and top matches
                    </p>
                </div>
                <button
                    onClick={() => navigate('/register')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                        <path d="M16 16h5v5" />
                    </svg>
                    Retake
                </button>
            </div>

            {/* Personality Summary */}
            <section className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    Your Personality Profile
                </h2>
                <PersonalityChart profile={currentUser.profile} />
            </section>

            {/* Matches Section */}
            <section>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>
                    Top Matches
                    <span className="text-sm font-normal text-slate-500">
                        (similarity &gt; 70%)
                    </span>
                </h2>

                {matches.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {matches.map((match, index) => (
                            <MatchCard key={match.user.id} match={match} rank={index + 1} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-8 text-center">
                        <p className="text-slate-400">
                            No matches found with &gt; 70% similarity yet. More users need to join!
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}
